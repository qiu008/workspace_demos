//
//  FBBitcoinTransactionHelper.swift
//  Module_Web3Wallet
//

import Alamofire
import Foundation
import HandyJSON
import WalletCore

enum FBBitcoinTransactionHelper {
    static func transfer(_ params: TransactionParams, privateKey: String?) async throws -> String {
        guard let fromPrivateKey = privateKey, !fromPrivateKey.isEmpty else {
            throw FBWalletError.privateKeyError
        }
  
        let fromAddress = params.account.address
        let toAddress = params.toAddress
        let amount = Double(params.amount) ?? 0

        let hexPrivateKey = fromPrivateKey.count < 64 ? (FBBitcoinAccountHelper.wifToHex(privateKeyWif: fromPrivateKey) ?? "") : fromPrivateKey
        
        guard let fromPrivateKeyData = Data(hexString: hexPrivateKey),
              let key = PrivateKey(data: fromPrivateKeyData) else { throw BitCoinNetworkError.other }

        let p2trPublicKey = key.getPublicKeySecp256k1(compressed: false)

        async let fee = FBBitcoinNetworkService.getRecommendedFee()
        async let utxos = FBBitcoinNetworkService.getUTXO(fromAddress)
        
        var utxoModels: [BitcoinV2Input] = []
        let transferAmount = convertBTCtoSatoshi(btcAmount: amount)
        var utxoAmount = 0
        for item in try await utxos {
            guard let utxoTxId = item.txid,
                  let index = item.vout,
                  let value = item.value else { continue }
            let p2trUtxo = BitcoinV2Input.with {
                $0.outPoint = BitcoinV2OutPoint.with {
                    $0.hash = Data.reverse(hexString: utxoTxId)
                    $0.vout = UInt32(index)
                }
                $0.value = Int64(value)
                $0.sighashType = BitcoinSigHashType.all.rawValue
                $0.scriptBuilder = .with { $0.p2TrKeyPath = p2trPublicKey.data }
            }
            utxoModels.append(p2trUtxo)

            utxoAmount += value
            if utxoAmount >= transferAmount {
                break
            }
        }

//        let byteFee = try await fee
//        let plan = BitcoinTransactionPlan.with {
//            $0.amount =
//            $0.fee =
//            $0.change =
//            $0.utxos =
//        }
        
        let out0 = BitcoinV2Output.with {
            $0.value = transferAmount
            $0.toAddress = toAddress
        }

        let signingInput = BitcoinV2SigningInput.with {
            $0.privateKeys = [fromPrivateKeyData]
            $0.chainInfo = BitcoinV2ChainInfo.with {
                $0.p2PkhPrefix = 0
                $0.p2ShPrefix = 5
            }
            $0.dangerousUseFixedSchnorrRng = false

            $0.builder = BitcoinV2TransactionBuilder.with {
                $0.version = .v2
                $0.inputs = utxoModels
                $0.outputs = [out0]
                $0.inputSelector = .useAll
                $0.fixedDustThreshold = 546
            }
        }

        let legacySigningInput = BitcoinSigningInput.with { $0.signingV2 = signingInput }
        let output: BitcoinSigningOutput = AnySigner.sign(input: legacySigningInput, coin: .bitcoin)

        let outputV2 = output.signingResultV2

        print(outputV2.encoded.hexString)
        print(outputV2.error)

        guard outputV2.error == .ok else {
            throw FBTransactionError.signFail(outputV2.errorMessage)
        }
        let hexStr = outputV2.encoded.hexString
        guard !hexStr.isEmpty else {
            throw FBTransactionError.signFail("hex empty")
        }

        return try await FBBitcoinNetworkService.broadcastRawTransaction(hex: hexStr)
    }

    static func convertBTCtoSatoshi(btcAmount: Double) -> Int64 {
        let satoshiMultiplier = 1_000_000_000
        return Int64(btcAmount * Double(satoshiMultiplier))
    }
    
    static func convertSatoshiToBTC(satoshiAmount: Int64) -> Double {
        let satoshiMultiplier: Double = 1_000_000_000
        return Double(satoshiAmount) / satoshiMultiplier
    }
}

enum FBTransactionError: Error {
    case networkError(String)
    case signFail(String)
}

//
//  FBWalletEthAccountFactory.swift
//  Module_Web3Wallet
//

import BigInt
import Foundation
import Web3Core
import web3swift

/// 基于以太坊的币
enum EthereumChainCoin {
    case ethereum
    case valanche
    case BSC
    case polygon
    
    var chain: FBWalletChain {
        switch self {
        case .ethereum:
            return .Ethereum
        case .valanche:
            return .Avalanche
        case .BSC:
            return .BSC
        case .polygon:
            return .Polygon
        }
    }
}

class FBWalletEthAccountFactory: FBWalletAccountFactory {
    let isTestnet: Bool
    let chainId: String
    let chain: FBWalletChain
    
    init?(chainId: String, isTestnet: Bool, chain: FBWalletChain? = nil) {
        self.isTestnet = isTestnet
        self.chainId = chainId
        if chain != nil {
            self.chain = chain!
        } else {
            self.chain = FBWalletChain.with(chainId: chainId, isTestnet: isTestnet) ?? .Ethereum
        }
    }

    var path: String {
        return chain.prefixPath
    }
    
    func accountWith(mnemonics: String, password: String) throws -> FBWalletAccount {
        print("================ 开始从助记词导入钱包 ================")
        
        let start = CACurrentMediaTime()
        
        guard let walletAddress = try? BIP32Keystore(mnemonics: mnemonics, password: password, prefixPath: path)
        else {
            throw FBWalletError.generateKeystoreFail
        }
        
        guard let firstAddress = walletAddress.addresses?.first else {
            throw FBWalletError.generateAddressFail
        }
        let address = firstAddress.address
        
        guard let privateKey = try? walletAddress.UNSAFE_getPrivateKeyData(password: password, account: firstAddress),
              let keystore = try? EthereumKeystoreV3(privateKey: privateKey, password: password),
              let keyData = try? JSONEncoder().encode(keystore.keystoreParams)
        else {
            throw FBWalletError.generateAddressFail
        }
              
        FBWalletLog.debug("mnemonics恢复的\(chain.title)地址：\(address)")
        
        let cost = CACurrentMediaTime() - start
        print("================ 完成从助记词导入钱包 Cost：\(cost) ================")
        
        let accountId = walletAddress.keystoreParams?.id ?? UUID().uuidString.lowercased()
        let account = FBWalletAccount(accountId: accountId, keystore: keyData, privateKey: privateKey.toHexString(), address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: isTestnet)
        return account
    }
    
    func accountWith(keystore: Data, password: String) throws -> FBWalletAccount {
        print("================ 开始从keystore导入钱包 ================")
        
        let start = CACurrentMediaTime()
        
        guard let keystore = EthereumKeystoreV3(keystore),
              let keyData = try? JSONEncoder().encode(keystore.keystoreParams)
        else {
            throw FBWalletError.generateKeystoreFail
        }
        guard let firstAddress = keystore.addresses?.first else {
            throw FBWalletError.generateAddressFail
        }
        let address = firstAddress.address
        FBWalletLog.debug("keystore恢复的\(chain.title)地址：\(address)")
        let privateKey = try keystore.UNSAFE_getPrivateKeyData(password: password, account: firstAddress)
        let cost = CACurrentMediaTime() - start
        print("================ 完成从keystore导入钱包 Cost：\(cost) ================")
        
        let accountId = keystore.keystoreParams?.id ?? UUID().uuidString.lowercased()
        let account = FBWalletAccount(accountId: accountId, keystore: keyData, privateKey: privateKey.toHexString(), address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: isTestnet)
        return account
    }
    
    func accountWith(privateKey: String, password: String) throws -> FBWalletAccount {
        print("================ 开始从私钥导入钱包 ================")
        
        let start = CACurrentMediaTime()
        
        let formattedKey = privateKey.trimmingCharacters(in: .whitespacesAndNewlines)
        guard let dataKey = Data.fromHex(formattedKey) else {
            print("导入的私钥有误")
            throw FBWalletError.privateKeyError
        }
        
        guard let keystore = try? EthereumKeystoreV3(privateKey: dataKey, password: password),
              let keyData = try? JSONEncoder().encode(keystore.keystoreParams)
        else {
            throw FBWalletError.generateKeystoreFail
        }

        guard let address = keystore.addresses?.first?.address else {
            throw FBWalletError.generateAddressFail
        }

        FBWalletLog.debug("privateKey恢复的\(chain.title)地址：\(address)")

        let cost = CACurrentMediaTime() - start
        print("================ 完成从私钥导入钱包 Cost：\(cost) ================")
        
        let accountId = keystore.keystoreParams?.id ?? UUID().uuidString.lowercased()
        let account = FBWalletAccount(accountId: accountId, keystore: keyData, privateKey: privateKey, address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: isTestnet)
        return account
    }
}

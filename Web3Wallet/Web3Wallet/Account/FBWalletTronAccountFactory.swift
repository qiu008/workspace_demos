//
//  FBWalletTronAccountFactory.swift
//  Module_Web3Wallet
//

import BigInt
import Foundation

class FBWalletTronAccountFactory: FBWalletEthAccountFactory {
    override init?(chainId: String, isTestnet: Bool, chain _: FBWalletChain? = nil) {
        let chain = FBWalletChain.with(chainId: chainId, isTestnet: isTestnet) ?? .Tron
        super.init(chainId: chainId, isTestnet: isTestnet, chain: chain)
    }
    
    override func accountWith(mnemonics: String, password: String) throws -> FBWalletAccount {
        let account = try super.accountWith(mnemonics: mnemonics, password: password)
        guard let address = TronAccountHelper.ethereumToTronAddress(ethereumAddress: account.address) else {
            throw FBWalletError.generateAddressFail
        }
        account.address = address
        return account
    }
    
    override func accountWith(keystore: Data, password: String) throws -> FBWalletAccount {
        let account = try super.accountWith(keystore: keystore, password: password)
        guard let address = TronAccountHelper.ethereumToTronAddress(ethereumAddress: account.address) else {
            throw FBWalletError.generateAddressFail
        }
        account.address = address
        return account
    }
    
    override func accountWith(privateKey: String, password: String) throws -> FBWalletAccount {
        let account = try super.accountWith(privateKey: privateKey, password: password)
        guard let address = TronAccountHelper.ethereumToTronAddress(ethereumAddress: account.address) else {
            throw FBWalletError.generateAddressFail
        }
        account.address = address
        return account
    }
}

// MARK: - 地址转换

private enum TronAccountHelper {
    // 将以太坊地址转换为 Tron 地址
    static func ethereumToTronAddress(ethereumAddress: String) -> String? {
        guard ethereumAddress.count == 42, ethereumAddress.hasPrefix("0x") else {
            return nil // 确保是有效的以太坊地址
        }
        
        // 去掉 "0x" 前缀并将其转换为字节数组
        let hexAddress = String(ethereumAddress.dropFirst(2))
        guard let ethAddressData = Data(hexString: hexAddress) else {
            return nil
        }
        
        // 添加 Tron 主网前缀 0x41
        var tronAddressData = Data([0x41]) + ethAddressData
        
        // 两次 SHA256 哈希计算校验和
        let firstHash = tronAddressData.sha256()
        let secondHash = firstHash.sha256()
        let checksum = Data(secondHash.prefix(4))
        
        // 拼接校验和
        tronAddressData.append(checksum)
        
        // Base58 编码
        return Base58.encode(tronAddressData)
    }
}

private enum Base58 {
    static let alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    
    static func encode(_ data: Data) -> String {
        var x = BigUInt(data)
        var result = ""
        
        while x > 0 {
            let (quotient, remainder) = x.quotientAndRemainder(dividingBy: 58)
            result.insert(alphabet[alphabet.index(alphabet.startIndex, offsetBy: Int(remainder))], at: result.startIndex)
            x = quotient
        }
        
        for byte in data {
            if byte != 0 { break }
            result.insert("1", at: result.startIndex)
        }
        
        return result
    }
}

// 十六进制字符串转 Data
private extension Data {
    init?(hexString: String) {
        var hex = hexString
        if hex.count % 2 != 0 {
            hex = "0" + hex
        }
        
        var data = Data()
        var byte: UInt8 = 0
        for (index, char) in hex.enumerated() {
            let nibble = char.hexNibbleValue
            if nibble < 0 { return nil }
            byte = (byte << 4) | UInt8(nibble)
            if index % 2 != 0 {
                data.append(byte)
                byte = 0
            }
        }
        self = data
    }
}

private extension Character {
    var hexNibbleValue: Int {
        switch self {
        case "0"..."9":
            return Int(unicodeScalars.first!.value - UnicodeScalar("0").value)
        case "a"..."f":
            return Int(unicodeScalars.first!.value - UnicodeScalar("a").value + 10)
        case "A"..."F":
            return Int(unicodeScalars.first!.value - UnicodeScalar("A").value + 10)
        default:
            return -1
        }
    }
}

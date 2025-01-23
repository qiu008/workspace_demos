//
//  WalletManager.swift
//  Web3Wallet
//
//  Created by bv-mac-build on 2024/11/27.
//

import Foundation
import web3swift
import Web3Core
import BigInt
import WalletCore

/// 各个链的测试数据
extension FBWalletChain {
    var chainID: BigUInt {
        switch self {
        case .Ethereum:
            return BigUInt(11155111)
        case .Polygon:
            return BigUInt(80002)
        case .BSC:
            return BigUInt(97)
        case .Avalanche:
            return BigUInt(43113)
        case .Tron:
            return BigUInt(0)
        case .Bitcoin:
            return BigUInt(0)
        }
    }
    
    var url: String {
        switch self {
        case .Ethereum:
            return "https://sepolia.drpc.org"
        case .Polygon:
            return "https://polygon-amoy.drpc.org"
        case .BSC:
            return "https://data-seed-prebsc-1-s1.binance.org:8545/"
        case .Avalanche:
            return "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc"
        case .Tron:
            /// "https://api.shasta.trongrid.io"
            return "https://nile.trongrid.io"
        case .Bitcoin:
            return "https://bitcoin-testnet.drpc.org"
        }
    }
    
    var contractAddress: String {
        switch self {
        case .Ethereum:
            // 0xd1092BAAf1ff6EB9305f035C4805092eb9cCa761(BULL)
            // 0xF4bB9F6634b7228ede7F0252771015ca193853Fa(USDT)
            return "0xF4bB9F6634b7228ede7F0252771015ca193853Fa"
        case .Polygon:
            return "0xdc171666753F655365a564504D8B13852E8F23E2"
        case .BSC:
            return "0xF4bB9F6634b7228ede7F0252771015ca193853Fa"
        case .Avalanche:
            return "0xdc171666753F655365a564504D8B13852E8F23E2"
        case .Tron:
            /// shasta: "TUicvMJCBo3v2Q62fX7W7o5z99PV78AJiG"
            return "TEi9DEVbv8KFsoQBw8AYbCvQuzJdyReYXV"
        case .Bitcoin:
            return ""
        }
    }
}

class FBWalletManager {
    
    var userWallet: FBWalletUser?
    var userId: Int = 0
    var tronWeb: TronWeb3?
    
    private var userDirectory: URL? {
        let documentURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
        return documentURL?.appendingPathComponent("wallet/\(userId)")
    }
    
    private var fileURL: URL? {
        return userDirectory?.appendingPathComponent("walletInfo.json")
    }
    
    init(userId: Int) {
        self.userId = userId
        self.initUserWallet()
    }
    
    private func initUserWallet() {
        self.userWallet = self.loadUserWallet()
        if self.userWallet == nil {
            self.userWallet = FBWalletUser(userId: userId)
        }
    }
}

extension FBWalletManager {
    func generateMnemonics() -> String? {
        return FBMnemonicsHelper.generateMnemonics()
    }
    
    func accountFactory(_ chain: FBWalletChain) -> FBWalletAccountFactory {
        switch chain {
        case .Ethereum:
            return FBWalletEthAccountFactory(coinType: .ethereum)
        case .Polygon:
            return FBWalletEthAccountFactory(coinType: .polygon)
        case .Avalanche:
            return FBWalletEthAccountFactory(coinType: .valanche)
        case .BSC:
            return FBWalletEthAccountFactory(coinType: .BSC)
        case .Bitcoin:
            return FBWalletBitcoinAccountFactory()
        case .Tron:
            return FBWalletTronAccountFactory()
        }
    }
}

// MARK: - 钱包数据保存、读取
extension FBWalletManager {
    func saveOrUpdateUserWallet() {
        guard let userDirectory = self.userDirectory, let fileURL = self.fileURL, let walletInfo = self.userWallet else {
            return
        }
        
        do {
            if !FileManager.default.fileExists(atPath: userDirectory.path) {
                try FileManager.default.createDirectory(at: userDirectory, withIntermediateDirectories: true)
            }
            let jsonData = try JSONEncoder().encode(walletInfo)
            try jsonData.write(to: fileURL)
            print("钱包数据已保存到：", fileURL.path)
        } catch {
            print("钱包数据保存失败：\(error)")
        }
    }
    
    // 加载本地keystory的钱包
    func loadUserWallet() -> FBWalletUser? {
        guard let fileURL = self.fileURL else {
            print("用户钱包不存在")
            return nil
        }
        
        do {
            let jsonData = try Data(contentsOf: fileURL)
            let walletInfo = try JSONDecoder().decode(FBWalletUser.self, from: jsonData)
            return walletInfo
            
        } catch  {
            print("钱包数据读取失败")
            return nil
        }
    }
}

// MARK: - 钱包添加、更新
extension FBWalletManager {
    func addWallet(_ wallet: FBWallet) {
        userWallet?.wallets.append(wallet)
        saveOrUpdateUserWallet()
    }
    
    func updateWallet(_ wallet: FBWallet) {
        guard let index = userWallet?.wallets.firstIndex(where: {$0.walletId == wallet.walletId}) else {
            return
        }
        userWallet?.wallets[index] = wallet
        saveOrUpdateUserWallet()
    }
    
    func addAccount(_ account: FBWalletAccount, walletId: String) {
        guard let wallet = userWallet?.wallets.first(where: {$0.walletId == walletId}) else {
            return
        }
        wallet.accounts.append(account)
        saveOrUpdateUserWallet()
    }
    
    func updateAccount(_ account: FBWalletAccount, walletId: String) {
        guard let wallet = userWallet?.wallets.first(where: {$0.walletId == walletId}) else {
            return
        }
        if let index = wallet.accounts.firstIndex(where: {$0.accountId == account.accountId}) {
            wallet.accounts[index] = account
            saveOrUpdateUserWallet()
        }
    }
}

// MARK: - 导出私钥、keystore
extension FBWalletManager {
    func outputPrivatekey(_ account: FBWalletAccount, password: String) -> String? {
        guard let keystoreData = account.keystore else {
            return nil
        }
        
        if account.chain == .Bitcoin {
            guard let storeKey = StoredKey.importJSON(json: keystoreData),
                    let privateKeyData = storeKey.decryptPrivateKey(password: Data(password.utf8)) else {
                
                return nil
            }
            let privateKey = FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKeyData.toHexString())
            return privateKey
        }
        
        guard let keystore = BIP32Keystore(keystoreData), let address = keystore.addresses?.first else {
            return nil
        }
        
        do {
            let privateKey = try keystore.UNSAFE_getPrivateKeyData(password: password, account: address)
            return privateKey.toHexString()
        } catch  {
            print("私钥导出失败：\(error)")
            return nil
        }
    }
    
    func outputKeystore(_ account: FBWalletAccount, password: String) -> String? {
        guard let keystoreData = account.keystore else {
            return nil
        }
        let json = String(data: keystoreData, encoding: .utf8)
        return json
    }
}

//
//  FBWalletBitcoinAccountFactory.swift
//  Module_Web3Wallet
//

import Foundation
import WalletCore
import WebKit

class FBWalletBitcoinAccountFactory: FBWalletAccountFactory {
    private var derivation: Derivation {
        if isTestnet {
            return testDerivation
        } else {
            return mainDerivation
        }
    }

    private let mainDerivation: Derivation = .bitcoinTaproot
    private let testDerivation: Derivation = .bitcoinTestnet
    private let coinType: CoinType = .bitcoin
    
    let isTestnet: Bool = false
    let chainId: String
    let chain: FBWalletChain = .Bitcoin
    
    init?(chainId: String) {
        self.chainId = chainId
    }
    
    func accountWith(mnemonics: String, password: String) throws -> FBWalletAccount {
        print("================ 开始从助记词导入Bitcoin钱包 ================")
        
        let wallet = HDWallet(mnemonic: mnemonics.trim(), passphrase: password)
        
        guard let privateKey = wallet?.getKeyDerivation(coin: coinType, derivation: derivation) else {
            throw FBWalletError.generateKeystoreFail
        }
        let privateKeyData = privateKey.data
        
        FBWalletLog.debug("比特币私钥: hex(\(privateKeyData.toHexString()) wif(\(FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKeyData.toHexString(), mainnet: true)))")
        
        // 生成keystore
        let storeKey = StoredKey.importPrivateKeyWithEncryption(privateKey: privateKeyData,
                                                                name: "",
                                                                password: Data(password.utf8),
                                                                coin: coinType,
                                                                encryption: .aes128Ctr)
        
        guard let keystore = storeKey?.exportJSON() else {
            throw FBWalletError.generateKeystoreFail
        }

        let publicKey = privateKey.getPublicKey(coinType: coinType)
        let address = AnyAddress(publicKey: publicKey, coin: coinType, derivation: derivation).description
        let path = coinType.derivationPathWithDerivation(derivation: derivation)
        let accountId = UUID().uuidString.lowercased()
        let wifPrivateKey = FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKeyData.toHexString(), mainnet: true) ?? ""
        let account = FBWalletAccount(accountId: accountId, keystore: keystore, privateKey: wifPrivateKey, address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: isTestnet)
        
        print("================ 完成从助记词导入Bitcoin钱包 ================")
        return account
    }
    
    func accountWith(keystore: Data, password: String) throws -> FBWalletAccount {
        guard let storeKey = StoredKey.importJSON(json: keystore) else {
            throw FBWalletError.encryptionError("")
        }
        
        guard let privateKeyData = storeKey.decryptPrivateKey(password: Data(password.utf8)) else {
            throw FBWalletError.encryptionError("")
        }
        
        guard let key = PrivateKey(data: privateKeyData) else {
            throw FBWalletError.privateKeyError
        }
        
        let publicKey = key.getPublicKey(coinType: coinType)
        let address = AnyAddress(publicKey: publicKey, coin: coinType, derivation: derivation).description
        FBWalletLog.debug("keystore恢复的bitcoin地址：\(address)")
        let path = coinType.derivationPathWithDerivation(derivation: derivation)
        let accountId = UUID().uuidString.lowercased()
        let wifPrivateKey = FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKeyData.toHexString(), mainnet: true) ?? ""
        let account = FBWalletAccount(accountId: accountId, keystore: keystore, privateKey: wifPrivateKey, address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: isTestnet)
        return account
    }
    
    func accountWith(privateKey: String, password: String) throws -> FBWalletAccount {
        guard let fixPrivateKey = privateKey.count == 64 ? privateKey : FBBitcoinAccountHelper.wifToHex(privateKeyWif: privateKey),
              let privateKeyData = Data(hexString: fixPrivateKey),
              let key = PrivateKey(data: privateKeyData)
        else {
            throw FBWalletError.privateKeyError
        }
        
        let storeKey = StoredKey.importPrivateKeyWithEncryption(privateKey: privateKeyData,
                                                                name: "",
                                                                password: Data(password.utf8),
                                                                coin: coinType,
                                                                encryption: .aes128Ctr)
        
        guard let keystore = storeKey?.exportJSON() else {
            throw FBWalletError.generateKeystoreFail
        }
        let publicKey = key.getPublicKey(coinType: coinType)
        let address = AnyAddress(publicKey: publicKey, coin: coinType, derivation: derivation).description
        FBWalletLog.debug("privatekey恢复的bitcoin地址：\(address)")
        let path = coinType.derivationPathWithDerivation(derivation: derivation)
        let accountId = UUID().uuidString.lowercased()
        let wifPrivateKey = FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKeyData.toHexString(), mainnet: true) ?? ""
        let account = FBWalletAccount(accountId: accountId, keystore: keystore, privateKey: wifPrivateKey, address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: isTestnet)
        return account
    }
}

class FBWalletBitcoinTestnetAccountFactory: NSObject, FBWalletAccountFactory {
    let chainId: String
    let chain: FBWalletChain = .Bitcoin
    private let coinType: CoinType = .bitcoin
    private var webView: WKWebView?
    
    private static var _webView: WKWebView?
    
    static func prepare() {
        Self._webView = prepareWebview()
    }
    
    init?(chainId: String) {
        self.chainId = chainId
        super.init()
        if Self._webView != nil {
            webView = Self._webView
            DispatchQueue.main.async {
                // FIXME:
                self.webView?.navigationDelegate = self
            }
        } else {
            if Thread.isMainThread {
                webView = Self.prepareWebview()
                webView?.navigationDelegate = self
            } else {
                DispatchQueue.main.async {
                    self.webView = Self.prepareWebview()
                    self.webView?.navigationDelegate = self
                }
            }
        }
    }
    
    private static func prepareWebview() -> WKWebView {
        let webView = WKWebView(frame: .zero, configuration: WKWebViewConfiguration())
        webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        let bundle = Bundle(for: Self.self)
        let htmlSource = bundle.path(forResource: "index.html", ofType: nil)!
        let url = URL(fileURLWithPath: htmlSource)
        webView.loadFileURL(url, allowingReadAccessTo: url)
        return webView
    }
    
    func accountWith(mnemonics: String, password: String) throws -> FBWalletAccount {
        print("================ 开始从助记词导入Bitcoin钱包 ================")
        guard let webView = webView else {
            assertionFailure("需提前准备webview")
            throw FBWalletError.generateAddressFail
        }
        let jsFunc = "testnetAccountFromMnemonic('\(mnemonics)')"
        var address = ""
        var privateKeyStr = ""
        let semaphore = DispatchSemaphore(value: 0)
        call(with: webView, javaScriptString: jsFunc) { result, _ in
            guard let dict = result as? [String: String] else {
                semaphore.signal()
                return
            }
            address = dict["address"] ?? ""
            privateKeyStr = dict["privateKey"] ?? ""
            semaphore.signal()
        }
        semaphore.wait()
        
        guard !address.isEmpty, !privateKeyStr.isEmpty,
              let hexPrivateKey = FBBitcoinAccountHelper.wifToHex(privateKeyWif: privateKeyStr),
              let privateKeyData = Data(hexString: hexPrivateKey)
        else {
            throw FBWalletError.generateAddressFail
        }
        
        // 生成keystore
        let storeKey = StoredKey.importPrivateKeyWithEncryption(privateKey: privateKeyData,
                                                                name: "",
                                                                password: Data(password.utf8),
                                                                coin: coinType,
                                                                encryption: .aes128Ctr)
        
        guard let keystore = storeKey?.exportJSON() else {
            throw FBWalletError.generateKeystoreFail
        }
        let path = "m/86'/0'/0'/0/0"
        let accountId = UUID().uuidString.lowercased()
        let account = FBWalletAccount(accountId: accountId, keystore: keystore, privateKey: privateKeyStr, address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: true)
        
        print("================ 完成从助记词导入Bitcoin钱包 ================")
        return account
    }
    
    func accountWith(keystore: Data, password: String) throws -> FBWalletAccount {
        guard let storeKey = StoredKey.importJSON(json: keystore) else {
            throw FBWalletError.encryptionError("")
        }
        
        guard let privateKeyData = storeKey.decryptPrivateKey(password: Data(password.utf8)) else {
            throw FBWalletError.encryptionError("")
        }
        var privateKeyStr = privateKeyData.hexString
        if privateKeyStr.count >= 64 {
            guard let str = FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKeyStr, mainnet: false) else {
                throw FBWalletError.encryptionError("")
            }
            privateKeyStr = str
        }
        return try accountWith(privateKey: privateKeyStr, password: password)
    }
    
    func accountWith(privateKey: String, password: String) throws -> FBWalletAccount {
        guard let webView = webView else {
            assertionFailure("需提前准备webview")
            throw FBWalletError.generateAddressFail
        }
        let wifPrivateKey: String = privateKey.count < 64 ? privateKey : (FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKey, mainnet: false) ?? "")
        guard !wifPrivateKey.isEmpty else {
            throw FBWalletError.privateKeyError
        }
        
        let jsFunc = "testnetAccountFromWIFPrivateKey('\(wifPrivateKey)')"
        var address = ""
        let semaphore = DispatchSemaphore(value: 0)
        call(with: webView, javaScriptString: jsFunc) { result, _ in
            guard let str = result as? String else {
                semaphore.signal()
                return
            }
            address = str
            semaphore.signal()
        }
        semaphore.wait()
        
        guard !address.isEmpty,
              let hexPrivateKey = FBBitcoinAccountHelper.wifToHex(privateKeyWif: wifPrivateKey),
              let privateKeyData = Data(hexString: hexPrivateKey)
        else {
            throw FBWalletError.generateAddressFail
        }
        
        // 生成keystore
        let storeKey = StoredKey.importPrivateKeyWithEncryption(privateKey: privateKeyData,
                                                                name: "",
                                                                password: Data(password.utf8),
                                                                coin: coinType,
                                                                encryption: .aes128Ctr)
        
        guard let keystore = storeKey?.exportJSON() else {
            throw FBWalletError.generateKeystoreFail
        }
        let path = "m/86'/0'/0'/0/0"
        let accountId = UUID().uuidString.lowercased()
        let account = FBWalletAccount(accountId: accountId, keystore: keystore, privateKey: wifPrivateKey, address: address, derivationPath: path, chainId: chainId, chain: chain, isTestnet: true)
        
        print("================ 完成从助记词导入Bitcoin钱包 ================")
        return account
    }
    
    private func call(with webView: WKWebView, javaScriptString: String, completionHandler: ((Any?, Error?) -> Void)? = nil) {
        if Thread.isMainThread {
            webView.evaluateJavaScript(javaScriptString, completionHandler: completionHandler)
        } else {
            DispatchQueue.main.async {
                webView.evaluateJavaScript(javaScriptString, completionHandler: completionHandler)
            }
        }
    }
}

extension FBWalletBitcoinTestnetAccountFactory: WKNavigationDelegate {
    public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("didFinish")
    }

    public func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        print("error = \(error)")
    }

    public func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        print("didStartProvisionalNavigation ")
    }
}

// MARK: - 地址转换

enum FBBitcoinAccountHelper {
    static let mainnetPrivateKeyVersion: UInt8 = 0x80
    static let testnetPrivateKeyVersion: UInt8 = 0xef
    static let compressedPublicKeyFlag: UInt8 = 0x01

    static func hexToWIF(privateKeyHex: String, mainnet: Bool) -> String? {
        guard privateKeyHex.count == 64 else { return nil }
        let privateKeyData = Data(hexString: privateKeyHex)
        var wifData = privateKeyData!
        wifData.append(compressedPublicKeyFlag)
        if mainnet {
            wifData.insert(mainnetPrivateKeyVersion, at: 0)
        } else {
            wifData.insert(testnetPrivateKeyVersion, at: 0)
        }
        return wifData.bytes.base58CheckEncodedString
    }
    
    static func wifToHex(privateKeyWif: String) -> String? {
        guard privateKeyWif.count < 64 else { return nil }
        guard let decodedBytes = privateKeyWif.base58CheckDecodedBytes else { return nil }
        let oriBytes = [UInt8](decodedBytes.dropLast(1).dropFirst())
        return oriBytes.toHexString()
    }
}

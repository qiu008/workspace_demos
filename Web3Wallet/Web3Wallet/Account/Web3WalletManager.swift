//
//  Web3WalletManager.swift
//  Module_Web3Wallet
//

import Alamofire
import BLSFoundation
import Combine
import Foundation
import RxSwift
import WalletCore
import Web3Core
import web3swift

public class Web3WalletManager {
    private(set) var userWallet: FBWalletUser!
    private(set) var userId: Int = 0
    
    private lazy var dataStore = Web3WalletDataStore(userId: userId)
    
    public static let shared: Web3WalletManager = .init()
    
    var allCoinList: [FBWalletCoinInfo] = []
    
    let chainGroupEntityDidChange: PassthroughSubject = PassthroughSubject<Void, BLSHttpManager.RequestError>()
    
    private var chainInfoDict: [String: FBWalletChainEntity] = [:]
    
    private(set) var chainGroupEntity: [FBWalletChainGroupEntity] = [] {
        didSet {
            guard chainGroupEntity != oldValue else { return }
            let flatChains = chainGroupEntity.flatMap { $0.chain_list }
            for chain in flatChains {
                guard let id = chain.chain_id else { continue }
                chainInfoDict[id] = chain
            }
            if let chain = flatChains.first(where: { $0.is_default == 1 }) {
                defaultChain = chain
            }
            chainGroupEntityDidChange.send()
        }
    }
    
    private(set) var defaultChain: FBWalletChainEntity?
    
    private weak var taskStartVC: UIViewController?
    
    private var rx_networkDisposable: Disposable?
    
    private(set) lazy var addressBookManager: FBAddressBookManager = .init(self.userId)
    
    /// 当前钱包
    var currentWallet: FBWallet? {
        let selectedWallet = userWallet.wallets.first { item in
            item.isSelected
        }
        guard selectedWallet == nil else { return selectedWallet }
        if let wallet = userWallet.wallets.first {
            wallet.isSelected = true
            saveOrUpdateUserWallet()
            return wallet
        }
        return nil
    }
    
    var currentAccount: FBWalletAccount? {
        let wallet = currentWallet
        let account = wallet?.accounts.first(where: { item in
            item.isSelected
        })
        guard account == nil else { return account }
        if let firstAccount = wallet?.accounts.first {
            firstAccount.isSelected = true
            saveOrUpdateUserWallet()
            return firstAccount
        }
        return nil
    }
    
    func getChainEntity(_ chainId: String?) -> FBWalletChainEntity? {
        guard let chainID = chainId, !chainID.isEmpty else {
            return nil
        }
        return chainInfoDict[chainID]
    }
    
    func getAllChain() -> [FBWalletChainEntity] {
        var allChains: [FBWalletChainEntity] = []
        for groupEntity in chainGroupEntity {
            allChains.append(contentsOf: groupEntity.chain_list)
        }
        return allChains
    }
    
    /// 正在等待启动页新增钱包
    @Published private(set) var waitingEntranceGuideFinish = false
    
    // TODO: 线程安全
    private let queue: DispatchQueue = .init(label: "com.wallet.operation")
    
    /// 是否同步中
    private var isSyncing: Bool = false
    private var isFetchingChainConfig = false
    
    private init() {
        userWallet = dataStore.loadUserWallet() ?? FBWalletUser(userId: userId, wallets: [])
        setupObservers()
        sync()
    }
    
    private func setupObservers() {
        // TODO: 监听登录登出
        
        // 监听网络
        rx_networkDisposable = BLSReachabilityManager.shared.rx_currentNetwork
            .observeOn(MainScheduler.instance)
            .subscribe(onNext: { [weak self] status in
                guard status != .none else { return }
                guard let self = self else { return }
                if self.chainGroupEntity.isEmpty {
                    self.getChainConfig()
                }
                self.sync()
            })
    }
    
    private func userChanged() {
        userId = 0 // FIXME:
        dataStore = Web3WalletDataStore(userId: userId)
        addressBookManager = .init(userId)
    }
}

// MARK: - Assistant

private extension Web3WalletManager {
    func saveOrUpdateUserWallet(_ postNoti: Bool = true) {
        guard let walletInfo = userWallet else {
            return
        }
        if postNoti {
            // 发通知
            NotificationCenter.default.post(name: Self.WalletChangedNotification, object: nil)
        }
        dataStore.saveOrUpdateUserWallet(walletInfo)
    }
    
    func accountFactory(with chainId: String, isTestnet: Bool) -> FBWalletAccountFactory? {
        guard let chain = FBWalletChain.with(chainId: chainId, isTestnet: isTestnet) else { return nil }
        switch chain {
        case .Ethereum:
            return FBWalletEthAccountFactory(chainId: chainId, isTestnet: isTestnet, chain: .Ethereum)
        case .Polygon:
            return FBWalletEthAccountFactory(chainId: chainId, isTestnet: isTestnet, chain: .Polygon)
        case .Avalanche:
            return FBWalletEthAccountFactory(chainId: chainId, isTestnet: isTestnet, chain: .Avalanche)
        case .BSC:
            return FBWalletEthAccountFactory(chainId: chainId, isTestnet: isTestnet, chain: .BSC)
        case .Arbitrum:
            return FBWalletEthAccountFactory(chainId: chainId, isTestnet: isTestnet, chain: .Arbitrum)
        case .Tron:
            return FBWalletTronAccountFactory(chainId: chainId, isTestnet: isTestnet, chain: .Tron)
        case .Bitcoin:
            return isTestnet ? FBWalletBitcoinTestnetAccountFactory(chainId: chainId) : FBWalletBitcoinAccountFactory(chainId: chainId)
        }
    }
}

// MARK: - Network

private extension Web3WalletManager {
    func getChainConfig() {
        guard !isFetchingChainConfig else { return }
        isFetchingChainConfig = true
        let req = BLRequestEntity()
        req.api = "http://101.32.75.228:10020/api/wallet/chain/getChainGroup"
        BLSHttpManager.get(request: req) { [weak self] response, _ in
            self?.isFetchingChainConfig = false
            guard response.code == .success, response.subCode.hasSuffix("00") else {
                return
            }
            guard let jsonDict = response.jsonDict,
                  let bodyMessageDict = jsonDict["bodyMessage"] as? [String: Any],
                  let groupList = bodyMessageDict["group_list"] as? [Any],
                  let groupListModels = [FBWalletChainGroupEntity].deserialize(from: groupList) as? [FBWalletChainGroupEntity] else { return }
            self?.chainGroupEntity = groupListModels
            let jsonStr = groupListModels.toJSONString()
            UserDefaults.standard.set(jsonStr, forKey: "FBWALLETCHAINGROUP")
            self?.chainGroupEntityDidChange.send(completion: .finished)
        } failure: { [weak self] err in
            self?.isFetchingChainConfig = false
            self?.chainGroupEntityDidChange.send(completion: .failure(err))
        }
    }
    
    func reportWalletAddress(_ param: FBWalletParamEntity, completion: @escaping (Result<String, String>) -> Void) {
        let req = BLRequestEntity()
        req.api = "http://101.32.75.228:10020/api/wallet/account/reportWalletAddress"
        req.params = param.toJSON()
        BLSHttpManager.post(request: req) { response in
            guard response.code == .success, response.subCode.hasSuffix("00") else {
                completion(.failure(response.message))
                return
            }
            completion(.success(response.message))
        } failure: { error in
            completion(.failure(error.localizedDescription))
        }
    }
}

// MARK: - Interface

extension Web3WalletManager {
    public func prepare() {
        if let chainGroupJsonStr = UserDefaults.standard.value(forKey: "FBWALLETCHAINGROUP") as? String,
           let group = [FBWalletChainGroupEntity].deserialize(from: chainGroupJsonStr) as? [FBWalletChainGroupEntity]
        {
            chainGroupEntity = group
        }
        getChainConfig()
        
        FBWalletBitcoinTestnetAccountFactory.prepare()
    }
    
    /// 启动页开始
    func startEntranceGuide() {
        waitingEntranceGuideFinish = true
    }
    
    /// 启动页结束
    func endEntranceGuide() {
        guard waitingEntranceGuideFinish == true else { return }
        waitingEntranceGuideFinish = false
    }
    
    /// 标记某个任务开始的控制器，任务完成会回退到这个控制器
    func startTask(_ startVC: UIViewController) {
        taskStartVC = startVC
    }
    
    /// 任务结束，回退到标记的控制器
    func endTaskAndPopToBegin(_ curNav: UINavigationController?, animated: Bool = true) {
        guard let nav = curNav,
              let startVC = taskStartVC,
              nav.viewControllers.contains(startVC) else { return }
        taskStartVC = nil
        nav.popToViewController(startVC, animated: animated)
    }
    
    /// 获取钱包列表
    func getWalletList() -> [FBWallet] {
//        checkAndDeleteEmptyWallet()
        return userWallet.wallets.filter { !$0.accounts.isEmpty }
    }
    
    /// 创建新的钱包，注意：未存储，设置完成需调用存储 addWallet
    func createNewWallet() -> FBWallet {
        let wallet = FBWallet()
        wallet.mnemonics = FBMnemonicsHelper.generateMnemonics()
        wallet.source = .mnemonicsCreate
        wallet.createTime = Date().timeIntervalSince1970
        return wallet
    }
    
    /// 通过助记词导入钱包，注意：未存储，设置完成需调用存储 addWallet
    func importWalletWith(mnemonics: String) -> FBWallet? {
        let wallet = FBWallet()
        wallet.mnemonics = mnemonics.trim()
        wallet.source = .mnemonicsImport
        wallet.isBackup = true
        wallet.createTime = Date().timeIntervalSince1970
        return wallet
    }
    
    /// 通过私钥导入钱包，注意：未存储，设置完成需调用存储 addWallet
    func importWalletWith(privateKey: String) -> FBWallet? {
        let wallet = FBWallet()
        wallet.privateKey = privateKey
        wallet.source = .privateKeyImport
        wallet.isBackup = true
        wallet.createTime = Date().timeIntervalSince1970
        return wallet
    }
    
    /// 通过keystore导入钱包，注意：未存储，设置完成需调用存储 addWallet
    func importWalletWith(keystore: String, keystorePassword: String) -> FBWallet? {
        let wallet = FBWallet()
        wallet.keystore = keystore
        wallet.keystorePassword = keystorePassword
        wallet.source = .keystoreImport
        wallet.isBackup = true
        wallet.createTime = Date().timeIntervalSince1970
        return wallet
    }
    
    /// 添加新的钱包
    func addWallet(_ wallet: FBWallet) {
        guard userWallet.wallets.filter({ $0.walletId == wallet.walletId }).isEmpty else { return }
        userWallet?.wallets.append(wallet)
        saveOrUpdateUserWallet()
    }
    
    /// 更新钱包信息
    func updateWallet(_ wallet: FBWallet) {
        guard let index = userWallet?.wallets.firstIndex(where: { $0.walletId == wallet.walletId }) else {
            return
        }
        userWallet?.wallets[index] = wallet
        saveOrUpdateUserWallet()
    }
    
    /// 删除钱包
    func deleteWallet(_ walletId: String) {
        let wallets = userWallet?.wallets.filter { $0.walletId != walletId } ?? []
        userWallet?.wallets = wallets
        saveOrUpdateUserWallet()
        if userWallet.wallets.isEmpty {
            startEntranceGuide()
        }
    }
    
    /// 钱包备份成功
    func walletBackupSuccess(_ wallet: FBWallet) {
        wallet.isBackup = true
        saveOrUpdateUserWallet()
    }
    
    /// 修改排序
    func walletsOrderChanged(_ wallets: [FBWallet]) {
        userWallet.wallets = wallets
        saveOrUpdateUserWallet()
    }
    
    /// 根据账户获取钱包
    func wallet(with account: FBWalletAccount) -> FBWallet? {
        return userWallet.wallets.first { item in
            item.accounts.filter { $0.accountId == account.accountId }.count > 0
        }
    }
    
    /// 创建新的账户（注：wallet 需已存储）
    @discardableResult
    func createNewAccount(in walletId: String, chainId: String, isTestnet: Bool, save: Bool = true) -> FBWalletAccount? {
        guard let wallet = userWallet.wallets.first(where: { item in
            item.walletId == walletId
        }) else { return nil }
        guard let factory = accountFactory(with: chainId, isTestnet: isTestnet) else { return nil }
        let password = wallet.password
        var account: FBWalletAccount?
        if let mnemonics = wallet.mnemonics {
            account = try? factory.accountWith(mnemonics: mnemonics, password: password)
        } else if var privateKey = wallet.privateKey {
            if privateKey.count <= 52, let hexKey = FBBitcoinAccountHelper.wifToHex(privateKeyWif: privateKey) {
                privateKey = hexKey
            }
            account = try? factory.accountWith(privateKey: privateKey, password: password)
        } else {
            // TODO: keystore
        }
        if let account = account {
            var index = 1
            var name = "Account-\(index)"
            let names = wallet.accounts.compactMap { $0.name }
            while names.contains(name) {
                index += 1
                name = "Account-\(index)"
            }
            account.name = name
            wallet.accounts.append(account)
            if save {
                saveOrUpdateUserWallet()
            }
        }
        return account
    }
    
    /// 更新账户
    func updateAccount(_ account: FBWalletAccount, walletId: String) {
        guard let wallet = userWallet?.wallets.first(where: { $0.walletId == walletId }) else {
            return
        }
        if let index = wallet.accounts.firstIndex(where: { $0.accountId == account.accountId }) {
            wallet.accounts[index] = account
            saveOrUpdateUserWallet()
        }
    }
    
    /// 删除账户
    func deleteAccount(_ account: FBWalletAccount) {
        let wallets = userWallet.wallets
        for wallet in wallets {
            wallet.accounts = wallet.accounts.filter { $0.accountId != account.accountId }
        }
        saveOrUpdateUserWallet()
    }
    
    /// 导出私钥
    func exportPrivateKey(with account: FBWalletAccount, password: String) -> String? {
        guard account.privateKey == nil else {
            return account.privateKey
        }
        guard let keystoreData = account.keystore else {
            return nil
        }

        if account.chain == .Bitcoin {
            guard let storeKey = StoredKey.importJSON(json: keystoreData),
                  let privateKeyData = storeKey.decryptPrivateKey(password: Data(password.utf8))
            else {
                return nil
            }
            let privateKey = FBBitcoinAccountHelper.hexToWIF(privateKeyHex: privateKeyData.toHexString(), mainnet: !account.isTestnet)
            return privateKey
        }
        
        guard let keystore = EthereumKeystoreV3(keystoreData), let address = keystore.addresses?.first else {
            return nil
        }
        
        do {
            let privateKey = try keystore.UNSAFE_getPrivateKeyData(password: password, account: address)
            return privateKey.toHexString()
        } catch {
            print("私钥导出失败：\(error)")
            return nil
        }
    }
    
    /// 通过助记词查询钱包是否已存在
    func checkWalletExistsWith(mnemonics: String) -> Bool {
        let mnemonics = mnemonics.trim()
        let wallets = userWallet.wallets.filter { $0.mnemonics == mnemonics }
        if !wallets.isEmpty {
            let wallet = wallets[0]
            if wallet.accounts.isEmpty {
                // 空钱包
                
            }
        }
        return !userWallet.wallets.filter { $0.mnemonics == mnemonics }.isEmpty
    }
    
    /// 通过私钥查询钱包是否已存在
    func checkWalletExistsWith(privateKey: String) -> Bool {
        let privateKey = privateKey.trim()
        return !userWallet.wallets.filter { $0.privateKey == privateKey }.isEmpty
    }
    
    private func checkAndDeleteEmptyWallet() {
        var walletIds: [String] = []
        for wallet in userWallet.wallets where wallet.accounts.isEmpty {
            walletIds.append(wallet.walletId)
        }
        guard !walletIds.isEmpty else { return }
        let wallets = userWallet?.wallets.filter { !walletIds.contains($0.walletId) } ?? []
        userWallet?.wallets = wallets
        saveOrUpdateUserWallet(false)
    }
    
    func sync() {
        guard !isSyncing else { return }
        isSyncing = true
        let group = DispatchGroup()
        let wallets = userWallet.wallets
        for wallet in wallets {
            let unSyncAccounts = wallet.accounts.filter { $0.isSync == false }
            guard !unSyncAccounts.isEmpty else { continue }
            var paramEntity = FBWalletParamEntity()
            paramEntity.wallet_id = wallet.walletId
            paramEntity.wallet_name = wallet.name
            if let createTime = wallet.createTime {
                paramEntity.create_time = Int(createTime * 1000)
            } else {
                paramEntity.create_time = 0
            }
            paramEntity.uid = -1 // FIXME:
            if let source = wallet.source {
                paramEntity.create_type = source.rawValue
            }
            var paramAccounts: [FBWalletParamEntity.Address] = []
            for account in unSyncAccounts {
                var a = FBWalletParamEntity.Address()
                a.address = account.address
                a.chain_id = account.chainId
                if account.chain == .Bitcoin {
                    a.address_type = "taproot"
                } else {
                    a.address_type = ""
                }
                a.address_name = account.name
                a.mark = ""
                paramAccounts.append(a)
            }
            paramEntity.addresses = paramAccounts
            FBWalletLog.debug("group enter")
            group.enter()
            reportWalletAddress(paramEntity) { [weak self] result in
                group.leave()
                FBWalletLog.debug("group leave")
                if case .success = result {
                    for account in unSyncAccounts {
                        account.isSync = true
                    }
                    self?.saveOrUpdateUserWallet(false)
                }
            }
        }
        group.notify(queue: .main) {
            self.isSyncing = false
            FBWalletLog.debug("group notify")
        }
    }
    
    /// 获取链icon地址
    func chainIconUrl(with chain: FBWalletChain) -> String? {
        guard let entity = chainInfoDict["\(chain.rawValue)"] else { return nil }
        return entity.icon
    }
}

extension Web3WalletManager {
    /// 校验密码合法性
    func validateWalletPassword(_ password: String) -> Bool {
        // 检查密码长度是否在8到16个字符之间
        guard password.count >= 8, password.count <= 16 else {
            return false
        }
        
        // 检查密码是否包含至少一个数字
        let hasNumber = password.rangeOfCharacter(from: CharacterSet.decimalDigits) != nil
        
        // 检查密码是否包含至少一个字母
        let hasLetter = password.rangeOfCharacter(from: CharacterSet.letters) != nil
        
        // 密码必须同时包含数字和字母
        return hasNumber && hasLetter
    }
}

// MARK: - NSNotification.Name

extension Web3WalletManager {
    static let WalletChangedNotification: NSNotification.Name = .init(rawValue: "com.web3wallet.walletchanged")
}

// MARK: - Web3WalletDataStore 数据存取

class Web3WalletDataStore {
    let userId: Int
    
    private var userDirectory: URL? {
        let documentURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
        return documentURL?.appendingPathComponent("wallet/\(userId)")
    }
    
    private var fileURL: URL? {
        return userDirectory?.appendingPathComponent("walletInfo.json")
    }
    
    init(userId: Int) {
        self.userId = userId
    }
}

extension Web3WalletDataStore {
    func saveOrUpdateUserWallet(_ walletInfo: FBWalletUser) {
        guard let userDirectory = userDirectory,
              let fileURL = fileURL
        else {
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
        guard let fileURL = fileURL else {
            print("用户钱包不存在")
            return nil
        }
        
        do {
            let jsonData = try Data(contentsOf: fileURL)
            let walletInfo = try JSONDecoder().decode(FBWalletUser.self, from: jsonData)
            return walletInfo
            
        } catch {
            print("钱包数据读取失败")
            return nil
        }
    }
}

//
//  FBWalletTransferManager.swift
//  Module_Web3Wallet
//
//  Created by bv-mac-build on 2024/12/13.
//

import Foundation
import web3swift
import Web3Core
import BigInt
import WalletCore

// MARK: - ETH钱包交易
struct TransactionParams {
    var coin: FBWalletCoinEntity
    var account: FBWalletAccount
    var toAddress: String
    var amount: String
    var password: String
    var contractAddress: String?
    var gasLimit: Double = 21000
    var gasPrice: Double = 25
    var extraData: Data?
    var args: [[String: String]]?
    var dataStr: String?
    var method: String?
}

typealias TransationResult = Result<String, FBWalletError>

class FBWalletTransferManager {
    var tronWeb = TronWeb3()

    func accountPrivateKey(_ chainID: String?) -> String? {
        guard let chain_id = chainID, !chain_id.isEmpty else {
            return nil
        }
        let account = Web3WalletManager.shared.currentWallet?.accounts.first(where: {$0.chainId == chain_id})
        return account?.privateKey
    }
    
    static func isValid(address: String, chain: FBWalletChain) -> Bool {
        
        switch chain {
        case .Ethereum, .Polygon, .Avalanche, .BSC, .Arbitrum:
            return AnyAddress.isValid(string: address, coin: .ethereum)
        case .Tron:
            return AnyAddress.isValid(string: address, coin: .tron)
        case .Bitcoin:
            if address.hasPrefix("tb") {
                return true
            }
            return AnyAddress.isValid(string: address, coin: .bitcoin)
        }
    }
    
    func estimateFee(infos: TransferInfos, completion: ((String, String) -> Void)?) {
        switch infos.selectCoin?.chain {
        case .Ethereum, .Polygon, .Avalanche, .BSC, .Arbitrum:
            Task {
                let result = await ethGasPrice(coin: infos.selectCoin)
                completion?(result.0, result.1)
            }
        case .Tron:
            if infos.selectCoin?.isContract == true {
                estimateEnergy(infos) { gasValue, coinValue in
                    completion?(gasValue, coinValue)
                }
            } else {
                estimateTRXTransferFee(infos) { gasValue, coinValue in
                    completion?(gasValue, coinValue)
                }
            }
            
        case .Bitcoin:
            Task {
                do {
                    let feeValue = try await FBBitcoinNetworkService.getRecommendedFee()
                    let bitcoinValue = FBBitcoinTransactionHelper.convertSatoshiToBTC(satoshiAmount: feeValue)
                    completion?("\(feeValue)", String(format: "%.9f", bitcoinValue))
                } catch {
                    completion? ("0", "0")
                }
            }
        default:
            completion? ("0", "0")
        }
    }
    
    /// 获取币种余额
    func getBalance(coin: FBWalletCoinEntity, completion: ((TransationResult) -> Void)?) {

        switch coin.chain {
        case .Ethereum, .Avalanche, .BSC, .Polygon, .Arbitrum:
            Task {
                let result = await ethFetchBalance(coin: coin)
                DispatchQueue.main.async {
                    completion?(result)
                }
            }
        case .Tron:
            getRTXBalance(coin: coin, completion: completion)
            
        case .Bitcoin:
            guard let address = coin.address else {
                return
            }
            Task {
                do {
                    let balance = try await FBBitcoinNetworkService.getBanlance(address)
                    DispatchQueue.main.async {
                        completion?(.success(String(format: "%.9f", balance)))
                    }
                } catch {
                    DispatchQueue.main.async {
                        completion?(.failure(FBWalletError.transationError(error.localizedDescription)))
                    }
                }
            }
        default:
            break
        }
    }
    
    /// 获取合约代币余额
    func getContractBalance(coin: FBWalletCoinEntity, completion: ((TransationResult) -> Void)?) {
        switch coin.chain {
        case .Ethereum, .Avalanche, .BSC, .Polygon, .Arbitrum:
            Task {
                let result = await ethFechTRC20Balance(coin: coin)
                DispatchQueue.main.async {
                    completion?(result)
                }
            }
        case .Tron:
            getTRC20TokenBalance(coin: coin, completion: completion)
        case .Bitcoin:
            break
        default:
            break
        }
    }
    
    func transfer(_ params: TransactionParams, completion: ((TransationResult) -> Void)?) {
        if params.coin.isContract {
            contractTransfer(params, completion: completion)
        } else {
            rawTransfer(params, completion: completion)
        }
    }
    
    /// 币种原始交易
    func rawTransfer(_ params: TransactionParams, completion: ((TransationResult) -> Void)?) {
        guard let chain = params.coin.chain else {
            return
        }
        
        switch chain {
        case .Ethereum, .Avalanche, .Polygon, .BSC, .Arbitrum:
            Task {
                let result = await ethRawTransation(params)
                DispatchQueue.main.async {
                    completion?(result)
                }
            }
        case .Tron:
            tronWebRawTransation(params, completion: completion)
        case .Bitcoin:
            Task {
                do {
                    guard let privateKey = accountPrivateKey(params.coin.chain_id) else {
                        completion?(.failure(FBWalletError.transationError("privateKey nil error")))
                        return
                    }
                    
                    let result = try await FBBitcoinTransactionHelper.transfer(params, privateKey: privateKey)
                    DispatchQueue.main.async {
                        completion?(.success(result))
                    }
                } catch  {
                    DispatchQueue.main.async {
                        completion?(.failure(FBWalletError.transationError(error.localizedDescription)))
                    }
                }
            }
        }
    }
    
    /// 币种合约交易
    func contractTransfer(_ params: TransactionParams, completion: ((TransationResult) -> Void)?) {
        let chain = params.account.chain!
        switch chain {
        case .Ethereum, .Avalanche, .Polygon, .BSC, .Arbitrum:
            Task {
                let result = await ethContractTransation(params)
                DispatchQueue.main.async {
                    completion?(result)
                }
            }
        case .Tron:
            tronWebContractTransation(params, completion: completion)
        case .Bitcoin:
            break
        }
    }
    
    /// 闪兑
    func swapTransation(_ params: TransactionParams, _ tokenAmount: String? = nil, completion: ((TransationResult) -> Void)?) {
        guard let chain = params.coin.chain else {
            return
        }
        switch chain {
        case .Ethereum, .Avalanche, .Polygon, .BSC, .Arbitrum:
            Task {
                let result = await swapEthRawTransation(params, tokenAmount)
                DispatchQueue.main.async {
                    completion?(result)
                }
            }
        case .Tron:
            tronWebSwapRawTransation(params, completion: completion)
            break
        case .Bitcoin:
            break
        }
    }
}

// MARK: - ETH 交易
extension FBWalletTransferManager {
    /// 原始交易
    func ethRawTransation(_ params: TransactionParams) async -> TransationResult {
        guard let url = params.coin.url, let chainID = BigUInt(params.coin.chain_id ?? "") else {
            return .failure(FBWalletError.transationError("chain error"))
        }
        print("\(params.coin.chain?.rawValue ?? "") 交易创建中，请稍后……")

        guard let url = URL(string: url), let web3 = try? await Web3.new(url) else {
            return .failure(FBWalletError.transationError("交易：web3 http 地址不可用，不能连接到节点"))
        }
        
        guard let keystoreData = params.account.keystore else {
            return .failure(FBWalletError.transationError("交易账户keystore数据为空"))
        }
        
        var abstractKeystore: AbstractKeystore? = BIP32Keystore(keystoreData)
        if abstractKeystore == nil {
            abstractKeystore = EthereumKeystoreV3(keystoreData)
        }
        guard let keystore = abstractKeystore else {
            return .failure(FBWalletError.transationError("交易账户keystore加载失败"))
        }
        
        var ksManager: KeystoreManager?
        if let bipKeystore = keystore as? BIP32Keystore {
            ksManager = KeystoreManager([bipKeystore])
        }
        if let ethKeystore = keystore as? EthereumKeystoreV3 {
            ksManager = KeystoreManager([ethKeystore])
        }
        
        web3.addKeystoreManager(ksManager)
        guard let fromAdderess = keystore.addresses?.first, let toAddress = EthereumAddress(params.toAddress) else {
            return .failure(FBWalletError.transationError("交易地址创建失败！"))
        }
        let nonce = try? await web3.eth.getTransactionCount(for: fromAdderess)
        let value = Utilities.parseToBigUInt(params.amount, units: .ether)
        let gasPrice = Utilities.parseToBigUInt("\(params.gasPrice)", units: .gwei)
        let gasLimit = BigUInt(params.gasLimit)
        let data = params.extraData ?? Data()
        
        var transaction = CodableTransaction(to: toAddress,
                                             nonce: nonce ?? BigUInt(0),
                                             chainID: chainID,
                                             value: value!,
                                             data: data,
                                             gasLimit: gasLimit,
                                             gasPrice: gasPrice)
        do {
            try Web3Signer.signTX(transaction: &transaction, keystore: keystore, account: fromAdderess, password: params.password)
            FBWalletLog.debug("完成交易签名")
        } catch  {
            return .failure(FBWalletError.transationError(error.localizedDescription))
        }
        guard let rawTransaction = transaction.encode() else {
            return .failure(FBWalletError.transationError("无法生成原始交易"))
        }
        
        do {
            let sendResult = try await web3.eth.send(raw: rawTransaction)
            FBWalletLog.debug("交易成功：\(sendResult.hash)")
            return .success(sendResult.hash)
        } catch  {
            return .failure(FBWalletError.transationError("交易发送失败！:\(error)"))
        }
    }
    /// swap原始交易
    func swapEthRawTransation(_ params: TransactionParams, _ tokenAmount: String? = nil) async -> TransationResult {
        guard let url = params.coin.url, let chainID = BigUInt(params.coin.chain_id ?? "") else {
            return .failure(FBWalletError.transationError("chain error"))
        }
        print("\(params.coin.chain?.rawValue ?? "") 交易创建中，请稍后……")

        guard let url = URL(string: url), let web3 = try? await Web3.new(url) else {
            return .failure(FBWalletError.transationError("交易：web3 http 地址不可用，不能连接到节点"))
        }
        
        guard let keystoreData = params.account.keystore else {
            return .failure(FBWalletError.transationError("交易账户keystore数据为空"))
        }
        
        var abstractKeystore: AbstractKeystore? = BIP32Keystore(keystoreData)
        if abstractKeystore == nil {
            abstractKeystore = EthereumKeystoreV3(keystoreData)
        }
        guard let keystore = abstractKeystore else {
            return .failure(FBWalletError.transationError("交易账户keystore加载失败"))
        }
        
        var ksManager: KeystoreManager?
        if let bipKeystore = keystore as? BIP32Keystore {
            ksManager = KeystoreManager([bipKeystore])
        }
        if let ethKeystore = keystore as? EthereumKeystoreV3 {
            ksManager = KeystoreManager([ethKeystore])
        }
        
        web3.addKeystoreManager(ksManager)
        guard let fromAdderess = keystore.addresses?.first, let toAddress = EthereumAddress(params.toAddress) else {
            return .failure(FBWalletError.transationError("交易地址创建失败！"))
        }
        let nonce = try? await web3.eth.getTransactionCount(for: fromAdderess)
        let value = Utilities.parseToBigUInt(params.amount, units: .wei)
        let gasPrice = Utilities.parseToBigUInt("\(params.gasPrice)", units: .gwei)
        let gasLimit = BigUInt(params.gasLimit)
        let data = params.extraData ?? Data()
        
        var transaction = CodableTransaction(to: toAddress,
                                             nonce: nonce ?? BigUInt(0),
                                             chainID: chainID,
                                             value: value!,
                                             data: data,
                                             gasLimit: gasLimit,
                                             gasPrice: gasPrice)
        if params.coin.isContract { // 代币 allowance 不够，需要 approve
            guard let address = EthereumAddress(params.account.address), let tokenAmount,
                  let value = Utilities.parseToBigUInt(tokenAmount, units: .ether),
                  let contract_address = params.coin.contract_address, let ca = EthereumAddress(contract_address) else {
                return .failure(FBWalletError.transationError("交易授权失败！"))
            }
            let e2: ERC20 = .init(web3: web3, provider: web3.provider, address: ca, transaction: transaction)
            var balance: BigUInt = 0
            do {
                balance = try await e2.getBalance(account: ca)
                guard balance > 0 else {
                    return .failure(FBWalletError.transationError("余额不足！"))
                }
                if balance < value {
                    return .failure(FBWalletError.transationError("余额不足！"))
                }
            } catch {
                return .failure(FBWalletError.transationError("余额查询失败！:\(error)"))
            }
            do {
                let result = try await e2.getAllowance(originalOwner: address, delegate: toAddress)
                if result < value {
                    let amount: String = "115792089237316195423570985008687907853269984665640564039457.584007913129639935"
                    let operation = try await e2.approve(from: address, spender: toAddress, amount: amount)
                    operation.transaction.chainID = BigUInt(params.account.chainId)
                    let result = try await operation.writeToChain(password: params.password)
                    debugPrint("qyh_approve.hash", result.hash)
                    let nonce = try await web3.eth.getTransactionCount(for: fromAdderess, onBlock: .pending)
                    transaction.nonce = nonce
                }
                FBWalletLog.debug("完成授权！")
            } catch {
                return .failure(FBWalletError.transationError("交易授权失败！:\(error)"))
            }
        }
        do {
            var tx = transaction
            tx.from = EthereumAddress(params.account.address)
            let estimateGas = try await web3.eth.estimateGas(for: tx)
            let gasLimit = estimateGas * BigUInt(1.1)
            transaction.gasLimit = gasLimit
        } catch { // 模拟交易失败用的接口返回的大约 1.5 倍的 gasLimit
            debugPrint("获取交易estimateGas失败！", error)
        }
        do {
            try Web3Signer.signTX(transaction: &transaction, keystore: keystore, account: fromAdderess, password: params.password)
            FBWalletLog.debug("完成交易签名")
        } catch {
            return .failure(FBWalletError.transationError(error.localizedDescription))
        }
        guard let rawTransaction = transaction.encode() else {
            return .failure(FBWalletError.transationError("无法生成原始交易"))
        }
        do {
            let sendResult = try await web3.eth.send(raw: rawTransaction)
            FBWalletLog.debug("交易成功：\(sendResult.hash)")
            return .success(sendResult.hash)
        } catch {
            return .failure(FBWalletError.transationError("交易发送失败！:\(error)"))
        }
    }
    /// 合约交易
    func ethContractTransation(_ params: TransactionParams) async -> TransationResult {
        do {
            guard let url = params.coin.url, let chainID = BigUInt(params.coin.chain_id ?? "") else {
                return .failure(FBWalletError.transationError("chain error"))
            }
            
            FBWalletLog.debug("\(params.coin.chain?.symbol ?? "") 合约交易发起中，请稍后....")
            
            guard let url = URL(string: url) else {
                return .failure(FBWalletError.transationError("合约交易：url 错误"))
            }
            let web3 = try await Web3.new(url)
            web3.provider.network = .Custom(networkID: chainID)
            
            guard let contractAddressStr = params.contractAddress, let contractAddress = EthereumAddress(from: contractAddressStr) else {
                return .failure(FBWalletError.transationError("合约交易：合约地址错误"))
            }
        
            let contract = web3.contract(Web3.Utils.erc20ABI, at: contractAddress)
            
            guard let keystoreData = params.account.keystore else {
                return .failure(FBWalletError.transationError("合约交易: keystore 加载失败"))
            }
            
            var abstractKeystore: AbstractKeystore? = BIP32Keystore(keystoreData)
            if abstractKeystore == nil {
                abstractKeystore = EthereumKeystoreV3(keystoreData)
            }
            guard let keystore = abstractKeystore else {
                return .failure(FBWalletError.transationError("交易账户keystore加载失败"))
            }
            
            var ksManager: KeystoreManager?
            if let bipKeystore = keystore as? BIP32Keystore {
                ksManager = KeystoreManager([bipKeystore])
            }
            if let ethKeystore = keystore as? EthereumKeystoreV3 {
                ksManager = KeystoreManager([ethKeystore])
            }

            web3.provider.attachedKeystoreManager = ksManager
            
            guard let fromEthAddress = abstractKeystore?.addresses?.first, let toEthAddress = EthereumAddress(params.toAddress) else {
                return .failure(FBWalletError.transationError("合约交易: 地址加载错误"))
            }
            
            let amount = Utilities.parseToBigUInt(params.amount, units: .ether)
            let method = "transfer"
            let extraData = params.extraData ?? Data()
            guard let writeTX = contract?.createWriteOperation(method, parameters: [toEthAddress, amount!], extraData: extraData) else {
                
                return .failure(FBWalletError.transationError("合约交易: writeTX 创建失败"))
            }
            writeTX.transaction.value = BigUInt(0) // 转代币，这里固定是0
            writeTX.transaction.from = fromEthAddress
            writeTX.transaction.to = contractAddress // 转代币，这里是合约地址
            writeTX.transaction.chainID = chainID
            
            let policies = Policies(gasLimitPolicy: .automatic, gasPricePolicy: .automatic)
            let response = try await writeTX.writeToChain(password: params.password, policies: policies)
            FBWalletLog.debug("合约交易: 完成: \(response.hash)")
            return .success(response.hash)
        } catch {
            return .failure(FBWalletError.transationError("合约交易: 错误：\(error.localizedDescription)"))
        }
    }
    
    /// 查询余额
    func ethFetchBalance(coin: FBWalletCoinEntity) async -> TransationResult {

        guard let url = coin.url, let chainID = BigUInt(coin.chain_id ?? ""), let address = coin.address else {
            return .failure(FBWalletError.transationError("address error"))
        }
        guard let url = URL(string: url), let address = EthereumAddress(address) else {
            FBWalletLog.error("url 或 address 错误")
            return .failure(FBWalletError.transationError("url or address error"))
        }
        do {
            let web3 = try await Web3.new(url)
            web3.provider.network = .Custom(networkID: chainID)
            let balanceResult = try await web3.eth.getBalance(for: address)
            let coinValueBalance = Utilities.formatToPrecision(balanceResult)
            FBWalletLog.debug("\(coin.name ?? "")余额：\(coinValueBalance)")
            return .success(coinValueBalance)
            
        } catch {
            FBWalletLog.error("\(coin.name ?? "") 获取余额错误")
            return .failure(FBWalletError.transationError("\(coin.name ?? "") get balance error"))
        }
    }
    
    func ethFechTRC20Balance(coin: FBWalletCoinEntity) async -> TransationResult {
        do {
            guard let url = coin.url, let chainID = BigUInt(coin.chain_id ?? "") else {
                return .failure(FBWalletError.transationError("chain error"))
            }
            
            FBWalletLog.debug("\(coin.chain?.rawValue ?? "") \(coin.symbol ?? "") 合约余额查询中，请稍后....")
            
            guard let url = URL(string: url) else {
                return .failure(FBWalletError.transationError("合约余额查询：url 错误"))
            }
            let web3 = try await Web3.new(url)
            web3.provider.network = .Custom(networkID: chainID)
            
            guard let contractAddressStr = coin.contract_address, let contractAddress = EthereumAddress(from: contractAddressStr) else {
                return .failure(FBWalletError.transationError("合约余额查询：合约地址错误"))
            }
            
            guard let accountAddress = coin.address, let address = EthereumAddress(from: accountAddress) else {
                return .failure(FBWalletError.transationError("合约余额查询：账户地址错误"))
            }
        
            let contract = web3.contract(Web3.Utils.erc20ABI, at: contractAddress)
            let reeadOperation = contract?.createReadOperation("balanceOf", parameters: [accountAddress])
            let result = try await reeadOperation?.callContractMethod()
            
            if let balance = result?["balance"] as? BigUInt {
                let balanceValue = Utilities.formatToPrecision(balance)
                return .success(balanceValue)
            } else {
                return .failure(FBWalletError.transationError("\(coin.chain?.rawValue) \(coin.symbol ?? "") 合约余额查询失败"))
            }
    
        } catch {
            return .failure(FBWalletError.transationError("\(coin.chain?.title ?? "") \(coin.symbol ?? "") 合约余额查询失败"))
        }
    }
    
    func ethGasPrice(coin: FBWalletCoinEntity?) async -> (String, String) {
        guard let url = coin?.url, let chainID = BigUInt(coin?.chain_id ?? "") else {
            return ("0","0")
        }
        guard let url = URL(string: url) else {
            FBWalletLog.error("url 错误")
            return ("0","0")
        }
        
        do {
            let web3 = try await Web3.new(url)
            web3.provider.network = .Custom(networkID: chainID)
            let gasPrice = try await web3.eth.gasPrice()
            let gasLimit = BigUInt(21000)
            let gasValue = Utilities.formatToPrecision(gasPrice, units: .gwei)
            let ethValue = Utilities.formatToPrecision(gasPrice * gasLimit, units: .ether, formattingDecimals: 9)
            FBWalletLog.debug("gasPrice: \(gasValue), \(ethValue)")
            return (gasValue, ethValue)
        } catch {
            FBWalletLog.error("\(coin?.name ?? "") 获取GasPrice错误")
            return ("0", "0")
        }
    }
}


// MARK: - Tron 交易
extension FBWalletTransferManager {
    
    func setupTronWeb(_ chainID: String?, nodeURL: String? = nil, onCompleted: ((Bool, String) -> Void)? = nil) {
        let accountPrivateKey = self.accountPrivateKey(chainID)
        guard let privateKeyHex = accountPrivateKey, !privateKeyHex.isEmpty else {
            onCompleted?(false, "error: privateKey null")
            return
        }
        if tronWeb.isGenerateTronWebInstanceSuccess == true {
            onCompleted?(true, "")
            return
        }
        
        var url = nodeURL
        if url == nil || url?.isEmpty == true {
            url = TRONNileNet
        }
        tronWeb.setup(privateKey: privateKeyHex, node: url!, onCompleted: { status, error in
            onCompleted?(status, error)
        })
    }
    
    func tronWebRawTransation(_ params: TransactionParams, completion: ((TransationResult) -> Void)?) {
        let RTX: Int64 = 1000000
        let toAddress = params.toAddress
        let amountValue = Double(params.amount) ?? 0
   
        let amount = "\(amountValue * Double(RTX))"
        tronWeb.trxTransfer(toAddress: toAddress, amount: amount, onCompleted: { isSuccess, txid, error in
            if !error.isEmpty {
                FBWalletLog.debug("tronWeb trxTransfer error: \(error)")
                completion?(.failure(FBWalletError.transationError(error)))
            } else {
                FBWalletLog.debug("tronWeb trxTransfer txid: \(txid)")
                completion?(.success(txid))
            }
        })
    }
    
    func tronWebSwapRawTransation(_ params: TransactionParams, completion: ((TransationResult) -> Void)?) {
        let RTX: BigUInt = 1000000
        let toAddress = params.toAddress
        guard let contractAddress = params.contractAddress else {
            completion?(.failure(FBWalletError.transationError("合约地址为空")))
            return
        }
        let transferAmount = Utilities.parseToBigUInt(params.amount, units: .custom(18)) ?? BigUInt(0)
        let feeValue = params.gasPrice != 0 ? params.gasPrice : 10
        let feeLimit = BigUInt(feeValue) * RTX
//        tronWeb.trc20TronSwap(toAddress: toAddress, trc20ContractAddress: contractAddress, amount: "\(transferAmount)",
//                              args: params.args ?? [], feeLimit: "\(feeLimit)", onCompleted: { isSuccess, txid, error in
//            if !error.isEmpty {
//                FBWalletLog.debug("tronWeb trc20TronSwap error: \(error)")
//                completion?(.failure(FBWalletError.transationError(error)))
//            } else {
//                FBWalletLog.debug("tronWeb trc20TronSwap txid: \(txid)")
//                completion?(.success(txid))
//            }
//        })
        guard let dataStr = params.dataStr else {
            completion?(.failure(FBWalletError.transationError("data参数为空")))
            return
        }
        let data = dataStr.replace("0x", with: "")
        tronWeb.trc20TrxSwap(toAddress: toAddress, amount: String(transferAmount), data: data) { isSuccess, txid, error in
            if !error.isEmpty {
                FBWalletLog.debug("tronWeb trc20TrxSwap error: \(error)")
                completion?(.failure(FBWalletError.transationError(error)))
            } else {
                FBWalletLog.debug("tronWeb trc20TrxSwap txid: \(txid)")
                completion?(.success(txid))
            }
        }
    }
    
    func tronWebContractTransation(_ params: TransactionParams, completion: ((TransationResult) -> Void)?) {
        let RTX: BigUInt = 1000000
        let toAddress = params.toAddress
        guard let contractAddress = params.contractAddress else {
            FBWalletLog.debug("合约地址为空")
            completion?(.failure(FBWalletError.transationError("合约地址为空")))
            return
        }
        
        let transferAmount = Utilities.parseToBigUInt(params.amount, units: .custom(18)) ?? BigUInt(0)
        let feeValue = params.gasPrice != 0 ? params.gasPrice : 10
        let feeLimit = BigUInt(feeValue) * RTX
        tronWeb.trc20TokenTransfer(toAddress: toAddress, trc20ContractAddress: contractAddress,
                                    amount: "\(transferAmount)", remark: "",feeLimit: "\(feeLimit)",
                                    onCompleted: { isSuccess, txid, error in
            
            if !error.isEmpty {
                FBWalletLog.debug("tronWeb trc20TokenTransfer error: \(error)")
                completion?(.failure(FBWalletError.transationError(error)))
            } else {
                FBWalletLog.debug("tronWeb trc20TokenTransfer txid: \(txid)")
                completion?(.success(txid))
            }
        })
    }
    
    /// 查询 RTX 币余额
    func getRTXBalance(coin: FBWalletCoinEntity, completion: ((TransationResult) -> Void)?) {
        guard let address = coin.address else {
            completion?(.failure(FBWalletError.transationError("address error")))
            return
        }
        
        setupTronWeb(coin.chain_id, nodeURL: coin.url) {[weak self]  isSuccess, error in
            if !isSuccess {
                FBWalletLog.debug("tronWeb setup error: \(error)")
                return
            }
            self?.tronWeb.getRTXBalance(address: address) { isSuccess, balance, error in
                if !error.isEmpty {
                    FBWalletLog.debug("tronWeb getRTXBalance error: \(error)")
                    completion?(.failure(FBWalletError.transationError(error)))
                } else {
                    FBWalletLog.debug("tronWeb RTX Balance: \(balance)")
                    completion?(.success(balance))
                }
            }
        }
    }
    
    /// 查询 Tron 合约余额
    func getTRC20TokenBalance(coin: FBWalletCoinEntity, completion: ((TransationResult) -> Void)?) {
        
        guard let address = coin.address, let contractAddress = coin.contract_address else {
            completion?(.failure(FBWalletError.transationError("address error")))
            return
        }
        setupTronWeb(coin.chain_id, nodeURL: coin.url) {[weak self]  isSuccess, error in
            if !isSuccess {
                FBWalletLog.debug("tronWeb setup error: \(error)")
                return
            }
            self?.tronWeb.getTRC20TokenBalance(address: address, trc20ContractAddress: contractAddress, decimalPoints: 18) { isSuccess, balance, error in
                
                if !error.isEmpty {
                    FBWalletLog.debug("tronWeb getTRC20TokenBalance error: \(error)")
                    completion?(.failure(FBWalletError.transationError(error)))
                } else {
                    FBWalletLog.debug("tronWeb TRC20Token Balance: \(balance)")
                    completion?(.success(balance))
                }
            }
        }
    }
    
    func estimateTRXTransferFee(_ infos: TransferInfos, completion: ((String, String) -> Void)?) {
        guard let toAddress = infos.toAddress, let transferValue = infos.transferValue else {
            completion?("0", "0")
            return
        }
        
        let RTX: Double = 1000000
        let amountValue = Double(transferValue) ?? 0
        let amount = "\(amountValue * RTX)"
        
        setupTronWeb(infos.selectCoin?.chain_id, nodeURL: infos.selectCoin?.url) {[weak self]  isSuccess, error in
            if !isSuccess {
                FBWalletLog.debug("tronWeb setup error: \(error)")
                completion?("0", "0")
                return
            }
            self?.tronWeb.estimateTRXTransferFee(toAddress: toAddress, amount: amount, onCompleted: { status, resources , feeDic, error  in
                
                let requiredBandwidth = feeDic["requiredBandwidth"] as? Int ?? 0
                let freeBandwidthRemaining = feeDic["freeBandwidthRemaining"] as? Int ?? 0
                var trxFee = "0.00"
                /// 剩余宽带不够才需要扣除TRX
                if freeBandwidthRemaining < requiredBandwidth {
                    trxFee = String(format: "%.4f", Double(requiredBandwidth + 1) / 1000.0)
                }
                completion?("\(requiredBandwidth)", trxFee)
            })
        }
    }
    
    func estimateEnergy(_ infos: TransferInfos, completion: ((String, String) -> Void)?) {
        guard let url = infos.selectCoin?.url,
                let toAddress = infos.toAddress,
              let contractAddress = infos.selectCoin?.contract_address,
                let transferValue = infos.transferValue else {
            
            FBWalletLog.debug("estimateEnergy prams error")
            completion?("0", "0")
            return
        }
        
        setupTronWeb(infos.selectCoin?.chain_id, nodeURL: infos.selectCoin?.url) {[weak self]  isSuccess, error in
            if !isSuccess {
                FBWalletLog.debug("tronWeb setup error: \(error)")
                completion?("0", "0")
                return
            }
            let transferAmount = Utilities.parseToBigUInt(transferValue, units: .custom(18)) ?? BigUInt(0)
            self?.tronWeb.estimateEnergy(url: url, toAddress: toAddress, trc20ContractAddress: contractAddress, amount: "\(transferAmount)") { status, feeDic, error in
                
                let bandwidthFee = feeDic["energyFee"] as? Int ?? 0
                let energy_used = feeDic["energy_used"] as? Int ?? 0
                let feeLimit = feeDic["feeLimit"] as? String ?? "0.00"
                let totalFee = (Double(bandwidthFee) / 1000) + (Double(feeLimit) ?? 0)
                
                completion?("0", String(format: "%.5f", totalFee))
            }
        }
    }
}

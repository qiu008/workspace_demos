//
//  FBWalletAccount.swift
//  Module_Web3Wallet
//
//

import BigInt
import Foundation
import HandyJSON
import UIKit

class FBWalletTags: Codable {
    var tagId: String
    var name: String?
    
    init(tagId: String, name: String? = nil) {
        self.tagId = tagId
        self.name = name
    }
}

class FBWalletAccount: Codable {
    var accountId: String
    var name: String?
    var keystore: Data?
    var privateKey: String?
    var address: String
    var derivationPath: String
    /// 主链
    var chain: FBWalletChain?
    var chainId: String
    var balance: Double = 0
    var tags: [FBWalletTags] = []
    var extra: String?
//    var createTime: TimeInterval?
    var isTestnet: Bool = false
    var isSelected: Bool = false
    
    var isSync: Bool = false
    
    init(accountId: String, keystore: Data, privateKey: String, address: String, derivationPath: String, chainId: String, chain: FBWalletChain? = nil, isTestnet: Bool) {
        self.accountId = accountId
        self.keystore = keystore
        self.privateKey = privateKey
        self.address = address
        self.derivationPath = derivationPath
        self.chainId = chainId
        if chain == nil {
            self.chain = FBWalletChain.with(chainId: chainId, isTestnet: isTestnet)
        } else {
            self.chain = chain
        }
        self.isTestnet = isTestnet
    }
    
    enum CodingKeys: String, CodingKey {
        case accountId
        case name
        case keystore
        case privateKey
        case address
        case derivationPath
        case chainId
        case chain
        case isTestnet
        case balance
        case tags
        case extra
//        case createTime
        case isSelected
        case isSync
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.accountId = (try? container.decodeIfPresent(String.self, forKey: .accountId)) ?? UUID().uuidString
        self.name = try? container.decodeIfPresent(String.self, forKey: .name)
        self.keystore = try? container.decodeIfPresent(Data.self, forKey: .keystore)
        self.privateKey = try? container.decodeIfPresent(String.self, forKey: .privateKey)
        self.address = (try? container.decodeIfPresent(String.self, forKey: .address)) ?? ""
        self.derivationPath = (try? container.decodeIfPresent(String.self, forKey: .derivationPath)) ?? ""
        self.chainId = try container.decodeIfPresent(String.self, forKey: .chainId) ?? ""
        self.chain = try? container.decodeIfPresent(FBWalletChain.self, forKey: .chain)
        self.balance = (try? container.decodeIfPresent(Double.self, forKey: .balance)) ?? 0
        self.tags = (try? container.decodeIfPresent([FBWalletTags].self, forKey: .tags)) ?? []
        self.extra = try? container.decodeIfPresent(String.self, forKey: .extra)
//        self.createTime = try? container.decodeIfPresent(TimeInterval.self, forKey: .createTime)
        self.isSelected = (try? container.decodeIfPresent(Bool.self, forKey: .isSelected)) ?? false
        self.isTestnet = (try? container.decodeIfPresent(Bool.self, forKey: .isTestnet)) ?? false
        self.isSync = (try? container.decodeIfPresent(Bool.self, forKey: .isSync)) ?? false
    }
}

class FBWallet: Codable {
    var walletId: String
    var name: String?
    var isBackup: Bool = false
    var source: FBWalletSourceType?
    var accounts: [FBWalletAccount] = []
    var password: String = ""
    var passwordHint: String?
    
    var mnemonics: String?
    var privateKey: String?
    var keystore: String?
    var keystorePassword: String?
    var createTime: TimeInterval?
    var isSelected = false
    var balance: Double = 0
    
    init() {
        self.walletId = "fb" + UUID().uuidString.replace("-", with: "")
    }
    
    enum CodingKeys: String, CodingKey {
        case walletId
        case name
        case isBackup
        case source
        case accounts
        case password
        case passwordHint
        case mnemonics
        case privateKey
        case keystore
        case keystorePassword
        case createTime
        case balance
        case isSelected
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.walletId = (try? container.decodeIfPresent(String.self, forKey: .walletId)) ?? UUID().uuidString
        self.name = try? container.decodeIfPresent(String.self, forKey: .name)
        self.isBackup = (try? container.decodeIfPresent(Bool.self, forKey: .isBackup)) ?? false
        self.source = try? container.decodeIfPresent(FBWalletSourceType.self, forKey: .source)
        self.accounts = (try? container.decodeIfPresent([FBWalletAccount].self, forKey: .accounts)) ?? []
        self.password = (try? container.decodeIfPresent(String.self, forKey: .password)) ?? ""
        self.passwordHint = try? container.decodeIfPresent(String.self, forKey: .passwordHint)
        self.mnemonics = try? container.decodeIfPresent(String.self, forKey: .mnemonics)
        self.privateKey = try? container.decodeIfPresent(String.self, forKey: .privateKey)
        self.keystore = try? container.decodeIfPresent(String.self, forKey: .keystore)
        self.keystorePassword = try? container.decodeIfPresent(String.self, forKey: .keystorePassword)
        self.createTime = try? container.decodeIfPresent(TimeInterval.self, forKey: .createTime)
        self.isSelected = (try? container.decodeIfPresent(Bool.self, forKey: .isSelected)) ?? false
        self.balance = (try? container.decodeIfPresent(Double.self, forKey: .balance)) ?? 0
    }
}

class FBWalletUser: Codable {
    var userId: Int
    var wallets: [FBWallet] = []
    
    init(userId: Int, wallets: [FBWallet] = []) {
        self.userId = userId
        self.wallets = wallets
    }
}

// MARK: - 钱包上报参数
struct FBWalletParamEntity: HandyJSON {
    var wallet_id: String?
    var wallet_name: String?
    var create_time: Int?
    /// 1助记词创建 |2助记词导入|3私钥导入|4keystore导入
    var create_type: Int?
    var uid: Int?
    var addresses: [Address]?
    struct Address: HandyJSON {
        var address: String?
        var chain_id: String?
        /// 如果是btc地址traproot，其他地址可为空
        var address_type: String?
        var address_name: String?
        var mark: String?
    }
}

// MARK: - 钱包支持的链

enum FBWalletChain: String, Codable {
    /// 以太坊
    case Ethereum = "1"
    case Polygon = "137"
    case Avalanche = "43114"
    case BSC = "56"
    case Arbitrum = "42161"
    /// 波场
    case Tron = "728126428"
    /// 比特币
    case Bitcoin = "1360095883558913"
    
    static func with(chainId: String, isTestnet: Bool) -> FBWalletChain? {
        if isTestnet {
            return FBWalletTestNetChain(rawValue: chainId)?.mainnet
        } else {
            return FBWalletChain(rawValue: chainId)
        }
    }
    
    var prefixPath: String {
        switch self {
        case .Ethereum, .Polygon, .Avalanche, .BSC, .Arbitrum:
            return "m/44'/60'/0'/0"
        case .Tron:
            return "m/44'/195'/0'/0"
        case .Bitcoin:
            return "m/44'/0'/0'/0/0"
        }
    }
    
    /// 测试用，应使用接口返回的
    var icon: UIImage? {
        switch self {
        case .Ethereum:
            return R.image.coin_ETH()
        case .Polygon:
            return R.image.coin_POL()
        case .Avalanche:
            return R.image.coin_AVAX()
        case .BSC:
            return R.image.coin_BNB()
        case .Arbitrum:
            return R.image.coin_ARB()
        case .Tron:
            return R.image.coin_TRX()
        case .Bitcoin:
            return R.image.coin_BTC()
        }
    }
    
    /// 测试用，应使用接口返回的
    var title: String {
        switch self {
        case .Ethereum:
            return "Ethereum"
        case .Polygon:
            return "Polygon"
        case .Avalanche:
            return "Avalanche"
        case .Arbitrum:
            return "Arbitrum"
        case .BSC:
            return "BSC"
        case .Tron:
            return "Tron"
        case .Bitcoin:
            return "Bitcoin"
        }
    }
    
    /// UI显示时保留的小数位（TODO: 不应该写在这里，应该写在币里）
    var uiDecimalPlaces: Int {
        switch self {
        case .Bitcoin:
            return 8
        default:
            return 5
        }
    }
}

/// 测试链
enum FBWalletTestNetChain: String {
    case EthSepolia = "11155111"
    case PolygonTestnetAmoy = "80002"
    case AvalancheFujiTestnet = "43113"
    case BSCTestnet = "97"
    case TRONShastaTestnet = "2494104990"
    case TRONNileTestnet = "49812075"
    case ArbitrumSeoplia  = "421614"
    /// 比特币
    case Bitcoin = "8848"
    
    var mainnet: FBWalletChain {
        switch self {
        case .EthSepolia:
            return .Ethereum
        case .PolygonTestnetAmoy:
            return .Polygon
        case .AvalancheFujiTestnet:
            return .Avalanche
        case .BSCTestnet:
            return .BSC
        case .ArbitrumSeoplia:
            return .Arbitrum
        case .TRONShastaTestnet, .TRONNileTestnet:
            return .Tron
        case .Bitcoin:
            return .Bitcoin
        }
    }
    
    var url: String {
        switch self {
        case .EthSepolia:
            return "https://sepolia.drpc.org"
        case .PolygonTestnetAmoy:
            return "https://polygon-amoy.drpc.org"
        case .BSCTestnet:
            return "https://data-seed-prebsc-1-s1.binance.org:8545/"
        case .AvalancheFujiTestnet:
            return "https://avalanche-fuji-c-chain-rpc.publicnode.com"
        case .ArbitrumSeoplia:
            return "https://arbitrum-sepolia-rpc.publicnode.com"
        case .TRONShastaTestnet:
            return "https://api.shasta.trongrid.io"
        case .TRONNileTestnet:
            return "https://nile.trongrid.io"
        case .Bitcoin:
            return "https://bitcoin-testnet.drpc.org"
        }
    }
}

/// 各个链的测试数据
extension FBWalletChain {
    
    var testnet: FBWalletTestNetChain {
        switch self {
        case .Ethereum:
            return .EthSepolia
        case .Polygon:
            return .PolygonTestnetAmoy
        case .Avalanche:
            return .AvalancheFujiTestnet
        case .BSC:
            return .BSCTestnet
        case .Arbitrum:
            return .ArbitrumSeoplia
        case .Tron:
            return .TRONNileTestnet
        case .Bitcoin:
            return .Bitcoin
        }
    }
    /// 自定义RPC主网地址
    var url: String {
        switch self {
        case .Ethereum:
            return "https://cold-fragrant-paper.quiknode.pro/1c8ae0dd23940c6e73fff1077105d1758d280318"
        case .Polygon:
            return "https://prettiest-skilled-glitter.matic.quiknode.pro/991eb14ed8021696e241ffc306a7852af7b369a0"
            // return "https://polygon-rpc.com/"
        case .BSC:
            return "https://dimensional-summer-meadow.bsc.quiknode.pro/c29a713739eb70df0f9edb0b0ed723ea9bd51540"
            // return "https://bsc-dataseed.binance.org/"
        case .Avalanche:
            return "https://old-stylish-rain.avalanche-mainnet.quiknode.pro/9b525af29da0be5d899fa50ec7bcc44f60619c10"
        case .Arbitrum:
            return "https://arb1.arbitrum.io/rpc"
        case .Tron:
            return "https://serene-dark-yard.tron-mainnet.quiknode.pro/2505ddfeb09543012fc2b0ef243e8a24ada98275"
            // return "https://api.trongrid.io"
        case .Bitcoin:
            return "https://dimensional-summer-meadow.bsc.quiknode.pro/c29a713739eb70df0f9edb0b0ed723ea9bd51540"
        }
    }
}

enum FBWalletSourceType: Int, Codable {
    case mnemonicsCreate = 1
    case mnemonicsImport
    case privateKeyImport
    case keystoreImport
    
    var title: String {
        switch self {
        case .mnemonicsCreate:
            return "通过助记词创建"
        case .mnemonicsImport:
            return "通过助记词导入"
        case .privateKeyImport:
            return "通过私钥导入"
        case .keystoreImport:
            return "通过keystore导入"
        }
    }
}

struct FBWalletChainEntity: HandyJSON, Equatable {
    var chain_id: String?
    var name: String?
    var currency: String?
    var icon: String?
    var browser: String?
    /// EVM，TVM，SVM
    var vmware: String?
    var sort: Int?
    var hot: Int?
    var layer: Int?
    var decimals: Int?
    var status: Int?
    var chain_scan: String?
    var is_main_net: Int = 1
    var is_default: Int = 0
    var alc_net_code: String?
    var isMainNet: Bool {
        return is_main_net == 1
    }
}


struct FBWalletChainGroupEntity: HandyJSON, Equatable {
    var group: String?
    var chain_list: [FBWalletChainEntity] = []
}

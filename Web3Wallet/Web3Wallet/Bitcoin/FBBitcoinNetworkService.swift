//
//  FBBitcoinNetworkService.swift
//  Module_Web3Wallet
//

import Alamofire
import Foundation
import HandyJSON
import WalletCore

class FBBitcoinNetworkService {
    static func getRecommendedFee() async throws -> Int64 {
        let jsonStr = try await get(request: BitcoinRequest(url: FBbtnMethod.recommendedFee.url))
        guard let entity = FBbtcRecommendedFee.deserialize(from: jsonStr) else {
            throw BitCoinNetworkError.deserializeFail
        }
        let fee = entity.hourFee ?? entity.halfHourFee
        guard let fee = fee else {
            throw BitCoinNetworkError.other
        }
        return fee
    }

    static func getUTXO(_ address: String) async throws -> [FBbtcUTXO] {
        let jsonStr = try await get(request: BitcoinRequest(url: FBbtnMethod.utxo(address).url))
        guard let items = [FBbtcUTXO].deserialize(from: jsonStr) as? [FBbtcUTXO] else {
            throw BitCoinNetworkError.deserializeFail
        }
        return items
    }

    static func getBanlance(_ address: String) async throws -> CGFloat {
        let jsonStr = try await get(request: BitcoinRequest(url: FBbtnMethod.utxo(address).url))
        guard let items = [FBbtcUTXO].deserialize(from: jsonStr) as? [FBbtcUTXO] else {
            throw BitCoinNetworkError.deserializeFail
        }
        let total = items.reduce(0) { partialResult, utxo in
             partialResult + (utxo.value ?? 0)
        }
        return FBBitcoinTransactionHelper.convertSatoshiToBTC(satoshiAmount: Int64(total))
    }
    
    static func addressValidation(_ address: String) async throws -> String {
        let jsonStr = try await get(request: BitcoinRequest(url: FBbtnMethod.addressValidation(address).url))
        print(jsonStr)
        return jsonStr
    }

    static func broadcastRawTransaction(hex: String) async throws -> String {
        let result = try await post(request: BitcoinRequest(url: FBbtnMethod.postTX.url, parameters: ["hex": hex]), encoding: FBHexRawEncoding())
        if result.contains("error:") {
            throw BitCoinNetworkError.other
        }
        return result
    }
}

extension FBBitcoinNetworkService {
    static func get(request: BitcoinRequest, encoding: ParameterEncoding = JSONEncoding.default) async throws -> String {
        try await fetch(request: request, method: .get, encoding: encoding)
    }

    static func post(request: BitcoinRequest, encoding: ParameterEncoding = JSONEncoding.default) async throws -> String {
        try await fetch(request: request, method: .post, encoding: encoding)
    }

    private static func fetch(request: BitcoinRequest, method: HTTPMethod, encoding: ParameterEncoding = JSONEncoding.default) async throws -> String {
        guard let url = request.asURL() else {
            throw BitCoinNetworkError.invalidUrl
        }
        let dataTask = AF.request(url,
                                  method: method,
                                  parameters: request.parameters,
                                  encoding: encoding,
                                  headers: HTTPHeaders(request.headers)).serializingString()
        do {
            let result = try await dataTask.value
            FBWalletLog.debug("网络请求成功 \(url.absoluteString), result: \(result)")
            return result
        } catch {
            FBWalletLog.error("网络请求失败 \(url.absoluteString), error: \(error.localizedDescription)")
            throw BitCoinNetworkError.AlamofireError(error)
        }
    }
}

// MARK: - Common

struct BitcoinRequest {
    var url: String = ""
    var headers: [String: String] = ["Content-Type": "application/json"]
    var parameters: [String: Any]?
    var query: [String: Any]?

    func asURL() -> URL? {
        guard let query = query else {
            return URL(string: url)
        }

        let components = NSURLComponents(string: url)
        var queryItems = [URLQueryItem]()
        for (key, value) in query {
            let valueString = "\(value)"
            queryItems.append(URLQueryItem(name: key, value: valueString))
        }
        components?.queryItems = queryItems

        return components?.url ?? URL(string: url)
    }
}

enum BitCoinNetworkError: Error {
    case invalidUrl
    case deserializeFail
    case AlamofireError(Error)
    case other
}

enum FBbtnMethod {
    case recommendedFee
    case utxo(String)
    case postTX
    case listunspent
    case addressValidation(String)

    var url: String {
        switch self {
        case .recommendedFee:
            return "https://mempool.space/testnet4/api/v1/fees/recommended"
        case .utxo(let address):
            return "https://mempool.space/testnet4/api/address/\(address)/utxo"
        case .postTX:
            return "https://mempool.space/testnet4/api/tx"
        case .listunspent:
            return "https://lb.drpc.org/ogrpc?network=bitcoin-testnet&dkey=AmcOntIBJEzJh4o1GdJbD7OV2odntpgR75yWuivZK8k9"
        case .addressValidation(let address):
            return "https://mempool.space/testnet4/api/v1/validate-address/\(address)"
        }
    }
}

// MARK: - Entity

struct FBbtcRecommendedFee: HandyJSON {
    var fastestFee: Int64? // 目前将导致最快的事务确认（通常为0到1块延迟）
    var halfHourFee: Int64? // 将在半小时内确认交易（概率为90％）
    var hourFee: Int64? // 将在一小时内确认交易（概率为90％）
    var economyFee: Int64?
    var minimumFee: Int64?
}

struct FBbtcUTXO: HandyJSON {
    var txid: String?
    var vout: Int?
    var status: Status?
    var value: Int?

    struct Status: HandyJSON {
        var confirmed: Bool?
        var blockHeight: Int?
        var blockHash: String?
        var blockTime: Int?
    }
}

// MARK: - Encoding

struct FBHexRawEncoding: ParameterEncoding {
    let options: JSONSerialization.WritingOptions

    init(options: JSONSerialization.WritingOptions = []) {
        self.options = options
    }

    func encode(_ urlRequest: Alamofire.URLRequestConvertible, with parameters: Alamofire.Parameters?) throws -> URLRequest {
        var urlRequest = try urlRequest.asURLRequest()
        guard let hex = parameters?["hex"] as? String else { return urlRequest }
        urlRequest.setValue("text/plain", forHTTPHeaderField: "Content-Type")
        urlRequest.httpBody = hex.data(using: .utf8)
        return urlRequest
    }
}

//
//  FBWalletLogger.swift
//  Module_Web3Wallet
//

import Foundation
import OSLog

struct FBWalletLog {
    private static let logger = OSLog(subsystem: "com.logger.fbwallet", category: "web3wallet")

    static func debug(_ msg: String) {
        #if DEBUG
        os_log(.debug, log: logger, "%{private}@", msg)
        #endif
    }

    static func warning(_ msg: String) {
        os_log(.info, log: logger, "⚠️ %{private}@", msg)
    }

    static func error(_ msg: String) {
        os_log(.info, log: logger, "🛑 %{private}@", msg)
    }
}

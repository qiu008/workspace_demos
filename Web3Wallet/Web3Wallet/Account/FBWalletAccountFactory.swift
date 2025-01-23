//
//  FBWalletAccountFactory.swift
//  Module_Web3Wallet
//

import Foundation
import Web3Core

protocol FBWalletAccountFactory {
    func accountWith(mnemonics: String, password: String) throws -> FBWalletAccount
    func accountWith(keystore: Data, password: String) throws -> FBWalletAccount
    func accountWith(privateKey: String, password: String) throws -> FBWalletAccount
}

enum FBWalletError: Error {
    case generateKeystoreFail
    case generateAddressFail
    case privateKeyError
    case invalidPasswordError
    case encryptionError(String)
    case transationError(String)
}


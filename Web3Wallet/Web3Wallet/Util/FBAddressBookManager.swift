//
//  FBAddressBookManager.swift
//  Module_Web3Wallet
//
//  Created by STL_QYH on 2024/12/26.
//

import Foundation
import UIKit

class FBAddressBookManager {
    ///
    private var userId: Int = 0
    
    private(set) lazy var addressBook: [FBWalletAccountAddress] = []
    
    private var userDirectory: URL? {
        let documentURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
        return documentURL?.appendingPathComponent("addressBook/\(userId)")
    }
    
    private var fileURL: URL? {
        return userDirectory?.appendingPathComponent("addressBook.json")
    }
    
    init(_ userId: Int) {
        self.userId = userId
        self.loadAddressBook()
    }
}

private extension FBAddressBookManager {
    ///
    func loadAddressBook() {
        guard let fileURL = self.fileURL else {
            debugPrint("qyh_暂无地址")
            return
        }
        do {
            let jsonData = try Data(contentsOf: fileURL)
            let addressBook = try JSONDecoder().decode(Array<FBWalletAccountAddress>.self, from: jsonData)
            self.addressBook += addressBook
        } catch {
            debugPrint("qyh_地址数据读取失败")
        }
    }
    
    func saveAddressBook() {
        NotificationCenter.default.post(name: Self.addressBookChange, object: nil)
        guard let userDirectory = self.userDirectory, let fileURL = self.fileURL else {
            debugPrint("qyh_地址保存目录有误")
            return
        }
        do {
            if !FileManager.default.fileExists(atPath: userDirectory.path) {
                try FileManager.default.createDirectory(at: userDirectory, withIntermediateDirectories: true)
            }
            let jsonData = try JSONEncoder().encode(self.addressBook)
            try jsonData.write(to: fileURL)
            debugPrint("qyh_地址数据已保存到：", fileURL.path)
        } catch {
            debugPrint("qyh_地址数据保存失败：\(error)")
        }
    }
}

extension FBAddressBookManager {
    ///
    func add(_ address: FBWalletAccountAddress) -> Bool {
        if addressBook.contains(where: { $0.chain_id == address.chain_id }) {
            return false
        }
        addressBook.append(address)
        self.saveAddressBook()
        return true
    }
    
    func delete(_ address: FBWalletAccountAddress) {
        addressBook.removeAll { $0.chain_id == address.chain_id }
        self.saveAddressBook()
    }
    ///
    func update(_ temp: FBWalletAccountAddress, _ original: FBWalletAccountAddress) -> Bool {
        if addressBook.contains(where: { $0 == temp }) {
            return false
        }
        if let oriIdx = addressBook.firstIndex(where: { $0.chain_id == original.chain_id }) {
            addressBook.remove(at: oriIdx)
            addressBook.insert(temp, at: oriIdx)
        }
        self.saveAddressBook()
        return true
    }
}

extension FBAddressBookManager {
    ///
    static let addressBookChange: NSNotification.Name = .init(rawValue: "addressBookChange")
}

struct FBWalletAccountAddress: Codable, Equatable {
    ///
    static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.addressName == rhs.addressName &&
        lhs.chain_id == rhs.chain_id &&
        lhs.address == rhs.address &&
        lhs.desc == rhs.desc
    }
    // 用户编辑
    var address: String?
    var addressName: String?
    var desc: String?
    // 来自接口
    var chain_id: String?
    /// coinName
    var currency: String?
    ///
    var icon: String?
    /// coinFullName
    var name: String?
    ///
    var is_main_net: Int?
    ///
    var isMainNet: Bool {
        return is_main_net == 1
    }
}

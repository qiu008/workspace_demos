//
//  AppDelegate.swift
//  WKWebView
//
//  Created by STL_QYH on 2023/9/20.
//

import UIKit

actor BankAccountActor {
    enum BankError: Error {
        case insufficientFunds
    }
    
    let accountHolder: String = ""
    let bank: String = ""
    var balance: Double
    
    var details: String {
        "Bank: \(bank) - Account holder: \(accountHolder)"
    }
    
    init(initialDeposit: Double) {
        self.balance = initialDeposit
    }
    
//    func transfer(amount: Double, to toAccount: BankAccountActor) async throws {
//        guard balance >= amount else {
//            throw BankError.insufficientFunds
//        }
//        balance -= amount
//        await toAccount.deposit(amount: amount)
//    }
//    func transfer0(amount: Double, to toAccount: BankAccountActor) throws {
//        guard balance >= amount else {
//            throw BankError.insufficientFunds
//        }
//        balance -= amount
//        toAccount.deposit(amount: amount)
//    }
//    func transfer1(amount: Double, to toAccount: isolated BankAccountActor) async throws {
//        guard balance >= amount else {
//            throw BankError.insufficientFunds
//        }
//        balance -= amount
//        toAccount.deposit(amount: amount)
//        toAccount.balance += amount
//    }
//    func transfer2(amount: Double, from fromAccount: isolated BankAccountActor, to toAccount: isolated BankAccountActor) throws {
//        // Cannot have more than one 'isolated' parameter; this is an error in Swift 6
//        guard fromAccount.balance >= amount else {
//            throw BankError.insufficientFunds
//        }
//        fromAccount.balance -= amount
//        toAccount.deposit(amount: amount)+
//    }
    
    func deposit(amount: Double) {
        balance += amount
    }
}
extension BankAccountActor: CustomStringConvertible {
    nonisolated var description: String {
        "Bank: \(bank) - Account holder: \(accountHolder)"
    }
}

actor TestActor {

    var str: String = ""
    
    func testFunc() {
        print(str)
    }
}

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    lazy var lazyName = "1"
    var name = "1"

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        // data race case 1
        DispatchQueue.global().async {
            print(self.lazyName)
        }
//        print(lazyName)
        // data race case 0
        DispatchQueue.global().async {
            self.name += "0"
        }
//        print(name)
        
//        DispatchQueue.global().async {
//            let ta = TestActor()
//            await ta.testFunc()
//        }
//        let ta = TestActor()
//        let task = Task {
//            await ta.testFunc()
//            testFunc()
//        }
        Task {
            await asyncFunc() // t2
            testFunc() // t1
        }
//        DispatchQueue.global().async {
//            Task {
//                do {
//                    try await self.fetchImage()
//                } catch {
//                    print("Image loading failed: \(error)")
//                }
//            }
//        }
        return true
    }

    func testFunc() {
//        print("tf")
        
        Task {
            do {
                let _ = try await fetchImage() // t4
            } catch {
                print("Image loading failed: \(error)")
            }
        }
    }
    
    func asyncFunc() async {
        print("tf") // t1
    }
    
    func fetchImage() async throws -> UIImage? {
        let imageTask = Task { () -> UIImage? in
            if Task.isCancelled {
                print("Task.isCancelled") // t1
                return nil
            }
            let imageURL = URL(string: "https://source.unsplash.com/random")!
            try Task.checkCancellation()
            print("Starting network request...")
            let (imageData, _) = try await URLSession.shared.data(from: imageURL)
            
            return UIImage(data: imageData)
        }
        // Cancel the image request right away:
        imageTask.cancel() // t1
        return try await imageTask.value
    }
    
    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}


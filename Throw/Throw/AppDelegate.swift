//
//  AppDelegate.swift
//  Throw
//
//  Created by STL_QYH on 2023/12/19.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        do {
//            let user = try User(name: "")
            let user = try User(name: "Q")
//            let user = try User(name: "Antoine van der Lee")
            print(user.name)
        } catch let error as User.ValidationError {
            
        } catch {
            print(error)
        }
        return true
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

struct User {

    enum ValidationError: Error {
        case emptyName
        case nameToShort(nameLength: Int)
    }

    let name: String

    init(name: String) throws {
        guard !name.isEmpty else {
            throw ValidationError.emptyName
        }
        guard name.count > 2 else {
            throw ValidationError.nameToShort(nameLength: name.count)
        }
        self.name = name
    }
}



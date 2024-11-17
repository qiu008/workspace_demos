//
//  AppDelegate.swift
//  S
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        print(UIFont.familyNames)
        UIFont.familyNames.forEach { familyName in
            if familyName.contains("Arial") {
                print("familyName", familyName)
                print("-----------------------------")
                let fontNames = UIFont.fontNames(forFamilyName: familyName)
                print(fontNames)
            }
        }
        
        /// label.font = [UIFont fontWithName:@”你刚才导入的ttf文件名” size:20.0]；
        let font = UIFont(name: "Arial Bold", size: 16.0)
        print(font ?? "Arial Bold.ttf")
        
        let fontBlack = UIFont(name: "Arial Black", size: 16.0)
        print(fontBlack ?? "Arial Black.ttf")
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


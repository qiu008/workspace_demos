//
//  AppDelegate.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
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

/*
 @_private(sourceFile: "PreviewSwiftUIKit.swift") import XcodePreviewDemo
 import SwiftUI
 import SwiftUI

 extension PreviewSwiftUIKit_Previews {
     @_dynamicReplacement(for: previews) private static var __preview__previews: some View {
         #sourceLocation(file: "/Users/xxx/Desktop/XcodePreviewDemo/XcodePreviewDemo/PreviewSwiftUIKit.swift", line: 23)
         PreviewSwiftUIKit()
   
   
 #sourceLocation()
     }
 }

 extension PreviewSwiftUIKit {
     @_dynamicReplacement(for: updateUIViewController(_:context:)) private func __preview__updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {
         #sourceLocation(file: "/Users/xxx/Desktop/XcodePreviewDemo/XcodePreviewDemo/PreviewSwiftUIKit.swift", line: 12)

 #sourceLocation()
         // leave this empty
     }
 }

 import struct XcodePreviewDemo.PreviewSwiftUIKit
 import struct XcodePreviewDemo.PreviewSwiftUIKit_Previews
 #Preview("UIKitPreview") {
     return PreviewSwiftUIKit();
 }
 */

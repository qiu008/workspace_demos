//
//  AppDelegate.swift
//  Tests
//
//  Created by STL_QYH on 2020/11/27.
//

import UIKit
import Combine

class Foo {
  var age: Int
  var name: String

  init(age: Int, name: String) {
    self.age = age
    self.name = name
  }
}

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func authenticate(name: String?, password: String?) {
        switch (name, password) {
        case let (name?, password?):
            print("User: \(name) Password: \(password) 🤫")
        case let (name?, nil):
            print("Password is missing 🧐. User: \(name)")
        case let (nil, password?):
            print("Username is missing 🧐. Password: \(password)")
        case (nil, nil):
            print("Both username and password are missing 🧐🧐")
        }
        
    }
    
    func loadData(url: URL?) -> Data? {
      try? url.map { try Data.init(contentsOf: $0) }
    }
    
    func transformURL(_ url: String?) -> URL? {
        url.flatMap { URL(string: $0) }
    }
    
    func bar() {
      var foo = Foo(age: 10, name: "Jim")
      let closure = { [foo] in    // 捕获引用类型 (foo)
        print("\(foo.name) is \(foo.age) years old!")
      }

      foo.age = 11
      foo.name = "Tom"

      closure()    // Tom is 11 years old!
    }
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        bar()
        /*
        //     👇
        let someValue: Int? = 1
        if let someValue {
            let value: Int = someValue
            print(value)
        }
        var someValues = [1, 3, 5, 10, 7, 9]
        //     👇
        for someValue in someValues {
          // do something
            print(someValue)
        }
        let views = [UIView(), UIView()]
        for view in views where view is UILabel {
          print("UILable")
        }
        // Int 实现了 CustomReflectable 协议, 支持通过反射获取类型的信息
        struct MirrorObject {
            let intValue = 256
            let uint8Value: UInt8 = 15
            let boolValue = false
            let stringValue = "test"
        }
        Mirror(reflecting: MirrorObject()).children.forEach { (child) in
            print(child.label!, child.value)
        }
        struct Point: Hashable { // Swift 的结构体枚举,只要它的所有属性都是 hashable, 编译器会自动实现 Hashable
            var x: Int
            var y: Int
        //    func hash(into hasher: inout Hasher) {
        //        hasher.combine(x) // 只要是相同的二进制流, hash 的结果就是相同的
        //    }
        }
        let dic: [AnyHashable: AnyHashable] = [Point(x: 5, y: 5): "test", "test": Point(x: 5, y: 5)]
        print(dic[Point(x: 5, y: 5)]!)
        print(Point(x: 5, y: 5).hashValue)
        print(Point(x: 5, y: 5).hashValue)
        print(Point(x: 5, y: 5).hashValue) // 每次运行都会加不同的盐, 结构都不同, 所以不能持久化, 只能在内存中使用
        */
        
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

enum SocialDownloadEnum: String {
    case LinkedIn    = "288429040"
    case Twitter     = "333903271"
    case Facebook    = "284882215"
    case YouTube     = "544007664"
    case Instagram   = "389801252"
    case Pinterest   = "429047995"
    case Skype       = "304878510"
    case Telegram    = "686449807"
    case WhatsApp    = "310633997"
    case Line        = "443904275"
    case Snapchat    = "447188370"
    case KakaoTalk   = "362057947"
    case Tumblr      = "305343404"
    case Wechat      = "414478124"
    case Weibo       = "350962117"
    case QQ          = "444934666"
}

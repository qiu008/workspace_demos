//
//  ViewController.swift
//  WKWebView
//
//  Created by STL_QYH on 2023/9/20.
//

import UIKit
import WebKit
import OSLog

import CoreLocationUI
import LocalAuthentication

struct TestStruct {
    
}

//struct Person: ~Copyable {
//    var name = "Zhangsan"
//    var age = 10
//    let sex = "male"
//}

class ViewController: UIViewController {

    lazy var webView: WKWebView = {
//        let wv = WKWebView(frame: view.bounds, configuration: WKWebViewConfiguration())
        let wv = WKWebView(frame: view.bounds)
        wv.configuration.setURLSchemeHandler(self, forURLScheme: "cn.bing.com")
//        wv.navigationDelegate = self
//        wv.uiDelegate = self
        return wv
    }()
    
    func test() {
//        var x: [TestStruct] = [TestStruct(), TestStruct(), TestStruct()]
//        var first = x[0]
//        var tsPointer: Int = 0
//        withUnsafePointer(to: &first) { ptr in
//            tsPointer = unsafeBitCast(ptr.pointee, to: Int.self)
//            print("x.first", tsPointer)
//        }
//        withUnsafePointer(to: first) { ptr in
//            tsPointer = unsafeBitCast(ptr.pointee, to: Int.self)
//            print("x.first", tsPointer)
//        }
//        doStuffUniquely(with: consume x)
//        x = []
//        x.append(TestStruct())
//        let xx = 1
//        let yy = consume xx
//        print("xx", xx, "yy", yy)
        
//        let person = Person()
//        print(person.name, person.age, person.sex)
//        // 报错：Cannot consume noncopyable stored property 'person' that is global
//        var personCopy = person
//        personCopy.age = 0
//        print(personCopy.name, personCopy.age, personCopy.sex)

    }

    func doStuffUniquely(with value: [TestStruct]) {
        var memoryPointer: Int = 0
        withUnsafePointer(to: value) { ptr in
            memoryPointer = unsafeBitCast(ptr.pointee, to: Int.self)
            print("value", memoryPointer, ptr.pointee.description)
        }
        if let first = value.first {
//            var tsPointer: Int = 0
            withUnsafePointer(to: first) { ptr in
//                tsPointer = unsafeBitCast(ptr.pointee, to: Int.self)
//                print("value.first", tsPointer)
                print(ptr.pointee, ptr.debugDescription)
            }
        }
        var newValue = value
        withUnsafePointer(to: newValue) { ptr in
            memoryPointer = unsafeBitCast(ptr.pointee, to: Int.self)
            print("newValue", memoryPointer, ptr.pointee)
        }
        if let first = newValue.first {
//            var tsPointer: Int = 0
            withUnsafePointer(to: first) { ptr in
//                tsPointer = unsafeBitCast(ptr.pointee, to: Int.self)
//                print("newValue.first", tsPointer)
                print(ptr.pointee, ptr.debugDescription)
            }
        }
        newValue.append(TestStruct())
        withUnsafePointer(to: newValue) { ptr in
            memoryPointer = unsafeBitCast(ptr.pointee, to: Int.self)
            print("newValue", memoryPointer, ptr.pointee)
        }
//        print(newValue)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        test()
        webView.load(URLRequest(url: URL(string: "https://cn.bing.com")!))
        view.addSubview(webView)
//        os_log(.debug, "StaticString()", "")
//        Logger().log(level: .debug, "")
//        Logger().info("")
//        let _nil = UserDefaults(suiteName: "STL.WKWebView") // does not make sense
        
//        CLLocationButton
//        UISearchContainerViewController
//        UISearchController
        
        let isNil = UserDefaults(suiteName: nil)
        if let ud = UserDefaults(suiteName: "suiteName") {
            if let string = ud.string(forKey: "suiteName") {
                print(string)
                ud.addSuite(named: "suiteName1")
                if let ud1 = UserDefaults(suiteName: "suiteName1") {
                    print("")
                }
            } else {
                ud.set("suiteName", forKey: "suiteName")
            }
        }
#if targetEnvironment(macCatalyst)
        print("macCatalyst")
#elseif targetEnvironment(simulator)
        print("simulator")
#else
        print("!macCatalyst, !simulator")
#endif
        
//#if targetEnvironment(simulator)
//        print("simulator")
//#else
//        print("当前设备为真机，这里的代码仅在真机下运行")
//#endif

#if DEBUG
        print("DEBUG")
#else
        print("release")
#endif
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        var error: NSError?
        let la = LAContext()
        guard la.canEvaluatePolicy(LAPolicy.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
            if let eor = error as? LAError {
                switch eor.code {
                case .appCancel:
                    break
                case .authenticationFailed:
                    break
                case .invalidContext:
                    break
                case .notInteractive:
                    break
                case .passcodeNotSet:
                    break
                case .systemCancel:
                    break
                case .userCancel:
                    break
                case .userFallback:
                    break
                case .biometryLockout:
                    break
                case .biometryNotAvailable:
                    break
                case .biometryNotEnrolled:
                    break
                default:
                    break
                }
            }
            return
        }
        la.evaluatePolicy(LAPolicy.deviceOwnerAuthenticationWithBiometrics, localizedReason: "") { aBool, aError in
            print(aBool, aError ?? "")
            if aBool {
                print("验证通过")
            } else if let error = aError as? LAError {
                switch error.code {
                case .appCancel:
                    break
                case .authenticationFailed:
                    break
                case .invalidContext:
                    break
                case .notInteractive:
                    break
                case .passcodeNotSet:
                    break
                case .systemCancel:
                    break
                case .userCancel:
                    break
                case .userFallback:
                    break
                case .biometryLockout:
                    break
                case .biometryNotAvailable:
                    break
                case .biometryNotEnrolled:
                    break
                default:
                    break
                }
            }
        }
    }
    
    override func viewLayoutMarginsDidChange() {
        super.viewLayoutMarginsDidChange()
        
    }
    override func viewSafeAreaInsetsDidChange() {
        super.viewSafeAreaInsetsDidChange()
    }
    
    var aa: Array<AAA> = []
    var sss: Set<BBB> = []
    var dic: [String: AA] = [:]
    var ss: Set<BB> = []
}

protocol AA {
}
class BB: NSObject, AA {
    
}
protocol AAA {
}
struct BBB: Hashable {

    static func == (lhs: BBB, rhs: BBB) -> Bool {
        false
    }
    
    var hashValue: Int {
        0
    }
    
    func hash(into hasher: inout Hasher) {
        print(hasher)
    }
    
    var aaa: AAA?
}



extension WKWebView {

    public class func handlesURLScheme(_ urlScheme: String) -> Bool {
        return false
    }
}

extension ViewController: WKURLSchemeHandler {

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        
    }
    
    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        
    }
}

class Counter {
    var value: Int = 0
    // 加一
    func increment() {
        value += 1
    }
    // 减一
    func decrement() {
        if value > 0 {
            value -= 1
        }
    }
}

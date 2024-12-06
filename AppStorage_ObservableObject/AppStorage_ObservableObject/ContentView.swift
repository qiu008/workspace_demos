//
//  ContentView.swift
//  AppStorage_ObservableObject
//
//  Created by STL_QYH on 2024/12/6.
//
//  AppStorage 与 ObservableObject：优势与局限

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}

class Defaults: ObservableObject {
    @AppStorage("name") public var name = "fatbobman"
    @AppStorage("age") public var age = 12
}
// 在视图中使用
//@StateObject var defaults = Defaults()
//...
//Text(defaults.name)
//TextField("name", text: defaults.$name)
//然而，ObservableObject 的通知机制存在局限性：任何包装其中的值（使用 @Published 或 @AppStorage 标注）发生变化都会触发整个视图的重绘。
//Observation 框架的引入为解决 ObservableObject 通知不精准的问题带来了希望。遗憾的是，苹果尚未提供适用于 Observation 的 UserDefaults 包装方案。

//@Observable
//class Settings {
//    @ObservationIgnored
//    var name: String {
//        get {
//            access(keyPath: \.name)
//            return UserDefaults.standard.string(forKey: "name") ?? _nameDefault
//        }
//        set {
//            withMutation(keyPath: \.name) {
//                UserDefaults.standard.set(newValue, forKey: "name")
//            }
//        }
//    }
//
//    @ObservationIgnored
//    let _nameDefault: String = "Fatbobman 1"
//}
//struct SettingTestView: View {
//    @State var settings: Settings = .init()
//    var body: some View {
//        Text(settings.name)
//        Button("Change Name") {
//            settings.name = "Fatbobman \(Int.random(in: 0 ... 1000))"
//        }
//    }
//}
//struct SettingTestView: View {
//    @State var settings: Settings = .init()
//    var body: some View {
//        VStack(spacing: 30) {
//            Text(settings.name)
//            Button("Modify Instance Property") {
//                settings.name = "Fatbobman \(Int.random(in: 0 ... 1000))"
//            }
//            Button("Modify UserDefaults Directly") {
//                // 不会对直接修改 UserDefaults 的操作进行响应
//                UserDefaults.standard.set("\(Int.random(in: 0 ... 1000))", forKey: "name")
//            }
//        }
//        .buttonStyle(.bordered)
//    }
//}

@ObservationIgnored private let _$observationRegistrar = Observation.ObservationRegistrar()
var observationRegistrar: ObservationRegistrar {
    _$observationRegistrar
}
//Button("Modify UserDefaults Directly") {
//    UserDefaults.standard.set("\(Int.random(in: 0 ... 1000))", forKey: "name")
//    // 在保存后，通知所有 name 属性的订阅者
//    settings.observationRegistrar.withMutation(of: settings, keyPath: \.name){}
//}
//Button("Modify UserDefaults Directly") {
//    UserDefaults.standard.set("Fatbobman \(Int.random(in: 0 ... 1000))", forKey: "name")
//}
//.onReceive(NotificationCenter.default.publisher(for: UserDefaults.didChangeNotification)){ _ in
//    print("received user defaults notification")
//    settings.observationRegistrar.withMutation(of: settings, keyPath: \.name){}
//}
//https://github.com/fatbobman/ObservableDefaults
//@ObservableDefaults
//public class Test1 {
//    @DefaultsKey(userDefaultsKey: "firstName")
//    // Automatically adds @DefaultsBacked
//    public var name: String = "fat"
//
//    // Automatically adds @DefaultsBacked
//    public var age = 109
//
//    // Only observes, not persisted in UserDefaults
//    @ObservableOnly
//    public var height = 190
//
//    // Not observable and not persisted
//    @Ignore
//    public var weight = 10
//}
// 由宏自动构建
//public init(
//    userDefaults: Foundation.UserDefaults? = nil,
//    ignoreExternalChanges: Bool? = nil,
//    prefix: String? = nil
//) {
//    if let userDefaults {
//        _userDefaults = userDefaults
//    }
//    if let ignoreExternalChanges {
//        _isExternalNotificationDisabled = ignoreExternalChanges
//    }
//    if let prefix {
//        _prefix = prefix
//    }
//    assert(!_prefix.contains("."), "Prefix '\(_prefix)' should not contain '.' to avoid KVO issues!")
//    if !_isExternalNotificationDisabled {
//        observerStarter()
//    }
//}
//@State var settings: Settings = Settings(userDefaults: .standard, ignoreExternalChanges: false, prefix: "myApp_")
// 或
//@ObservableDefaults(autoInit: false, ignoreExternalChanges: true, suiteName: nil, prefix: "myApp_", obeserveFirst: false)
//class Settings {
//    @DefaultsKey(userDefaultsKey: "fullName")
//    var name: String = "Fatbobman"
//}
//@Observable
//class ViewState {
//    var selection = 10
//    var isLogin = false
//    let settings = Settings() // 放置到独立的实例中，
//}
//@ObservableDefaults
//class Settings {
//    var name: String = "Fatbobman"
//}
//
//struct SettingTestView: View {
//    @State var state = ViewState()
//    var body: some View {
//        VStack(spacing: 30) {
//            Text(state.settings.name)
//            Button("Modify Instance Property") {
//                state.settings.name = "Fatbobman \(Int.random(in: 0 ... 1000))"
//            }
//            Button("Modify UserDefaults Directly") {
//                UserDefaults.standard.set("Fatbobman \(Int.random(in: 0 ... 1000))", forKey: "name")
//            }
//        }
//        .buttonStyle(.bordered)
//    }
//}

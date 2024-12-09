//
//  ContentView.swift
//  AppStorage
//
//  Created by STL_QYH on 2024/12/9.
//
//  @AppStorage

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


/// @AppStorage 基础指南
//@AppStorage("username") var name = "fatbobman"
//@AppStorage("username") var name:String?
public extension UserDefaults {
    static let shared = UserDefaults(suiteName: "group.com.fatbobman.examples")!
}
//@AppStorage("userName",store: .shared) var name = "fat"
//UserDefaults.standard.set("bob",forKey:"username")

/// 增加 @AppStorage 支持的数据类型
extension Date:RawRepresentable{
    public typealias RawValue = String
    public init?(rawValue: RawValue) {
        guard let data = rawValue.data(using: .utf8),
              let date = try? JSONDecoder().decode(Date.self, from: data) else {
            return nil
        }
        self = date
    }

    public var rawValue: RawValue{
        guard let data = try? JSONEncoder().encode(self),
              let result = String(data:data,encoding: .utf8) else {
            return ""
        }
       return result
    }
}
//@AppStorage("date") var date = Date()
extension Array: RawRepresentable where Element: Codable {
    public init?(rawValue: String) {
        guard let data = rawValue.data(using: .utf8),
              let result = try? JSONDecoder().decode([Element].self, from: data)
        else { return nil }
        self = result
    }

    public var rawValue: String {
        guard let data = try? JSONEncoder().encode(self),
              let result = String(data: data, encoding: .utf8)
        else {
            return "[]"
        }
        return result
    }
}
//@AppStorage("selections") var selections = [3,4,5]
enum Options:Int{
    case a,b,c,d
}
//@AppStorage("option") var option = Options.a

/// 安全和便捷的声明（一）
enum Configuration {
    static let name = AppStorage(wrappedValue: "fatbobman", "name")
    static let age = AppStorage(wrappedValue: 12, "age")
}
let name = Configuration.name
//var body:some View {
//     Text(name.wrappedValue)
//     TextField("name",text:name.projectedValue)
//}

/// 集中注入
//class Defaults: ObservableObject {
//    @AppStorage("name") public var name = "fatbobman"
//    @AppStorage("age") public var age = 12
//}
//@StateObject var defaults = Defaults()
//...
//Text(defaults.name)
//TextField("name",text:defaults.$name)

/// 安全和便捷的声明（二）
public class Defaults: ObservableObject {
    @AppStorage("name") public var name = "fatbobman"
    @AppStorage("age") public var age = 12
    public static let shared = Defaults()
}
@propertyWrapper
public struct Default<T>: DynamicProperty {
    @ObservedObject private var defaults: Defaults
    private let keyPath: ReferenceWritableKeyPath<Defaults, T>
    public init(_ keyPath: ReferenceWritableKeyPath<Defaults, T>, defaults: Defaults = .shared) {
        self.keyPath = keyPath
        self.defaults = defaults
    }

    public var wrappedValue: T {
        get { defaults[keyPath: keyPath] }
        nonmutating set { defaults[keyPath: keyPath] = newValue }
    }

    public var projectedValue: Binding<T> {
        Binding(
            get: { defaults[keyPath: keyPath] },
            set: { value in
                defaults[keyPath: keyPath] = value
            }
        )
    }
}
//@Default(\.name) var name
//Text(name)
//TextField("name",text:$name)

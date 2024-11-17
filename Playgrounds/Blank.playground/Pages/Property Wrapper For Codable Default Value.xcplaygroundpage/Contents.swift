//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

// 错误的代码
//struct Video: Decodable {
//    let id: Int
//    let title: String
//    let commentEnabled = false
//}
struct Video: Decodable {
    let id: Int
    let title: String
//    let commentEnabled: Bool
    @Default<Bool>
    var commentEnabled: Bool
//    var _commentEnabled: Bool
//    enum CodingKeys: String, CodingKey {
//        case id, title, commentEnabled
//    }
//    init(from decoder: Decoder) throws {
//        let container = try decoder.container(keyedBy: CodingKeys.self)
//        id = try container.decode(Int.self, forKey: .id)
//        title = try container.decode(String.self, forKey: .title)
//        commentEnabled = try container.decodeIfPresent(Bool.self, forKey: .commentEnabled) ?? false
//    }
    enum State: String, Decodable {
        case unknown
        case streaming // 正在直播
        case archived  // 已完成
    } //使用struct维护性更好，不破坏现有实现，更稳定。如下定义亦是
    enum HTTPMethod: String {
        case get = "GET"
        case post = "POST"
        case put = "PUT"
        case delete = "DELETE"
    }
    
//    let state: State
}
/* //使用struct维护性更好，不破坏现有实现，更稳定
struct State: RawRepresentable, Decodable {
    static let streaming = State(rawValue: "streaming")
    static let archived = State(rawValue: "archived")
    
    let rawValue: String
}
*/
//@propertyWrapper
//struct Default<T: Decodable> {
//    let value: T
//
//    var wrappedValue: T {
//        get { fatalError("未实现") }
//    }
//}
// 错误代码
//extension Default: Decodable {
//    init(from decoder: Decoder) throws {
//        let container = try decoder.singleValueContainer()
//
//        let v = (try? container.decode(T.self)) ?? value
//        // 在 init 方法中，value 还不可用，怎么办??
//
//        self.wrappedValue = v
//        // 如何把解码后的值交给 wrappedValue??
//    }
//}
//我们需要一种不涉及具体的值，而是通过类型系统来传递值的方式。
protocol DefaultValue {
    associatedtype Value: Decodable
    static var defaultValue: Value { get }
}
extension Bool: DefaultValue {
    static let defaultValue = false
}
@propertyWrapper
struct Default<T: DefaultValue> {
    var wrappedValue: T.Value
}
extension Default: Decodable {
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        wrappedValue = (try? container.decode(T.Value.self)) ?? T.defaultValue
    }
}
//因为我们所使用的解码器默认生成的代码是要求 key 存在的。想要改变这一行为，我们可以为 container 重写对于 Default 类型解码的实现：
extension KeyedDecodingContainer {
    func decode<T>(_ type: Default<T>.Type, forKey key: Key) throws -> Default<T> where T: DefaultValue {
        try decodeIfPresent(type, forKey: key) ?? Default(wrappedValue: T.defaultValue)
    }
}
extension Video.State: DefaultValue {
    static let defaultValue = Video.State.unknown
}
//struct Video: Decodable {
//    @Default<State> var state: State
//}
// {"id": 12345, "title": "My First Video", "state": "reserved"}
// Video(
//   id: 12345,
//   title: "My First Video",
//   _commentEnabled: Default<Swift.Bool>(wrappedValue: false),
//   _state: Default<Video.State>(wrappedValue: Video.State.unknown)
// )
/*
extension Bool {
    enum False: DefaultValue {
        static let defaultValue = false
    }
    enum True: DefaultValue {
        static let defaultValue = true
    }
}
extension Default {
    typealias True = Default<Bool.True>
    typealias False = Default<Bool.False>
}
struct A {
    @Default.False var commentEnabled: Bool
    @Default.True var publicVideo: Bool
}
*/
let json = #"{"id": 12345, "title": "My First Video", "state": "reserved"}"#
//let value = try JSONDecoder().decode(Video.self, from: json.data(using: .utf8)!)
//print(value)
if let data = json.data(using: .utf8) {
    print("data", data)
    if let a = try? JSONDecoder().decode(Video.self, from: data) {
        print("a", a)
    }
}

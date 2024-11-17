//: [Previous](@previous)

import Foundation
import UIKit

//public struct BetterArray {
//  var storages: [Any] = []    // 🫢😵‍💫
//
//  mutating func append(_ newEelement: Any) {
//    stroages.append(newEelement)
//  }
//}

//public struct BetterArray<T> {
//  var storages: [T] = []
//
//  mutating func append(_ newElement: T) {
//    storages.append(newElement)
//  }
//}

public struct BetterArray<Element> {
    var storages: [Element] = []
    
    mutating func append(_ newElement: Element) {
        storages.append(newElement)
    }
    //    func index(of element: Element) -> Int? {
    //      storages.firstIndex(of: element)
    //    }
    //    func index(of element: Element) -> Int? where Element: Equatable {
    //        storages.firstIndex(of: element)
    //    }
    //    mutating func remove(_ nouseElement: Element) where Element: Equatable {
    //        storages.removeAll { $0 == nouseElement }
    //    }
    func map<T>(_ transform: (Element) throws -> T) rethrows -> [T] {
        try storages.map(transform)
    }
}
// 要求泛型遵循协议
extension BetterArray where Element: Equatable {
    func index(of element: Element) -> Int? {
        storages.firstIndex(of: element)
    }
    mutating func remove(_ nouseElement: Element) {
        storages.removeAll { $0 == nouseElement }
    }
}
// 指定泛型类型
extension BetterArray where Element == String {
    func splice() -> Element {
        storages.reduce("") { partialResult, element in
            partialResult + element
        }
    }
}

//public struct BetterArray<Element: Equatable> {
//  var storages: [Element] = []
//
//  mutating func append(_ newElement: Element) {
//    storages.append(newElement)
//  }
//
//  func index(of element: Element) -> Int? {
//    storages.firstIndex(of: element)
//  }
//}

struct DemoElement {}
var betterArray = BetterArray<DemoElement>()    // ✅
betterArray.append(DemoElement())               // ✅
// ❌ Instance method 'index(of:)' requires that 'DemoElement' conform to 'Equatable'
//betterArray.index(of: DemoElement())

struct Tag<Type>: Equatable, ExpressibleByIntegerLiteral {
// phantom type 字面量表达
    let id: String
    
    init(integerLiteral value: Int) {
        id = "\(value)"
//        self.value = value
    }

//    var value: Int
}

let tag: Tag<Int> = 1
tag.id

struct BStruct: CustomStringConvertible {
    var str = ""
    
    var description: String {
        return str
    }
}

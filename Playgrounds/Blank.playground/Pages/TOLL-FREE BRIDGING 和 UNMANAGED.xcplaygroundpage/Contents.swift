//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

infix operator <-
public func <- <T>(target: inout T?, value: @autoclosure () -> T) -> T {
    let val = value()
    target = val
    return val
}

weak var view: NSObject?

let a = view <- NSObject()


extension Sequence where Element: Hashable {
    func uniqued() -> [Element] {
        var seen = Set<Element>()
        return filter { seen.insert($0).inserted }
    }
}
extension Sequence {
    func uniqued(comparator: (Element, Element) -> Bool) -> [Element] {
        var result: [Element] = []
        for element in self {
            if result.contains(where: {comparator(element, $0)}) {
                continue
            }
            result.append(element)
        }
        return result
    }
}
extension Sequence {
    func uniqued<T: Equatable>(_ keyPath: KeyPath<Element, T>) -> [Element] {
        uniqued { $0[keyPath: keyPath] == $1[keyPath: keyPath] }
    }
}

let numbers = [2021, 11, 12]
let sum = numbers.reduce(0, +)
//let result = numbers.reduce(0) { partialResult, int in
//    partialResult + int
//}

let age = 2

if (18...32).contains(age) {
    print("符合要求")
}

if (18...32) ~= age {
    print("符合要求")
}

func findMostCountName(inNames names: [String]) -> String {
    var occurrenceFor: [String : Int] = [:]
    for name in names {
        occurrenceFor[name, default: 0] += 1  //如果 key 存在，返回对应的 value；否则返回 0
    }
    
    var maxCount = 0
    var result = ""
    for (name, count) in occurrenceFor {
        if count > maxCount {
            maxCount = count
            result = name
        }
    }
    return result
}

let d1 = Decimal(0.3)
let d2 = Decimal(0.3)
let d3 = d1 * d2

let dict = ["key1": 10, "key2": nil]
//let result = dict.compactMap { $0 }
let result = dict.compactMapValues { $0 }
//print(result) //["key1": 10]

let scoresByName = ["Henk": [0, 5, 8], "John": [2, 5, 8]]

let mapped = scoresByName.map { $0.value }
// [[2, 5, 8], [0, 5, 8]]
//print(mapped)

let flatMapped = scoresByName.flatMap { $0.value }
// [2, 5, 8, 0, 5, 8]

//计算年龄和
//let totalAges = stus.reduce(0) { (result, stu) in
//    return result + stu.age
//}

//打印内存地址
func address(of object: UnsafeRawPointer) -> String {
    let addr = Int(bitPattern: object)
    return String(format: "%p", addr)
}

var num1 = 101
var num2 = num1
address(of: &num1) //0x108074090
address(of: &num2) //0x108074098
String(format: "%p", num1)
String(format: "%p", num2)
num2 = 102
address(of: &num1) //0x108074090
address(of: &num2) //0x108074098
String(format: "%p", num1)
String(format: "%p", num2)

var str1 = "oldbirds"
var str2 = str1
address(of: &str1) //0x1080740a0
address(of: &str2) //0x1080740b0
str1 = "newbirds"
address(of: &str1) //0x1080740a0
address(of: &str2) //0x1080740b0

var arr1 = [1,2,3,4,5]
var arr2 = arr1
address(of: &arr1) //0x600000e55510
address(of: &arr2) //0x600000e55510
arr2[2] = 4
address(of: &arr1) //0x600000e55510
address(of: &arr2) //0x600000e55dd0

var dic1 = ["key":"value", 0:0] as [AnyHashable : Any]
var dic2 = dic1
address(of: &dic1) //0x600000e55510
address(of: &dic2) //0x600000e55dd0
dic2[1] = 1
address(of: &dic1) //0x600000e55510
address(of: &dic2) //0x600000e55dd0

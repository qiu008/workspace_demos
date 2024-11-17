//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

protocol Copyable {
    func copy() -> Self
    func mutableCopy() -> Self
}

class MyClass: Copyable {

    var num = 1

    required init() {}
    
    func copy() -> Self {
        return self
    }
//    func mutableCopy() -> Self {
//        // TODO: 返回什么？
//        let result = MyClass() //直接写MyClass()，子类需重写此方法
//        result.num = num
//        return result as! Self
//    }
    func mutableCopy() -> Self {
        let result = type(of: self).init()
        result.num = num
        return result
    }
}

class SubClass: MyClass {
//    func mutableCopy() -> Self {
//        // TODO: 返回什么？
//        let result = SubClass()
//        result.num = num
//        return result as! Self
//    }
}

//extension MyClass: CVarArg {
//    var _cVarArgEncoding: [Int] {
//        [0]
//    }
//}

let mc = MyClass()
let mcMutableCopy = mc.mutableCopy()

let subMC = SubClass()
let subMCMutableCopy = subMC.mutableCopy()

// SWIFT自省
let string = "String"
if string is String {
    // Do something
}

// 'is' test is always true

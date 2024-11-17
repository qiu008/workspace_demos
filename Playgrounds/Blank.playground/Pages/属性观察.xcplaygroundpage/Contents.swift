//: [Previous](@previous)

import Foundation
import Darwin

//var greeting = "Hello, playground"

//: [Next](@next)

class A {
    var number :Int {
        get {
            print("get")
            return 1
        }

        set {print("set")}
    }
}

class B: A {
    //重写计算属性也可以进行属性观察
    override var number: Int {
        willSet { print("willSet") }
        didSet {
            print("didSet")
            print("oldValue", oldValue)
        }
    }
}

let b = B()
b.number = 0

1.797693134862315e+308 < Double.infinity  // true
1.797693134862316e+308 < Double.infinity  // false

let a = 0.0 / 0.0
let bb = sqrt(-1.0)
let c = 0 * Double.infinity

let num = Double.nan
if num == num {
    print("Num is \(num)")
} else {
    print("NaN")
}

//if isnan(num) {
//    print("NaN")
//}
if num.isNaN {
    print("NaN")
}



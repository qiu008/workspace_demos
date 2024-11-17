//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

//func objc_getAssociatedObject(object: AnyObject!,
//                                 key: UnsafePointer<Void>
//                             )  -> AnyObject!
//
//func objc_setAssociatedObject(object: AnyObject!,
//                                 key: UnsafePointer<Void>,
//                               value: AnyObject!,
//                              policy: objc_AssociationPolicy)

// MyClass.swift
class MyClass {
}

// MyClassExtension.swift
private var key: Void?

extension MyClass {
    var title: String? {
        get {
            return objc_getAssociatedObject(self, &key) as? String
        }

        set {
            objc_setAssociatedObject(self, &key, newValue, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
        }
    }
}


// 测试
func printTitle(_ input: MyClass) {
    if let title = input.title {
        print("Title: \(title)")
    } else {
        print("没有设置")
    }
}

let a = MyClass()
printTitle(a)
a.title = "Swifter.tips"
printTitle(a)

// 输出：
// 没有设置
// Title: Swifter.tips

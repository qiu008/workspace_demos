//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

class A: NSObject {
    dynamic //动不动态都一样？
    var date = NSDate() //不能用Date
}

private var curContext = 0

class B: NSObject {
    var b_a: A?

    override init() {
        super.init()
        let a = A()
        print(a.date)
        a.addObserver(self, forKeyPath: "date", options: .new, context: &curContext)
        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(3)) {
            print("a.date.modify")
            a.date = NSDate()
        }
        b_a = a
    }

    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) { //监听不到？
        print("a.observeValue.date")
        if context == &curContext, let newValue = change?[.newKey] {
            print(newValue)
        }
    }
}
let b = B()

/*
class MyClass: NSObject {
    dynamic
    var date = NSDate()
}

private var myContext = 0

class Class: NSObject {

    var myObject: MyClass!

    override init() {
        super.init()
        myObject = MyClass()
        print("初始化 MyClass，当前日期: \(myObject.date)")
        myObject.addObserver(self,
            forKeyPath: "date",
            options: .new,
            context: &myContext)

//        delay(3) {
//            self.myObject.date = NSDate()
//        }
        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(3)) {
            print("myObject.modify")
            self.myObject.date = NSDate()
        }
    }

//    override func observeValueForKeyPath(keyPath: String?,
//            ofObject object: AnyObject?,
//            change: [String : AnyObject]?,
//            context: UnsafeMutablePointer<Void>)
//    {
//        if let change = change where context == &myContext {
//            let a = change[NSKeyValueChangeNewKey]
//            print("日期发生变化 \(a)")
//        }
//    }
    override func observeValue(forKeyPath keyPath: String?,
                               of object: Any?,
                               change: [NSKeyValueChangeKey : Any]?,
                               context: UnsafeMutableRawPointer?) {
        print("myObject.observeValue.date")
        if context == &myContext, let a = change?[.newKey] {
            print("日期发生变化 \(a)")
        }
    }
}

let obj = Class()
*/

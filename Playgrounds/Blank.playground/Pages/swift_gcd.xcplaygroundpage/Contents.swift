//: [Previous](@previous)

import UIKit
import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

//print("delay")
//DispatchQueue.global().asyncAfter(deadline: .now() + 2) {
//    print("2秒后输出?")
//}
//DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
//    print("2秒后输出?")
//}
//let delay = dispatch_time(DISPATCH_TIME_NOW, Int64(time * Double(NSEC_PER_SEC)))
//dispatch_after(delay, dispatch_get_main_queue()) {
//    print("2 秒后输出")
//}

typealias CanCancelGCDTask = (Bool) -> Void
typealias Task = () -> Void
func delay(timeinterval: Int, task: @escaping Task) -> CanCancelGCDTask? {
    func dispatch_later(block: @escaping Task) {
        DispatchQueue.global().asyncAfter(deadline: .now() + .seconds(timeinterval), execute: block)
    }
    var closure: Task? = task
    var result: CanCancelGCDTask?
    
    let delayedClosure: CanCancelGCDTask = { cancel in
        if cancel == false, let internalClosure = closure {
            DispatchQueue.global().async(execute: internalClosure)
        }
        closure = nil
        result = nil
    }
    result = delayedClosure
    dispatch_later {
        result?(false)
    }
    return result
}
func cancel(task: CanCancelGCDTask?) {
    task?(true)
}
//let task = delay(timeinterval: 5) {
//    print("delay")
//}
//cancel(task: task)
//DispatchQueue.global().asyncAfter(deadline: .now() + .seconds(2), execute: {
//    cancel(task: task)
//})

//for i in 0...3 {
//    print(i, terminator: "")
//}

let a = Date.distantPast
debugPrint(Date.Type.self) //.Type：类型的类型，元类型
debugPrint(type(of: a)) //type(of: T) 返回某个值的动态类型的元类型
//type(of: Date.Type) //error
debugPrint(Date.self) //.self在类型后面结果是类型
debugPrint(a.self) //.self在实例后面结果是实例

let vc = UINavigationController()
type(of: vc).description()

let arr = [1,2,3,4]
for idx in 0...arr.count-2 {
    print(idx)
}

//class A {}
//let typeA: A.Type = A.self
class A {
    class func method() {
        print("Hello")
    }
}
let aSelf = A.self
A.self.method()
let aType: A.Type = A.self
aType.method()
// 或者
let aClass: AnyClass = A.self
(aClass as? A.Type)?.method()
debugPrint(A.self)
debugPrint(type(of: A.self))

protocol APro {}
debugPrint(APro.Type.self)
debugPrint(APro.Protocol.Type.self)
debugPrint(APro.Protocol.self)

let aA = A()
//let aType: A.self = type(of: aA)
//aA is aType

class B {}

let ABType: [AnyClass] = [A.self, B.self]

import UIKit
let tv = UITableView()
tv.register(UITableViewCell.self, forCellReuseIdentifier: "UITableViewCell")

class ViewController: UIViewController {}

let usingVCTypes: [AnyClass] = [ViewController.self, UITableView.self]
func setupViewControllers(vcTypes: [AnyClass]) {
    for vcType in vcTypes {
        if vcType is UIViewController.Type {
            let vc = (vcType as! UIViewController.Type).init()
//            let vc = vcType.init() //error?
            print(vc)
        }

    }
}
setupViewControllers(vcTypes: usingVCTypes)
/*.Type 表示的是某个类型的元类型，而在 Swift 中，除了 class，struct 和 enum 这三个类型外，我们还可以定义 protocol。对于 protocol 来说，有时候我们也会想取得接口的元类型。这时我们可以在某个 protocol 的名字后面使用 .Protocol 来获取，使用的方法和 .Type 是类似的。*/

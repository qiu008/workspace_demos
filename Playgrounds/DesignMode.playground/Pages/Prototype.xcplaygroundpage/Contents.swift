/*
 原型模式
 原型模式让你有了一个可以源源不断自我赋值的类。
 官方定义
 用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。
*/
 
import Foundation

protocol Prototype {
    func clone() -> Prototype
}

struct Product: Prototype {
    var title: String
    func clone() -> Prototype {
        return Product(title: title)
    }
}

let p1 = Product(title: "p1")
let p2 = p1.clone()
(p2 as? Product)?.title // OUTPUT: p1

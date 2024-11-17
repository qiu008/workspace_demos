//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

struct Person {
    let name: String
    let age: Int
}

let xiaoMing = Person(name: "XiaoMing", age: 16)
let r = Mirror(reflecting: xiaoMing) // r 是 MirrorType

print("xiaoMing 是 \(r.displayStyle!)")

print("属性个数:\(r.children.count)")

print("属性:\(r.children)")

//for i in r.children.startIndex..<r.children.endIndex {
//    print("属性名:\(r.children[i].0!)，值:\(r.children[i].1)")
//}

dump(xiaoMing)

/*对于一个从对象反射出来的 Mirror，它所包含的信息是完备的。也就是说我们可以在运行时通过 Mirror 的手段了解一个 Swift 类型 (当然 NSObject 类也可以) 的实例的属性信息。该特性最容易想到的应用的特性就是为任意 model 对象生成对应的 JSON 描述。我们可以对等待处理的对象的 Mirror 值进行深度优先的访问，并按照属性的 valueType 将它们归类对应到不同的格式化中。
 
 另一个常见的应用场景是类似对 Swift 类型的对象做像 Objective-C 中 KVC 那样的 valueForKey: 的取值。通过比较取到的属性的名字和我们想要取得的 key 值就行了，非常简单：*/

func valueFrom(object: Any, key: String) -> Any? {
    let mirror = Mirror(reflecting: object)
    print(mirror.children)
//    for i in mirror.children.startIndex..<mirror.children.endIndex {
//        let (targetKey, targetMirror) = mirror.children[i]
//        if key == targetKey {
//            return targetMirror
//        }
//    }

    return nil
}

// 接上面的 xiaoMing
if let name = valueFrom(object: xiaoMing, key: "name") as? String {
    print("通过 key 得到值: \(name)")
}

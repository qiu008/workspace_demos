import UIKit
import Foundation
//var str = "Hello, playground"

//let a = 3 + 0.1415926
//let b = 2
//let c = a + b
//let c = a + Double(b)

//enum ProfileType: Int {
//    //0真实档案 1匿名档案(默认查真实的)
//    case real, nick
//}
//let pt = ProfileType.real
//let tp = pt.rawValue

let iN: String? = "abcdefg"
//let img = iN.flatMap { (imgN) in
//    UIImage(named: imgN)
//}
let img = iN.flatMap { UIImage(named: $0) }
//print(img as Any)

// 如果不指明类型，由于 UIKit 的存在
// 将被推断为 [NSObject]
let objectArray: [CustomStringConvertible] = [1, "two", 3]
let first = objectArray[0]
first.description


protocol SomeProtocol {
    var age: Int { get set }
}

class Person: SomeProtocol {
    final let name: Int = 0
    var age: Int = 0
}

class AClass {
    var person: SomeProtocol?
    
}

let p = Person()
let ac = AClass()
ac.person = p //循环了喔
ac.person?.age = 1

//final
class MyClass{
    final
    var name = ""
    
//    final
    var level: Int {
        return 0
    }
}

class MySubclass: MyClass {
    override var level: Int {
        return 1
    }
}

//Data(contentsOf: URL(string: "")!, options: .alwaysMapped)

let string = "/var/controller_driver/secret_photo.png"
let components = (string as NSString).pathComponents
let url = URL(string: string)
url?.pathComponents

let levels = "ABCDE"

let nsRange = NSMakeRange(1, 4)
// 编译错误
// Cannot invoke `stringByReplacingCharactersInRange`
// with an argument list of type '(NSRange, withString: String)'
//levels.replaceSubrange(nsRange, with: "AAA")
//levels.stringByReplacingCharactersInRange(nsRange, withString: "AAAA")
(levels as NSString).replacingCharacters(in: nsRange, with: "AAAA")

let indexPositionOne = levels.startIndex
indexPositionOne.hashValue.advanced(by: 4)
//let swiftRange = indexPositionOne ..< indexPositionOne.advanced(by: 4)
//levels.stringByReplacingCharactersInRange(swiftRange, withString: "AAAA")
let swiftRange = indexPositionOne ..< levels.endIndex
//levels.replaceSubrange(swiftRange, with: "AAAA")
levels.replacingCharacters(in: swiftRange, with: "AAAA")
// 输出：
// AAAAA

"kljadsa".forEach { c in
    
}

var str = ""
var a = (str as NSString).appendingPathComponent("")
str.cString(using: .ascii)

//int cFunction(int (callback)(int x, int y)) {
//    return callback(1, 2);
//}
let callback: @convention(c) (Int32, Int32) -> Int32
callback = { (x, y) -> Int32 in
    return x + y
}
//let result = cFunction(callback)
//print(result)
//let result = cFunction {
//    (x, y) -> Int32 in
//    return x + y
//}
//print(result)


str = "12ahf*(*^&%29387"
str.trimmingCharacters(in: .decimalDigits.inverted)

//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

var string: String? = "string"
var anotherString: String?? = string

var literalOptional: String?? = "string"

var aNil: String? = nil

var anotherNil: String?? = aNil
var literalNil: String?? = nil

if let a = anotherNil {
    print("a", a)
}

if let b = literalNil {
    print("b", b)
}

//(lldb) fr v -R anotherNil
//(Swift.Optional<Swift.Optional<Swift.String>>)
//    anotherNil = Some {
//    ... 中略
//}
//(lldb) fr v -R literalNil
//(Swift.Optional<Swift.Optional<Swift.String>>)
//    literalNil = None {
//    ... 中略
//}

[1,2,3,4,5].map { a in
    a * a
}

let num: Int? = 3
let result = num.map {
    $0 * 2
}



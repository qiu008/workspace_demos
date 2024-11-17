// 到吗编译后只是一个关键词的集合。其本身没有任何意义
//func valueTupleType(a: (Int, Any)) -> Bool {
//    // guard case 的例子
//    guard case let (x, _ as String) = a else { return false}
//    print(x)
//
//    // for case 的例子
//    for case let (aa, _ as String) in [a] {
//        print(aa)
//    }
//
//    // if case 的例子
//    if case let (x, _ as String) = a {
//       print("if", x)
//    }
//
//    // switch case example
//    switch a {
//    case let (a, _ as String):
//    print(a)
//    return true
//    default: return false
//    }
//}
//let u: Any = "a"
//let b: Any = 5
//print(valueTupleType(a: (5, u)))
//print(valueTupleType(a: (5, b)))
// 5, 5, "if 5", 5, true, false

//func nonnil<T>(array: [T?]) -> [T] {
//   var result: [T] = []
//   for case let x? in array {
//      result.append(x)
//   }
//   return result
//}
//print(nonnil(array: ["a", nil, "b", "c", nil]))

//for case let Entity.Entry(t, x, y, _) in gameEntities() where x > 0 && y > 0 {
//    drawEntity(t, x, y)
//}

//"Hello World".hasPrefix("H")
//String.hasPrefix("Hello World")("H")

let x = 10
switch x {
case 1...Int.max: // EXC_BAD_INSTRUCTION
    print("positive")
case Int.min..<0:
    print("negative")
case 0:
    print("zero")
default:
    fatalError("Should be unreachable")
}

/*
 类型擦除（关联类型擦除？）
 
 利用一个具体实现的通用泛型类（参看系统库的AnySequence），去包装具体实现了该泛型协议的类
 
 定义一个中间层结构体，该结构体实现了协议的所有方法
 在中间层结构体实现的具体协议方法中，再转发给实现协议的抽象类型
 在中间层结构体的初始化过程中，实现协议的抽象类型，会被当做参数传入（依赖注入）
 */

import Foundation

protocol Protocol {
    associatedtype AssociatedType
    
    func test(parameter: AssociatedType)
}
struct AnyStruct<G>: Protocol {
    private let handle: (G) -> Void
//    private let curring: (Base) -> ((G) -> Void)
    init<Base: Protocol>(base: Base) where Base.AssociatedType == G {
        handle = base.test(parameter:)
    }
    
    func test(parameter: G) {
        handle(parameter)
    }
}
//AnySequence
struct SomeStruct<G>: Protocol {
//    typealias AssociatedType = G
    
    func test(parameter: G) {
        print(parameter)
    }
}
//let s: AnyStruct<String> = AnyStruct(base: SomeStruct())
//let s = AnyStruct<String>(base: SomeStruct())
let s = AnyStruct(base: SomeStruct<String>())
s.test(parameter: "type erased")
let b = arc4random() % 2 == 0
//let a = b ? 1 : 0
//let g = b ? SomeStruct<String>() : SomeStruct<Int>()
//let g = b ? AnyStruct(base: SomeStruct<String>()) : AnyStruct(base: SomeStruct<Int>())

//func f(seq: Sequence<Int>) {}
// Compile error： Cannot specialize non-generic type 'Sequence'
func f<S: Sequence>(seq: S) where S.Element == Int {}
//func f0<S: Sequence<Int>>(seq: S) {}
func f1<S: Sequence>(seq: S) {}
//let f0: Sequence<Int>
//let f0: Sequence
func g<S: Sequence>() -> S where S.Element == Int {
    let oneTwoThree = 1...3
    return oneTwoThree as! S
}
func g<S: Sequence>() -> S {
    let oneTwoThree = 1...3
    return oneTwoThree as! S
}


protocol Fork {
    associatedtype E
    func call() -> E
}

struct Dog: Fork {
//    typealias E = String
    func call() -> String {
        return "🐶"
    }
}

struct Cat: Fork {
    typealias E = Int
    
    func call() -> Int {
        return 1
    }
}

func g0<S: Fork>() -> S where S.E == String {
    return Dog() as! S
}

// 在这里可以看出来。g 这个函数具体返回什么东西是在调用的时候决定的。就是说要想正确的使用 g 这个函数必须使用  `let dog: Dog = g()`  这样的代码
let dog: Dog = g0()
dog.call()

// error
//let dog = g0()
//let cat: Cat = g0()

protocol Printer {
    associatedtype T
    func log(val: T)
}

struct AnyPrinter<U>: Printer {
    typealias T = U
    private let _log: (U) -> ()
    //隐式引用
    init<Base: Printer>(base : Base) where Base.T == U {
        _log = base.log
//        _log = { _ in
//
//        }
    }

    func log(val: T) {
        _log(val)
    }
}

class Logger<U>: Printer {
    typealias T = U

    func log(val: T) {
        print("\(val)")
    }
    
    deinit {
        print("Logger.deinit")
    }
}

//let logger = Logger<Int>()
let printer = AnyPrinter(base: Logger<Int>())
printer.log(val: 5)        // prints 5


struct AnyLog<U: Printer>: Printer {

    private let _log: U
    //显式引用
    init(log: U) {
        _log = log
    }

    func log(val: U.T) {
        _log.log(val: val)
    }
}
struct Log<T>: Printer {

    func log(val: T) {
        print("\(val)")
    }
}
AnyLog(log: Log<String>()).log(val: "0")
let logInt = AnyLog(log: Log<Int>())
logInt.log(val: 0)


class AnyPrinterBoxBase<T>: Printer {

    func log(val: T) {
        fatalError()
    }
}
class PrinterBox<Base: Printer>: AnyPrinterBoxBase<Base.T> {

    var base: Base
    
    init(_ base: Base) {
        self.base = base
    }

    override func log(val: Base.T) {
        base.log(val: val)
    }
}
//class _PrinterBox<Base>: Printer {
//    typealias T = Base
//    var base: Base
//
//    init<Base: Printer>(_ base: Base) where Base.T == T {
//        self.base = base
//        // Error: Cannot assign value of type 'Base' to type 'Base'
//    }
//
//    func log(val: Base) {
//
//    }
//}
struct AnyPrinter0<T>: Printer {

    var _box: AnyPrinterBoxBase<T>

    init<Base: Printer>(_ base: Base) where Base.T == T {
        _box = PrinterBox(base)
    }

    func log(val: T) {
        _box.log(val: val)
    }
}



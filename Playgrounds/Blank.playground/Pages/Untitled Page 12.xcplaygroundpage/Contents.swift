//import Rx

import Foundation

protocol A1 {
    func method1() -> String
}

struct B1: A1 {
    func method1() -> String {
        return "hello"
    }
}

let b1 = B1() // b1 is B1
b1.method1() // hello

let a1 = b1 as A1 // a1 is A1
a1.method1() // hello


protocol A2 {
    func method1() -> String // 动态派发
}

extension A2 {
    func method1() -> String {
        return "hi"
    }

    func method2() -> String { // 为了安全会静态派发
        return "hi"
    }
}

struct B2: A2 {
    func method1() -> String {
        return "hello"
    }

    func method2() -> String {
        return "hello"
    }
}

let b2 = B2()
b2.method1() // hello
b2.method2() // hello

let a2 = b2 as A2 // B2
a2.method1() // hello
a2.method2() // hi


// 柯里化
func addTo(adder: Int) -> (Int) -> Int {
    return {
        num in
        return num + adder
    }
}

addTo(adder: 1)(1)

class BankAccount {
    var balance: Double = 0.0

    func deposit(_ amount: Double) {
        balance += amount
    }
}

let account = BankAccount()
account.deposit(100) // balance is now 100
account.balance

let depositor = BankAccount.deposit(_:)
depositor(account)(100) // balance is now 200
account.balance

BankAccount.deposit(account)(100)
account.balance

enum ControlEvent {
    case touchUpInside
    case valueChanged
    // ...
}
protocol TargetAction {
    func performAction()
}
struct TargetActionWrapper<T: AnyObject>: TargetAction {
    weak var target: T?
    let action: (T) -> () -> ()

    func performAction() -> () {
        if let t = target {
            action(t)()
        }
    }
}
class Control {
    var actions = [ControlEvent: TargetAction]()

    func setTarget<T: AnyObject>(_ target: T, action: @escaping (T) -> () -> (), controlEvent: ControlEvent) {
        actions[controlEvent] = TargetActionWrapper(target: target, action: action)
    }

    func removeTargetForControlEvent(controlEvent: ControlEvent) {
        actions[controlEvent] = nil
    }

    func performActionForControlEvent(controlEvent: ControlEvent) {
        actions[controlEvent]?.performAction()
    }
}


// 枚举实现单链表
indirect enum LinkedList<Element: Comparable> {
    case Empty
    case Node(Element, LinkedList<Element>)
    
    func linkedListByRemovingElement(_ element: Element) -> LinkedList<Element> {
        guard case let .Node(value, next) = self else {
            return .Empty
        }
        return value == element ? next : LinkedList.Node(value, next.linkedListByRemovingElement(element))
    }
}
// 单项链表：1 -> 2 -> 3 -> 4
let linkedList = LinkedList.Node(1, .Node(2, .Node(3, .Node(4, .Empty))))

let result = linkedList.linkedListByRemovingElement(2)
//print(result) // 1 -> 3 -> 4


func makeIncrementor(addNumber: Int) -> ((inout Int) -> ()) {
    func incrementor(variable: inout Int) -> () {
        variable += addNumber;
    }
    return incrementor;
}
let incrementor = makeIncrementor(addNumber: 1)
var a = 1
incrementor(&a)
a
var b = 2
incrementor(&b)
a
b


struct Aa<T>: ExpressibleByArrayLiteral {
    typealias ArrayLiteralElement = T
    
    var array = [ArrayLiteralElement]()
    
    init(arrayLiteral elements: ArrayLiteralElement...) {
        array.append(contentsOf: elements)
    }
}
var aa = Aa(arrayLiteral: 1)
aa
var aa0: Array = [0, 1]
aa0
//aa0[0] = 1
extension Array {
    subscript(input: [Int]) -> ArraySlice<Element> {
        get {
            var result = ArraySlice<Element>()
            input.forEach { index in

                result.append(self[index])
            }
            return result
        }
        set {
            for (index, i) in input.enumerated() {

                self[i] = newValue[index]
            }
        }
    }
}
aa0[[0, 1]] = [1, 0]
var aa1: Aa = [0]
aa1.array.append(1)
enum MyBool: Int {
    case myTrue, myFalse
}
extension MyBool: ExpressibleByBooleanLiteral {
    typealias BooleanLiteralType = Bool
    
    init(booleanLiteral value: BooleanLiteralType) {
        self = value ? .myTrue : .myFalse
    }
}
let m = MyBool(booleanLiteral: true)
m.rawValue
let m0: MyBool = false
m0.rawValue


let aO: AnyObject = NSObject()
let aO1: AnyObject = Toy(name: "")
//let aC: AnyClass = Toy


let areduce = [1, 2, 3, 4, 5].reduce(into: 0) { $0 += $1 }
areduce
let breduce = [1, 2, 3, 4, 5].reduce(0) { $0 + $1 }
breduce


//true && false
// 自动闭包
func && (lhs: Bool, rhs: @autoclosure () throws -> Bool) rethrows -> Bool {
    return lhs ? try rhs() : lhs
}
func || (lhs: Bool, rhs: @autoclosure () throws -> Bool) rethrows -> Bool {
    return lhs ? lhs : try rhs()
}


class Toy {
    let name: String
    init(name: String) {
        self.name = name
    }
}
class Pet {
    var toy: Toy?
}
class Child {
    var pet: Pet?
}
extension Toy {
    func play() {
        //...
    }
}
//let playClosure = { (child: Child) in
let playClosure = { (child: Child) -> ()? in
    child.pet?.toy?.play()
}
//playClosure


let date0 = Date(timeIntervalSince1970: TimeInterval(1629561600)) // 22号0点
let date1 = Date(timeIntervalSince1970: TimeInterval(1629648000)) // 23号0点
let date210 = Date(timeIntervalSince1970: TimeInterval(1629475200)) //21号0点
let date211 = Date(timeIntervalSince1970: TimeInterval(1629478800)) //21号1点
Calendar.current.compare(date0, to: date1, toGranularity: .day) == .orderedAscending
Calendar.current.compare(date210, to: date211, toGranularity: .day) == .orderedAscending
date210 < date211

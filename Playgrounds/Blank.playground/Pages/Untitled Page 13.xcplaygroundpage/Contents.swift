//: [Previous](@previous)

import UIKit

let touchDown = UIControl.Event.touchDown
let touchDownRepeat = UIControl.Event.touchDownRepeat
let touchDragInside = UIControl.Event.touchDragInside
let touchDragOutside = UIControl.Event.touchDragOutside
let touchDragEnter = UIControl.Event.touchDragEnter
let touchDragExit = UIControl.Event.touchDragExit
let touchUpInside = UIControl.Event.touchUpInside
let touchUpOutside = UIControl.Event.touchUpOutside
let touchCancel = UIControl.Event.touchCancel
let allTouchEvents = UIControl.Event.allTouchEvents
let a = UIControl.Event(rawValue: 4095)

protocol Drawable {
    func draw()
}

struct Point: Drawable {
    var x, y: Double
    func draw() {  }
}

struct Line: Drawable {
    var x1, y1, x2, y2: Double
    func draw() {  }
}
MemoryLayout.size(ofValue: Point(x: 0, y: 0))
//let value: Drawable = arc4random()%2 == 0 ? Point(x: 0, y: 0) : Line(x1: 0, y1: 0, x2: 1, y2: 1)

UIFont.systemFontSize

protocol Generator {
    associatedtype AbstractType
    func generate() -> AbstractType
}

struct IntGenerator: Generator {
    typealias AbstractType = Int
    
    func generate() -> Int {
        return 0
    }
}

struct StringGenerator: Generator {
    typealias AbstractType = String
    
    func generate() -> String {
        return "zero"
    }
}
//let value: Generator = StringGenerator()
//let value: Generator = arc4random()%2 == 0 ? IntGenerator() : StringGenerator()
//Protocol 'Generator' can only be used as a generic constraint because it has Self or associated type requirements
//let x = value.generate()


protocol BoolGenerator: Generator where AbstractType == String {}
struct BoolGeneratorObj: BoolGenerator {
    func generate() -> String {
        return "bool"
    }
}
//let value: BoolGenerator = BoolGeneratorObj()
//Error: Protocol 'BoolGenerator' can only be used as a generic constraint because it has Self or associated type requirements


//protocol Generator {
//    associatedtype AbstractType
//    func generate() -> AbstractType
//}

struct GeneratorThunk<T>: Generator {
    private let _generate: () -> T
    //G泛型
    init<G: Generator>(_ gen: G) where G.AbstractType == T {
        _generate = gen.generate
    }
    
    func generate() -> T {
        return _generate()
    }
}

//struct StringGenerator: Generator {
//    typealias AbstractType = String
//    func generate() -> String {
//        return "zero"
//    }
//}

let gens: GeneratorThunk<String> = GeneratorThunk(StringGenerator())


protocol Printer {
    associatedtype T
    func print(val: T)
}

struct AnyPrinter<U>: Printer {
    typealias T = U
    private let _print: (U) -> ()
    //Base泛型
    init<Base: Printer>(base : Base) where Base.T == U {
        _print = base.print
    }

    func print(val: T) {
        _print(val)
    }
}

struct Logger<U>: Printer {
    typealias T = U

    func print(val: T) {
        NSLog("\(val)")
    }
}

let logger = Logger<Int>()
let printer = AnyPrinter(base: logger)
printer.print(val: 5)        // prints 5


//AnySequence

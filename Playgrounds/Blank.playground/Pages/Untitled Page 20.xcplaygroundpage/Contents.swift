//: [Previous](@previous)

import Foundation

var greeting = "Hello, playground"

//: [Next](@next)

protocol FooProtocol {}
struct Foo: FooProtocol {}

func fooFunc<T: FooProtocol>(_ x: T?) {}
func fooFunc1<T: FooProtocol>(_ x: T) {}
func fooFunc2<T: FooProtocol>(_ x: T?, _ y: T) {}

func test() {
    //                       👇
//    let foo: (any FooProtocol)? = Foo()
//    ❌ Type 'any FooProtocol' cannot conform to 'FooProtocol'
//    fooFunc(foo)
    
    let foo: any FooProtocol = Foo()
    fooFunc1(foo)

//    ❌ Type 'any FooProtocol' cannot conform to 'FooProtocol'
//    fooFunc2(nil, foo)
    fooFunc2(nil, Foo())
    
    
}



/*
// Type Erasure
protocol FooProtocol {
    func bar()
}

struct Foo: FooProtocol {
    func bar() {}
}

//       👇
struct AnyFoo: FooProtocol {
    let anyInstance: any FooProtocol
    
    func bar() {
        anyInstance.bar()
    }
}

func fooFunc<T: FooProtocol>(_ x: T?) {}

func test() {
    let foo: any FooProtocol = Foo()
    
    //        👇
    fooFunc(AnyFoo(anyInstance: foo))
}
 */

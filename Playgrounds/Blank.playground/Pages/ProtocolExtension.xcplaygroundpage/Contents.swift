//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

protocol A1 {
    func method1() -> String
}

struct B1: A1 {
    func method1() -> String {
        return "hello"
    }
}
let b1 = B1() // b1 is B1
b1.method1()
// hello

let a1: A1 = B1()
// a1 is A1
a1.method1()
// hello


protocol A2 {
    func method1() -> String
}
extension A2 {
    func method1() -> String {
        return "hi"
    }
    func method2() -> String {
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

let a2 = b2 as A2
a2.method1() // hello
a2.method2() // hi

//我们可以看到，对 a2 调用 method2 实际上是接口扩展中的方法被调用了，而不是 a2 实例中的方法被调用。我们不妨这样来理解：对于 method1，因为它在 protocol 中被定义了，因此对于一个被声明为遵守接口的类型的实例 (也就是对于 a2) 来说，可以确定实例必然实现了 method1，我们可以放心大胆地用动态派发的方式使用最终的实现 (不论它是在类型中的具体实现，还是在接口扩展中的默认实现)；但是对于 method2 来说，我们只是在接口扩展中进行了定义，没有任何规定说它必须在最终的类型中被实现。在使用时，因为 a2 只是一个符合 A2 接口的实例，编译器对 method2 唯一能确定的只是在接口扩展中有一个默认实现，因此在调用时，无法确定安全，也就不会去进行动态派发，而是转而编译期间就确定的默认实现。

//也许在这个例子中你会觉得无所谓，因为实际中估计并不会有人将一个已知类型实例转回接口类型。但是要考虑到如果你的一些泛型 API 中有类似的直接拿到一个接口类型的结果的时候，调用它的扩展方法时就需要特别小心了：一般来说，如果有这样的需求的话，我们可以考虑将这个接口类型再转回实际的类型，然后进行调用。

//整理一下相关的规则的话：

//如果类型推断得到的是实际的类型
//那么类型中的实现将被调用；如果类型中没有实现的话，那么接口扩展中的默认实现将被使用
//如果类型推断得到的是接口，而不是实际类型
//并且方法在接口中进行了定义，那么类型中的实现将被调用；如果类型中没有实现，那么接口扩展中的默认实现被使用
//否则 (也就是方法没有在接口中定义)，扩展中的默认实现将被调用

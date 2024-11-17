import Foundation

class Foo {
    var age: Int
    var name: String
    
    init(age: Int, name: String) {
        self.age = age
        self.name = name
    }
}

struct Food {
    var name: String = "food"
}

func bar() {
    var foo = Foo(age: 10, name: "Jim")
    var food = Food()
    let closure = { [foo, food] in // 捕获引用类型 (foo)
        print("\(foo.name) is \(foo.age) years old!")
//        print("\(foo?.name ?? "xxx") is \(foo?.age ?? -1) years old!")
    }
    //  foo.age = 11
    //  foo.name = "Tom"
    foo = Foo(age: 11, name: "Tom")
    
    closure()    // Tom is 11 years old!
}

//bar()

let domain: String? = "docs.swift.org"

// if let
var url: URL?
if let domain {
  url = URL(string: domain)
}

// closure
url = domain.flatMap { URL(string: $0) }

// first-class function
url = domain.flatMap(URL.init)  // 等价于 domain.flatMap(URL.init(string:))


protocol ProtocolDemo {
    func foo() // 从下往上找实现
}
extension ProtocolDemo {
    func foo() { // 从下往上找实现
        print("default imp foo: in protocol extension")
    }
    func bar() { // 从上往下找实现
        print("bar: in protocol extension")
    }
}
struct ImplementDemo: ProtocolDemo {
    func foo() { // 从下往上找实现
        print("foo: in imp")
    }
    func bar() { // 从下往上找实现
        print("bar: in imp")
    }
}
let dd: ProtocolDemo = ImplementDemo()
dd.foo()
dd.bar()

let aa: ImplementDemo = ImplementDemo()
aa.foo()
aa.bar()

//let a: [Any] = [1, "1", 1.0]
//Sequence



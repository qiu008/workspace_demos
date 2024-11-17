import UIKit

class C {
    var name = "C"
    var s: S?
    deinit {
        print("C")
    }
}

struct S {
    var name = "S"
    var c: C?
}

var s = S()
var c: C? = C()
c?.s = s
s.c = c
c = nil

class Test {
    var a: Int = 0
    var b: Int = 0
    var c: String = "0"
    func d() -> String {
        c
    }
}
MemoryLayout<Int>.size
MemoryLayout<String>.size

class_getInstanceSize(Test.self)
class_getInstanceSize(NSObject.self)
let ptr = UnsafeRawPointer(bitPattern: unsafeBitCast(NSObject(), to: UInt.self))!
malloc_size(ptr)

UIView.animate(withDuration: 0.3) {
    
}

class Kraken {
    var notificationObserver: ((Notification) -> Void)?
    init() {
//        notificationObserver =
        NotificationCenter.default.addObserver(forName: .NSBundleResourceRequestLowDiskSpace, object: nil, queue: .main) { notification in
//            self.eatHuman()
        }
    }

    deinit {
//        NotificationCenter.default.removeObserver(notificationObserver)
    }
}

UserDefaults.standard.set("", forKey: "")
//UserDefaults.standard.set(Kraken(), forKey: "Kraken")
//error: Execution was interrupted, reason: signal SIGABRT.
//The process has been left at the point where it was interrupted, use "thread return -x" to return to the state before expression evaluation.
//if let krk = UserDefaults.standard.object(forKey: "Kraken") as? Kraken {
//    print(krk)
//}

enum E {
    private static func f() {
        print("e f")
    }
    static func f0() {
        f()
        //Self: E
        Self.f()
//        print(Self)
        //self: E.Type
        self.f()
        print(self)
        //Self.Type: E.Type
    }
    func f1() {
        //Self: E
        Self.f0()
//        print(Self)
    }
}

E.f0()

class C0 {
    private static func f() {
        print("c f")
    }
    static func f0() {
        f()
        Self.f()
        self.f()
    }
    private class func f1() {
        print("c f1")
    }
    class func f2() {
        f()
        Self.f()
        self.f()
    }
}

C0.f0()


class Dog {
    class func bark() {
        print("\(self) 汪汪汪!")
    }
}

class Labrador: Dog {

}

Labrador.bark()    //Labrador 汪汪汪!

let dogType: Dog.Type = Labrador.self

func saySomething(dog: Dog.Type) {
    dog.bark()
    print("\(dog) 汪汪汪!")
}

saySomething(dog: dogType) // Labrador 汪汪汪!

let aray = [1,2,3,4]
//aray.allSatisfy { <#Int#> in
//    <#code#>
//}
aray.indices.contains(1)

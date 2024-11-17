//: [Previous](@previous)

import Foundation

//var num1 = 101
//var num2 = num1
//print(address(of: &num1))
//print(address(of: &num2))

//var str1 = "oldbirds"
//var str2 = str1
//print(address(of: &str1))
//print(address(of: &str2))

//打印内存地址
func address(of object: UnsafeRawPointer) -> String {
    let addr = Int(bitPattern: object)
    return NSString(format: "%p", addr) as String
}

struct Person {
    var name = ""
}

//var a1 = [Person(), Person()]
//var a2 = a1
//print(address(of: &a1))
//print(address(of: &a2))
//a1[0].name = "a1_0"
//print(address(of: &a1))
//print(address(of: &a2))

final class Ref<T> {
    var val : T
    init(_ v : T) {val = v}
}

struct Box<T> {
    var ref : Ref<T>
    init(_ x : T) { ref = Ref(x) }
    
    var value: T {
        get { return ref.val }
        set {
            if (!isKnownUniquelyReferenced(&ref)) {
                print("isKnownUniquelyReferenced - false")
                ref = Ref(newValue)
                return
            }
            print("isKnownUniquelyReferenced - true")
            ref.val = newValue
        }
    }
}
/*
 struct Persion {
 var name = "oldbirds"
 var age = 0
 }
 
 var oldbirds = Persion()
 print(address(of: &oldbirds))
 
 var box = Box(oldbirds)
 var box2 = box // box2 与 box 共享 box.ref
 print(box.value.name) // oldbirds
 print(box2.value.name) // oldbirds
 print(address(of: &box))
 print(address(of: &box2))
 //print(address(of: &box.ref))
 //print(address(of: &box2.ref))
 print(address(of: &box.ref.val))
 print(address(of: &box2.ref.val))
 //why address(of: &box.ref.val) != address(of: &box.value) ?
 print(address(of: &box.value))
 print(address(of: &box2.value))
 //print(address(of: &box.value.name))
 //print(address(of: &box2.value.name))
 //print(address(of: &box.ref.val.name))
 //print(address(of: &box2.ref.val.name))
 
 box2.value.name = "like" // box2 会创建新的 ref
 print(box.value.name) // oldbirds
 print(box2.value.name) // like
 print(address(of: &box))
 print(address(of: &box2))
 //print(address(of: &box.ref))
 //print(address(of: &box2.ref))
 print(address(of: &box.ref.val))
 print(address(of: &box2.ref.val))
 print(address(of: &box.value))
 print(address(of: &box2.value))
 //print(address(of: &box.value.name))
 //print(address(of: &box2.value.name))
 //print(address(of: &box.ref.val.name))
 //print(address(of: &box2.ref.val.name))
 */
let oldbirds = Person()

var box = Box(oldbirds)
box.value = oldbirds
var box2 = box // box2 与 box 共享 box.ref ? 应该是共享ref.val ?
print(address(of: &box))
print(address(of: &box2))
print(address(of: &box.ref))
print(address(of: &box2.ref))
print(address(of: &box.ref.val))
print(address(of: &box2.ref.val))
// address(of: &box.ref.val) != address(of: &box.value) ?
//print(address(of: &(box.value))) // 是 value 这个变量的内存地址 ?
//print(address(of: &box2.value))
box.value = oldbirds
//box2.value = Persion() // box2 会创建新的 ref
//box2.value = oldbirds
print(address(of: &box))
print(address(of: &box2))
print(address(of: &box.ref))
print(address(of: &box2.ref))
print(address(of: &box.ref.val))
print(address(of: &box2.ref.val))
//print(address(of: &box.value))
//print(address(of: &box2.value))

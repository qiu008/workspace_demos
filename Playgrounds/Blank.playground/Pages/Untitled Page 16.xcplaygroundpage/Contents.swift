//: [Previous](@previous)

import Foundation

var array = [1,2,3,4,5]
let ic: [Int] = array.reversed()
let rc: ReversedCollection = array.reversed()
//rc.forEach {
//    print($0)
//}


class Class {}
Class.self      //Class.Type
Class.self.self
Class().self    //Class
Class().self.self

//struct Model {
////    var a: Int = 1 //8
//    var a: Int? //9
//}
//var m = Model()
//m.a = 1
//MemoryLayout.size(ofValue: m)


Int(200.0 / 180.0)

// swift对象
struct HeapObject {

    var metadata: UnsafeRawPointer

    var refcounted1: UInt32

    var refcounted2: UInt32

}
// swift-class对象
struct Metadata{

    var kind: Int

    var superClass: Any.Type

    var cacheData: (Int, Int)

    var data: Int

    var classFlags: Int32

    var instanceAddressPoint: UInt32

    var instanceSize: UInt32

    var instanceAlignmentMask: UInt16

    var reserved: UInt16

    var classSize: UInt32

    var classAddressPoint: UInt32

    var typeDescriptor: UnsafeMutableRawPointer

    var iVarDestroyer: UnsafeRawPointer

}

// 实例
class Person {

    var age: Int = 18

    var name: String = "GG"

}

var t = Person()
// 将实例 t 绑定到 HeapObject 结构体上面
// Unmanaged<Instance>
// UnsafeMutableRawPointer
let objcRawPtr = Unmanaged.passUnretained(t).toOpaque()
// UnsafeMutablePointer<T>
let objcPtr = objcRawPtr.bindMemory(to: HeapObject.self, capacity: 1)
// Pointee
print(objcPtr.pointee)
// 绑定到swift-class结构体上
// UnsafePointer<T>
//let metadata = objcPtr.pointee.metadata.bindMemory(to: Metadata.self, capacity: MemoryLayout<Metadata>.stride).pointee
// Pointee
//print(metadata)
/*
HeapObject(metadata: 0x00000001000081a8, refcounted1: 3, refcounted2: 0)
Metadata(kind: 4295000432, superClass: _TtCs12_SwiftObject, cacheData: (140733732518560, 140943646785536), data: 4301294722, classFlags: 2, instanceAddressPoint: 0, instanceSize: 40, instanceAlignmentMask: 7, reserved: 0, classSize: 168, classAddressPoint: 16, typeDescriptor: 0x0000000100003c68, iVarDestroyer: 0x0000000000000000)
 */





//struct SS {
//    var a: Int {
//        get { b }
//        set { b = newValue ?? 0 }
//    }
//    var a: Int {
//        didSet { b = a }
//    }
//    var b: Int = 0
//}
//let s = MemoryLayout<SS>.size

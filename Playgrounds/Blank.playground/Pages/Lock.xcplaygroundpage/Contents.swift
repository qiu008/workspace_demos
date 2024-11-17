//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

//@synchronize
//Cocoa 和 Objective-C 中加锁的方式有很多，但是其中在日常开发中最常用的应该是 @synchronized，这个关键字可以用来修饰一个变量，并为其自动加上和解除互斥锁。
//- (void)myMethod:(id)anObj {
//    @synchronized(anObj) {
//        // 在括号内 anObj 不会被其他线程改变
//    }
//}

//扯远了，我们回到 @synchronized 上来。虽然这个方法很简单好用，但是很不幸的是在 Swift 中它已经 (或者是暂时) 不存在了。其实 @synchronized 在幕后做的事情是调用了 objc_sync 中的 objc_sync_enter 和 objc_sync_exit 方法，并且加入了一些异常判断。因此，在 Swift 中，如果我们忽略掉那些异常的话，我们想要 lock 一个变量的话，可以这样写：
func myMethod(anObj: Any) {
//    if objc_sync_enter(anObj) == OBJC_SYNC_SUCCESS {
//
//      objc_sync_exit(anObj)
//    }
    objc_sync_enter(anObj)
    // 在 enter 和 exit 之间 anObj 不会被其他线程改变
    
    objc_sync_exit(anObj)
}
func synchronized(_ lock: AnyObject, closure: () -> ()) {
    objc_sync_enter(lock)
    closure()
    objc_sync_exit(lock)
}
func myMethodLocked(anObj: AnyObject) {
    synchronized(anObj) {
        // 在括号内 anObj 不会被其他线程改变
    }
}

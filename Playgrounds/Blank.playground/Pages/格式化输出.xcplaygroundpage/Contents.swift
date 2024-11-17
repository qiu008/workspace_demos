//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

extension Double {
    /**
            
     */
    func format(f: String) -> String {
        return String(format: "%\(f)f", self)
    }
}


import UIKit

//UIView.AnimationOptions
UIView.animate(withDuration: 0.25, delay: 0.25) {
    
}


//test.h
int test(int a);

//test.c
int test(int a) {
    return a + 1;
}

//Module-Bridging-Header.h
#import "test.h"

//File.swift
func testSwift(input: Int32) {
    let result = test(input)
    print(result)
}

testSwift(1)
// 输出：2
//另外，我们甚至还有一种不需要借助头文件和 Bridging-Header 来导入 C 函数的方法，那就是使用 Swift 中的一个隐藏的符号 @asmname。@asmname 可以通过方法名字将某个 C 函数直接映射为 Swift 中的函数。比如上面的例子，我们可以将 test.h 和 Module-Bridging-Header.h 都删掉，然后将 swift 文件中改为下面这样，也是可以正常进行使用的：
//File.swift
//将 C 的 test 方法映射为 Swift 的 c_test 方法
#asmname("test") func c_test(a: Int32) -> Int32

func testSwift(input: Int32) {
    let result = c_test(a: input)
    print(result)
}

testSwift(input: 1)
// 输出：2

//这种导入在第三方 C 方法与系统库重名导致调用发生命名冲突时，可以用来为其中之一的函数重新命名以解决问题。当然我们也可以利用 Module 名字 + 方法名字的方式来解决这个问题。

//除了作为非头文件方式的导入之外，@asmname 还承担着和 @objc 的 “重命名 Swift 中类和方法名字” 类似的任务，这可以将 C 中不认可的 Swift 程序元素字符重命名为 ascii 码，以便在 C 中使用。

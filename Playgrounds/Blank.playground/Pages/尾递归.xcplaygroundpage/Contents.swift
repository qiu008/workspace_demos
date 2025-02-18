//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

func sum(_ n: UInt) -> UInt {
    if n == 0 {
        return 0
    }
    return n + sum(n - 1)
}
//sum(-1)
sum(4) // 10
sum(100) // 5050
//sum(1000000) // EXC_BAD_ACCESS (code=2, address=...)

//这是因为每次对于 sum 的递归调用都需要在调用栈上保存当前状态，否则我们就无法计算最后的 n + sum(n - 1)。当 n 足够大，调用栈足够深的时候，栈空间将被耗尽而导致错误，也就是我们常说的栈溢出了。

//一般对于递归，解决栈溢出的一个好方法是采用尾递归的写法。顾名思义，尾递归就是让函数里的最后一个动作是一个函数调用的形式，这个调用的返回值将直接被当前函数返回，从而避免在栈上保存状态。这样一来程序就可以更新最后的栈帧，而不是新建一个，来避免栈溢出的发生。在 Swift 2.0 中，编译器现在支持嵌套方法的递归调用了 (Swift 1.x 中如果你尝试递归调用一个嵌套函数的话会出现编译错误)，因此 sum 函数的尾递归版本可以写为：
func sumInternal(_ n: UInt, current: UInt) -> UInt {
    if n == 0 {
        return current
    } else {
        return sumInternal(n - 1, current: current + n)
    }
}
func tailSum(_ n: UInt) -> UInt {
//    func sumInternal(_ n: UInt, current: UInt) -> UInt {
//        if n == 0 {
//            return current
//        } else {
//            return sumInternal(n - 1, current: current + n)
//        }
//    }
    return sumInternal(n, current: 0)
}
//tailSum(1000000)
//sumInternal(100000, current: 0)
//tailSum(100000)

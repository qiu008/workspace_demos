//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

extension Int {
    func times(f: (Int) -> Void) {
        print("Int")
        for i in 1...self {
            f(i)
        }
    }
}

3.times { (i: Int) -> Void in
    print(i)
}
3.times { i in
    print(i)
}

extension Int {
    func times(f: () -> Void) {
        print("Void")
        for _ in 1...self {
            f()
        }
    }
}

//那么，() 又是什么呢？在多元组的最后我们指出了，其实 Swift 中任何东西都是放在多元组里的。(42, 42) 是含有两个 Int 类型元素的多元组，(42) 是含有一个 Int 的多元组，那么 () 是什么？没错，这是一个不含有任何元素的多元组。所以其实我们在 extention 里声明的 func times(f: Void -> Void) 根本不是 “不接受参数” 的闭包，而是一个接受没有任何元素的多元组的闭包。这也不奇怪为什么我们的方法会调用错误了。

//当然，在实际使用中这种情况基本是不会发生的。之所以调用到了 Void 版本的方法，是因为我们并没有在调用的时候为编译器提供足够的类型推断信息，因此 Swift 为我们选择了代价最小的 Void 版本来执行。如果我们将调用的代码改为：

//其实不止是 Void，像是在使用多元组时也会有这样的疑惑。比如我们又加入了一个这样看起来是“接受两个参数”的闭包的版本：

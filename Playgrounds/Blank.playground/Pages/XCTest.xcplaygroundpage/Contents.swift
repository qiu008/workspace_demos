//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

//对于类库来说，这种做法是没什么问题的 -- 那些被标记为 public 的东西恰好就是需要被测试的代码接口。但是对于 app 开发时的测试来说，我们需要尽可能地控制访问权限：我们没有理由为一些理论上不存在外部调用可能的代码赋予 public 这样高级的权限，这违背了最小权限的设计原则。对 app 的测试在 Swift 1.x 的时代中一直是一个很麻烦的问题。而在 Swift 2.0 中， Apple 为 app 的测试开了“后门”。现在我们可以通过在测试代码中导入 app 的 target 时，在之前追加 @testable，就可以访问到 app target 中 internal 的内容了。

// 位于 app target 的业务代码
func methodToTest() {

}

// 测试
@testable import MyApp

//...
func testMethodToTest() {

    // 配置测试

    someObj.methodToTest()

    // 断言结果
}

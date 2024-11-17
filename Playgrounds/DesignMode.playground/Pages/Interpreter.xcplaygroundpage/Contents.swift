/*
 解释器模式
 官方定义
 给定一个语言，定义它的文法表示，并定义一个解释器，这个解释器使用该标识来解释语言中的句子。
 */

import Foundation

protocol Expression {
    func evaluate(_ context: String) -> Int
}

struct MyAdditionExpression: Expression {
    func evaluate(_ context: String) -> Int {
        return context.components(separatedBy: "加")
            .compactMap { Int($0) }
            .reduce(0, +)
    }
}

let c = MyAdditionExpression()
c.evaluate("1加1") // OUTPUT: 2

/*
 建造者模式
 建造者模式就像你委托一个室内设计师装修你的新家
 官方定义
 将一个复杂的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。
 */

import Foundation

struct Builder {
    var partA: String
    var partB: String
}

struct Product {
    var partA: String
    var partB: String
    init(builder: Builder) {
        partA = builder.partA
        partB = builder.partB
    }
}

// 通过builder完成产品创建工作
let b = Builder(partA: "A", partB: "B")
// 这样产品只需要一个builder就可以完成制作
let p = Product(builder: b)

/*
 适配器模式
 适配器就像一个电源转换插头。
 官方定义
 将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。
 */

import Foundation

protocol Target {
    var value: String { get }
}

struct Adapter: Target {
    let adapt: Adapt
    var value: String {
        return "\(adapt.value)"
    }
    init(_ adapt: Adapt) {
        self.adapt = adapt
    }
}

struct Adapt {
    var value: Int
}
//通过适配器把Int转成String
Adapter(Adapt(value: 1)).value // "1"

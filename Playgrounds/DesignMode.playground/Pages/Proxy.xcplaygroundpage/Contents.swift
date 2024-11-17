/*
 代理模式
 让一个类成为了另一个类的实际接口。
 官方定义
 为其他对象提供一种代理以控制对这个对象的访问。
 有两种常见的代理场景：
 Protection proxy： 出于安全考虑，通过一个表层的类间接调用底层的类。
 Virtual proxy：出于性能考虑，通过一个低耗的类延迟调用一个高耗的类。
 */

import Foundation

protocol Subject {
    mutating func operation()
}

struct SecretObject: Subject {
    func operation() {
        // real implementation
    }
}

struct PublicObject: Subject {
    private lazy var s = SecretObject()
    mutating func operation() {
        s.operation()
    }
}

var p = PublicObject()
p.operation()

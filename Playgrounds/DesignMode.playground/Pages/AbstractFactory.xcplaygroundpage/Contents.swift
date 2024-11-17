/*
 抽象工厂
 官方定义
 提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。
 */

import Foundation

protocol ProductA {}
class ConcreteProductA1: ProductA {}
class ConcreteProductA2: ProductA {}

protocol ProductB {}
class ConcreteProductB1: ProductB {}
class ConcreteProductB2: ProductB {}

class Client {
    let f = Factory()
}

class Factory {
    func createProductA() -> ProductA? { return nil } // 用于继承
    func createProductB() -> ProductB? { return nil } // 用于继承
    func createProductA(type: Int) -> ProductA? { // 用于调用
        if type == 0 {
            return ConcreteFactory1().createProductA()
        } else {
            return ConcreteFactory2().createProductA()
        }
    }
    func createProductB(type: Int) -> ProductB? { // 用于调用
        if type == 0 {
            return ConcreteFactory1().createProductB()
        } else {
            return ConcreteFactory2().createProductB()
        }
    }
}

class ConcreteFactory1: Factory {
    override func createProductA() -> ProductA? {
        // ... 产品加工过程
        return ConcreteProductA1()
    }
    override func createProductB() -> ProductB? {
        // ... 产品加工过程
        return ConcreteProductB1()
    }
}

class ConcreteFactory2: Factory {
    override func createProductA() -> ProductA? {
        // ... 产品加工过程
        return ConcreteProductA2()
    }
    override func createProductB() -> ProductB? {
        // ... 产品加工过程
        return ConcreteProductB2()
    }
}

let c = Client()
c.f.createProductA(type: 0) // get ConcreteProductA1
c.f.createProductA(type: 1) // get ConcreteProductA2
c.f.createProductB(type: 0) // get ConcreteProductB1
c.f.createProductB(type: 1) // get ConcreteProductB2

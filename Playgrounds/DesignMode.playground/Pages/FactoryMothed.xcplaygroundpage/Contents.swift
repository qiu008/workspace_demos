/*
 工厂方法
 官方定义
 一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。
*/
import Foundation

protocol Product {}
class ConcreteProductA: Product {}
class ConcreteProductB: Product {}

class Client {
    let f = Factory()
}

class Factory {
    func createProduct() -> Product? { return nil } // 用于继承
    func createProduct(type: Int) -> Product? { // 用于调用
        if type == 0 {
            return ConcreteFactoryA().createProduct()
        } else {
            return ConcreteFactoryB().createProduct()
        }
    }
}

class ConcreteFactoryA: Factory {
    override func createProduct() -> Product? {
        // ... 产品加工过程
        return ConcreteProductA()
    }
}

class ConcreteFactoryB: Factory {
    override func createProduct() -> Product? {
        // ... 产品加工过程
        return ConcreteProductB()
    }
}

let c = Client()
c.f.createProduct(type: 0) // get ConcreteProductA

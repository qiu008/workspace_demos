//简单工厂

import Foundation

protocol Product {}
class ConcreteProductA: Product {}
class ConcreteProductB: Product {}

class Client {
    let s = Factory()
}

class Factory {
    func createProduct(type: Int) -> Product {
        if type == 0 {
            return ConcreteProductA()
        } else {
            return ConcreteProductB()
        }
    }
}

let c = Client()
c.s.createProduct(type: 0) // get ConcreteProductA

/*
 装饰者模式
 如果点咖啡时价格的计算是牛奶(糖(咖啡(价格: 19元)))就好了
 官方定义
 动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。
 */

import Foundation

protocol Component {
    var cost: Int { get }
}

protocol Decorator: Component {
    var component: Component { get }
    init(_ component: Component)
}

struct Coffee: Component {
    var cost: Int
}

struct Sugar: Decorator {
    var cost: Int {
        return component.cost + 1
    }
    var component: Component
    init(_ component: Component) {
        self.component = component
    }
}

struct Milk: Decorator {
    var cost: Int {
        return component.cost + 2
    }
    var component: Component
    init(_ component: Component) {
        self.component = component
    }
}
Sugar(Coffee(cost: 19)).cost
Milk(Coffee(cost: 19)).cost
Sugar(Milk(Coffee(cost: 19))).cost
Milk(Sugar(Coffee(cost: 19))).cost

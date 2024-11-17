/*
 组合模式
 组合模式就像一个公司的组织架构，存在基层员工(Leaf)和管理者(Composite)，他们都实现了组件(Component)的work方法，这种树状结构的每一级都是一个功能完备的个体。
 官方定义
 将对象组合成树形结构以表示"部分-整体"的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。
 */

import Foundation

protocol Component {
    func someMethod()
}

class Leaf: Component {
    func someMethod() {
        // Leaf
    }
}

class Composite: Component {
    var components = [Component]()
    func someMethod() {
        // Composite
        components.forEach {
            $0.someMethod()
        }
    }
}

let leaf = Leaf()
let composite = Composite()
composite.components += [leaf]

composite.someMethod()
leaf.someMethod()

/*
 这个模式的精髓就是Composite这个角色，事实上Leaf可以看做一个特殊的Compostie。由于他即可以是一个功能执行者，又可以包含其它节点，这个特性可以派生出泛用度很高的树状结构。
 */

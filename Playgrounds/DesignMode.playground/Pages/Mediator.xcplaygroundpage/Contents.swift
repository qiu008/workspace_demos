/*
 中介模式
 对象间发消息的传话筒。
 官方定义
 用一个中介对象来封装一系列的对象交互，中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。
 中介模式对于通信关系复杂的系统有很好的解耦效果。
 它和观察者模式很像，区别在于观察者是不关心接受方的广播，中介者是介入两个（或多个）对象之间的定点消息传递。
 */

import Foundation

protocol Mediator: AnyObject {
    func notify(message: String)
    func addReceiver(_ receiver: Receiver)
}

class ConcreteMediator: Mediator {
    var recipients = [Receiver]()
    func notify(message: String) {
        recipients.forEach { $0.receive(message: message) }
    }
    func addReceiver(_ receiver: Receiver) {
        recipients.append(receiver)
    }
}

protocol Receiver {
    func receive(message: String)
}

protocol Component: Receiver {
    var mediator: Mediator? { get }
}

struct ConcreteComponent: Component {
    weak var mediator: Mediator?
    var name: String
    func receive(message: String) {
        print(name, "receive: ", message)
    }
}

var mediator = ConcreteMediator()

let c1 = ConcreteComponent(mediator: mediator, name: "c1")
let c2 = ConcreteComponent(mediator: mediator, name: "c2")
let c3 = ConcreteComponent(mediator: mediator, name: "c3")

mediator.addReceiver(c1)
mediator.addReceiver(c2)
mediator.addReceiver(c3)

//c1  receive:  hi
//c2  receive:  hi
//c3  receive:  hi
c1.mediator?.notify(message: "hi")

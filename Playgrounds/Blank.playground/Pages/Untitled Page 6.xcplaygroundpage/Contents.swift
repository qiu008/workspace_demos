//protocol Protocol {
//    func render()
//}
//extension Protocol {
//    func render() { circle() } //这是默认实现
//    func circle() { print("protocol.circle") } //这算啥
//}
//class SVG: Protocol {
//    //只在协议扩展中声明实现的函数会静态派发，编译时就确定调用地址，重写无效
//    func circle() { print("svg.circle") }
//}
//SVG().render()

//函数派发的三种类型
//静态派发：最快提升执行速度，C++默认使用静态派发，swift函数加上final，会变成静态派发；但是无动态性，不支持继承
//函数表派发：
//消息派发

//Swift派发机制

//class Test {
//    dynamic func foo() {
//        print("bar")
//    }
//}
//extension Test {
//    @_dynamicReplacement(for: foo())
//    func foo_new() {
//        print("bar new")
//    }
//}
//Test().foo()

/*
 类型                          静态派发    函数表派发    消息派发
 值类型                            所有方法    /    /
 协议                          extension    主体创建    /
 类             extension/final/static    主体创建    @objc + dynamic
 NSObject子类    extension/final/static    主体创建    @objc + dynamic
 */

protocol Logger {
    func log(content: String)
}
extension Logger{
    func log(content: String) { //默认实现
        print(content)
        guard p1.description() == p2.description()
        else { return }
        
    }
    func description() -> String { //静态派发？
        return "Logger"
    }
}
class MyLogger: Logger{
    func log(content: String) { //覆盖协议函数
        print("MyLogger: " + content)
        print(description()) //0、函数嵌套调用，0、1结果不一致，函数表派发
    }
    func description() -> String { //未覆盖协议函数
        return "MyLogger"
    }
}

let p1: Logger = MyLogger()
p1.log(content: "p1")
print(p1.description()) //1、外面调用，0、1结果不一致，协议的静态派发

let p2 = MyLogger()
p2.log(content: "p2")
print(p2.description())

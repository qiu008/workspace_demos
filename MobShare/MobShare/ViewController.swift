//
//  ViewController.swift
//  MobShare
//
//  Created by STL_QYH on 2022/6/15.
//

import UIKit
import RxCocoa
import RxSwift

class ViewController: UIViewController {

    lazy var label = UILabel()
    
    let bag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .red
        
//        preferredFrameRateRange
        
        //f0()
        
        //f1()
        
        //f2()
        
        //f3()
        
        //f4()
        
        //test21()
        
        
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        let array: [Int] = [0, 1, 2, 3, 4, 5]
        self.asdf(array)
    }
}

class WYC {
    
//    var age: Int = 0 // 8
//    var name: String = "" // 16
//    var height: Int = 0 // 8
//    var address: String = "" // 16
//    var weight: Int = 0 // 8
//    var isChild: Bool = true
//    var isMan: Bool = false
}

extension ViewController {
//    func asdf<T: Collection>(_ array: T) where T.Index: Strideable, T.Index.Stride: SignedInteger {
    func asdf<T: Collection>(_ array: T) where T.Index: Strideable {
//        for index in array.startIndex...array.endIndex {
        for index in stride(from: array.startIndex, through: array.endIndex, by: 1) {
            print(index)
            print(array[index])
        }
        var size = class_getInstanceSize(UIView.self)
        size = MemoryLayout<UIView>.size
        size = MemoryLayout.size(ofValue: UIView())
        size = MemoryLayout<String>.size
        size = class_getInstanceSize(WYC.self)
        print(size)
    }
}
 
infix operator <*> : AdditionPrecedence
//Array的适用函子条件
func pure<A>(_ value: A) -> [A] { [value] }//易理解
//传入数组元素为函数，传入数组元素为A，拿到数组元素为B
//取出fn和value的元素分别进行调用。返回结果放到一个数组中
func <*><A, B>(fn: [(A) -> B], value: [A]) -> [B] {
    var arr: [B] = []
    if fn.count == value.count {
        for i in fn.startIndex..<fn.endIndex {
            arr.append(fn[i](value[i]))
        }
    }
    return arr
}

extension ViewController {

    /*
     函子
     像Array、 Optional这样支持map运算的类型，称为函子（ Functor）。
     
     适用函子
     两个条件：
     func pure<A>(_ value: A) -> F<A>
     func <*><A, B>(fn: F<(A) -> B>, value: F<A>) -> F<B>
     
     单子：
     func pure<A>(_ value: A) -> F<A>
     func flatMap<A, B>(_ value: F<A>, _ fn: (A) -> F<B>) -> F<B>
     */
    
    //Optional的适用函子条件
    func pure<A>(_ value: A) -> A? { value }//易理解
    //传入可选项函数(A) -> B ,传入A? ，返回B?
    //将A传入函数fn中，拿到的仍然是个可选项
//    func <*><A, B>(fn: ((A) -> B)?, value: A?) -> B? {
//        guard let f = fn, let v = value else { return nil }
//        return f(v)
//    }
    
    func f6<G1, G2, G3>(p1: G1, p2: G2, p3: G3) {
        print(p1, p2, p3)
    }
    
    func curryF6<G1, G2, G3>(p1: G1) -> (G2) -> (G3) -> Void {
        return { p2 in
            return { p3 in
                print(p1, p2, p3)
                /* 其实也就是调用f6
                 self.f6(p1: p1, p2: p2, p3: p3) */
            }
        }
    }
    
    // 两参数函数柯里化，以此类推
    func currying<A, B, C>(_ f5: @escaping (A, B) -> C) -> (A) -> (B) -> C {
        return { a in
            return { b in
                return f5(a, b)
            }
        }
    }
    
    func f5<G1, G2>(p1: G1, p2: G2) {
        print(p1, p2)
    }
    // 柯里化：把一个接收多个参数的函数转化成一系列只接收单个参数的函数
    func curryF5<G1, G2>(p1: G1) -> (G2) -> Void {
//        func f55<G2>(p2: G2) {
//            print(p1, p2)
//        }
//        return f55(p2:)
        return { p2 in
            print(p1, p2)
        }
    }
    
}

extension ViewController {

    func f_() {
        view.addSubview(label)
        label.frame = CGRect(x: 60, y: 100, width: 100, height: 21)
    }
    
    func f4() {
        f_()
        //时间监听
        let observable = Observable<Int>.timer(.seconds(0),
                                               period: .seconds(1),
                                               scheduler: MainScheduler.instance)
        observable.map { "数值是\($0)" }
        .bind(to: label.rx.text)
        .disposed(by: bag)
    }
    
    func f3() {
        f_()
        let binder = Binder<String>(label) { label, value in
            label.text = value
        }
        Observable.just(1).map{ "数值是\($0)" }.subscribe(binder).dispose()
        Observable.just(1).map{ "数值是\($0)" }.bind(to: binder).dispose()
    }
    
    func f2() {
        let observer = AnyObserver<Int>.init { event in
            switch event {
            case .next(let data):
                print(data)
            case .completed:
                print("completed")
            case .error(let error):
                print("error", error)
            }
        }
        //Observable.just(1).describe(observer).dispose()
        Observable.just(1).subscribe(observer).dispose()
    }
    
    func f1() {
        //1. 触发事件
        var observable = Observable<Int>.create { observer in
            observer.onNext(1)
            observer.onCompleted()
            return Disposables.create()
        }
        // 等价于
        observable = Observable.just(1)
        observable = Observable.of(1)
        observable = Observable.from([1])

        observable = Observable<Int>.create { observer in
            observer.onNext(1)
            observer.onNext(2)
            observer.onNext(3)
            observer.onCompleted()
            return Disposables.create()
        }
        // 等价于
        observable = Observable.of(1, 2, 3)
        observable = Observable.from([1, 2, 3])
        
        //2. 订阅接收事件
        observable.subscribe { event in
            switch event {
            case .next(let value):
                print(value)
            case .completed:
                print("completed")
            case .error(let error):
                print("error", error)
            }
        }.dispose()
        
        // 订阅可观察序列
        observable.subscribe(onNext: {
            print("next", $0)
        }, onError: {
            print("error", $0)
        }, onCompleted: {
            print("completed")
        }, onDisposed: {
            print("dispose")
        }).dispose()
        
    }
    
    func f0() {
        //创建 Dictionary
        var strs = [Int: String]()
        var colors: [String: String] = ["red": "#e83f45", "yellow": "#ffe651"]
        strs[16] = "sixteen"

        //updateValue 这个方法会返回更新前的值
        if let oldValue = colors.updateValue("#e83f47", forKey: "red") {
            print("The old value for DUB was \(oldValue).")
        }

        //遍历
        for (color, value) in colors {
            print("\(color): \(value)")
        }

        //map
        let newColorValues = colors.map { "hex:\($0.value)" }
        print("\(newColorValues)")

        //mapValues 返回完整的新 Dictionary
        let newColors = colors.mapValues { "hex:\($0)" }
        print("\(newColors)")
        
        let fn = [0, 1, 2, 3]
        for i in fn.startIndex..<fn.endIndex {
            print(i)
        }
    }
}

//结构体基类
struct WY<Base> {
    let base: Base
    init(_ base: Base) {
        self.base = base
    }
}

//协议
protocol WYCompatible {}
//给协议扩展两个属性，一个是类一个是对象
extension WYCompatible {
//    static var wy: WY<Self>.Type {
//        get { WY<Self>.self }
//        set {}
//    }
    var wy: WY<Self> {
        get { WY(self) }
        set {}
    }
    
    func numberCount() -> Int {
        guard let string = self as? String else { return 0 }
        var count = 0
        for c in string where ("0"..."9").contains(c) {
            count += 1
        }
        return count
    }
}

extension String: WYCompatible {}

//给WY结构体扩展一个方法numberCount
extension WY where Base: ExpressibleByStringLiteral {
    func numberCount() -> Int {
        let string = base as! String
        var count = 0
        for c in string where ("0"..."9").contains(c) {
            count += 1
        }
        return count
    }
}

func test21() {
//    let wy = String.wy
//    print(wy)
    let s1: String = "123fdsf434"
//    let s2: NSString = "123fdsf434"
//    let s3: NSMutableString = "123fdsf434"
    print(s1.wy.numberCount())
    print(s1.numberCount())
//    print(s2.wy.numberCount())
//    print(s3.wy.numberCount())
    
}

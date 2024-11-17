
import Foundation

/*
 Hashable
 对于非NSObject的子类需要遵守给出哈希算法
 protocol Hashable: Equatable {
     var hashValue: Int { get }
 }
 与Equatable一样，swift中的基础类型都实现了Hashable
 注意：Hashable: Equatable
 */

//异常与错误



final class FC {
    final let p_a = ""
    final var p_b = ""
    
    final func f_a() {
        
    }
}


//从 WWDC 14 的 Keynote 上 Chris 的演示就能看出 Playground 异常强大，但是从本质来说 Playground 的想法其实非常简单，就是提供一个可以即时编辑的类似 REPL 的环境。
//
//class MyClass {
//    @objc func callMe() {
//        print("Hi")
//    }
//}
//let object = MyClass()

//import PlaygroundSupport //无效了
//PlaygroundPage.current.needsIndefiniteExecution = false

//Timer.scheduledTimer(timeInterval: 1, target: object, selector: #selector(MyClass.callMe), userInfo: nil, repeats: true)

let url = URL(string: "http://httpbin.org/get")!
let getTask = URLSession.shared.dataTask(with: url) {
    (data, response, error) -> Void in
    let dictionary = try! JSONSerialization.jsonObject(with: data!, options: [])

    print(dictionary)
}
getTask.resume()


import XCPlayground

var arr = [14, 11, 20, 1, 3, 9, 4, 15, 6, 19,
    2, 8, 7, 17, 12, 5, 10, 13, 18, 16]

func plot<T>(title: String, array: [T]) {
    for value in array {
        XCPCaptureValue(identifier: title, value: value)
    }
}

plot(title: "起始", array: arr)

func swap( x: inout Int, y: inout Int) {
    (x, y) = (y, x)
}

func bubbleSort<T: Comparable>( input: inout [T]) {

    for i in 0 ..< input.count - 1 {
        let i = input.count - i
        var didSwap = false
        for j in 0 ..< i - 1 {
            if input[j] > input[j + 1] {
                didSwap = true
                input.swapAt(j, j + 1)
            }
        }
        if !didSwap {
            break
        }

        plot(title: "第 \(input.count - (i - 1)) 次迭代", array: input)
    }
    plot(title: "结果", array: input)
}

bubbleSort(input: &arr)

extension Double {
    func format(f: String) -> String {
        return String(format: "%\(f)f", self)
    }
}

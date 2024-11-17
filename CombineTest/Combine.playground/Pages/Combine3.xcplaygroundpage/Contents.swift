import Combine
import Foundation

func example(_ desc: String, _ action:() -> Void) {
    print("--- \(desc) ---")
    action()
}

var subscriptions = Set<AnyCancellable>()

//Timer.publish(every: 1.0, on: .main, in: .common)
//    .autoconnect()
//    .scan(-1, { last, time in
//        print(last, time)
//        return last + 1
//    })
//    .sink { print("\($0) second has passed...") }
//    .store(in: &subscriptions)

//时间操作操作符(Time Manipulation Operators)
//时移值
//example("delay") {
//    let valuesPerSecond = 1.0
//    let delayInSeconds = 1.2
//
//    let sourcePublisher = PassthroughSubject<Date, Never>()
//    let delayedPublisher = sourcePublisher.delay(for: .seconds(delayInSeconds), scheduler: DispatchQueue.main)
//
//    let subscription = Timer
//        .publish(every: 1.0 / valuesPerSecond, on: .main, in: .common)
//        .autoconnect()
//        .subscribe(sourcePublisher)
//        .store(in: &subscriptions)
//
//    sourcePublisher
//        .sink {  print("sourcePublisher: \($0)") }
//        .store(in: &subscriptions)
//
//    delayedPublisher
//        .sink {  print("delayedPublisher: \($0)") }
//        .store(in: &subscriptions)
//}


//收集值
//example("collect") {
//    let valuesPerSecond = 1.0
//    let collectTimeStride = 3.0
//
//    let sourcePublisher = PassthroughSubject<Date, Never>()
//    let collectedPublisher = sourcePublisher
//        .collect(.byTime(DispatchQueue.main, .seconds(collectTimeStride)))
//
//    let subscription = Timer
//        .publish(every: 1.0 / valuesPerSecond, on: .main, in: .common)
//        .autoconnect()
//        .subscribe(sourcePublisher)
//        .store(in: &subscriptions)
//
//    sourcePublisher
//        .sink {  print("sourcePublisher: \($0)") }
//        .store(in: &subscriptions)
//
//    collectedPublisher
//        .sink {  print("collectedPublisher:\($0)") }
//        .store(in: &subscriptions)
//}


//推迟事件 防抖(Debounce)和节流(Throttle)
//example("debounce") {
//    let subject = PassthroughSubject<Int, Never>()
//    let debounced = subject.debounce(for: .seconds(0.5), scheduler: DispatchQueue.main)
//
//    subject
//        .sink {  print("subject: \($0)") }
//        .store(in: &subscriptions)
//
//    debounced
//        .sink {  print("debounced: \($0)") }
//        .store(in: &subscriptions)
//
//    let bounces:[(Int,TimeInterval)] = [
//        (0, 0),
//        (1, 0.3),   // 0.3s interval since last index
//        (2, 1),     // 0.7s interval since last index
//        (3, 1.3),   // 0.3s interval since last index
//        (4, 1.5),   // 0.2s interval since last index
//        (5, 2.1)    // 0.6s interval since last index
//    ]
//
//    for bounce in bounces {
//        DispatchQueue.main.asyncAfter(deadline: .now() + bounce.1) {
//            subject.send(bounce.0)
//        }
//    }
//}

//example("throttle") {
//    let subject = PassthroughSubject<Int, Never>()                                // false -> true
//    let throttled = subject.throttle(for: .seconds(1), scheduler: DispatchQueue.main, latest: false)
//
//    subject
//        .sink {  print("subject: \($0)") }
//        .store(in: &subscriptions)
//
//    throttled
//        .sink {  print("throttled: \($0)") }
//        .store(in: &subscriptions)
//
//    let bounces:[(Int,TimeInterval)] = [
//        (0, 0),
//        (1, 0.1),
//        (2, 0.5),
//        (3, 3.5),
//        (4, 3.9),
//        (5, 4.1),
//        (6, 4.4),
//    ]
//
//    for bounce in bounces {
//        DispatchQueue.main.asyncAfter(deadline: .now() + bounce.1) {
//            subject.send(bounce.0)
//        }
//    }
//}


//超时 要么发出 .finished ，要么发出自定义的错误
//example("timeout") {
//    enum TimeoutError: Error {
//        case timedOut
//    }
//
//    let subject = PassthroughSubject<Void, TimeoutError>()
//    let timedOutSubject1 = subject.timeout(.seconds(1), scheduler: DispatchQueue.main)
//    let timedOutSubject2 = subject.timeout(.seconds(1), scheduler: DispatchQueue.main, customError: { .timedOut })
//
//    timedOutSubject1
//        .sink(
//            receiveCompletion: { print("timedOutSubject1: \($0)") },
//            receiveValue: {  print("timedOutSubject1: \($0)") }
//        )
//        .store(in: &subscriptions)
//
//    timedOutSubject2
//        .sink(
//            receiveCompletion: { print("timedOutSubject2: \($0)") },
//            receiveValue: {  print("timedOutSubject2: \($0)") }
//        )
//        .store(in: &subscriptions)
//}


//时间测量
//example("measureInterval") {
//    let subject = PassthroughSubject<Int, Never>()
//    let measureSubject = subject.measureInterval(using: DispatchQueue.main)
//    //如果我们进行以下更改，使用 RunLoop:
//    let measureSubject2 = subject.measureInterval(using: RunLoop.main)
//
//    subject.sink { print("emitted: \($0)") }
//    .store(in: &subscriptions)
//
//    measureSubject.sink { print("Measure emitted: \(Double($0.magnitude) / 1_000_000_000.0)") }
//    .store(in: &subscriptions)
//
//    //则无需进行上述 Double($0.magnitude) / 1_000_000_000.0 的转换：
//    measureSubject2.sink { print("Measure2emitted: \(Double($0.magnitude))") }
//    .store(in: &subscriptions)
//
//    let bounces:[(Int,TimeInterval)] = [
//        (0, 0),
//        (1, 0.1),
//        (2, 0.5),
//        (3, 3.5),
//        (4, 3.9),
//        (5, 4.1),
//        (6, 4.4),
//    ]
//
//    for bounce in bounces {
//        DispatchQueue.main.asyncAfter(deadline: .now() + bounce.1) {
//            subject.send(bounce.0)
//        }
//    }
//}


//序列操作符(Sequence Operators)
//寻找值
// min() max()
//example("min") {
//    let publisher = [1, -5, 10, 0].publisher
//    publisher
//        .print("publisher: ")
//        .min()
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print("Lowest value is \($0)") })
//        .store(in: &subscriptions)
//}
//example("min non-Comparable") {
//    let publisher =  ["12345",
//                     "ab",
//                     "!!@@##$$"]
//        .map { Data($0.utf8) }
//        .publisher
//        .print("publisher")
//        .min(by: { $0.count < $1.count }) // 自定义比较操作
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { data in
//            let string = String(data: data, encoding: .utf8)!
//            print("Smallest data is \(string), \(data.count) bytes")
//        })
//        .store(in: &subscriptions)
//}


// first() last()
//example("first and last") {
//    let publisher = [1, 2, 3, 4].publisher
//
//    publisher
//        .print("first: ")
//        .first()
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print("First value is \($0)") })
//        .store(in: &subscriptions)
//
//    publisher
//        .print("last: ")
//        .last()
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print("Last value is \($0)") })
//        .store(in: &subscriptions)
//}
//example("first and last where") {
//    let publisher = [1, 2, 3, 4].publisher
//
//    publisher
//        .print("first: ")
//        .first(where: { $0 % 2 == 0 })
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print("First value is \($0)") })
//        .store(in: &subscriptions)
//
//    publisher
//        .print("last: ")
//        .last(where: { $0 % 3 == 0 })
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print("Last value is \($0)") })
//        .store(in: &subscriptions)
//}


// output(at:) output(in:)
//example("output") {
//    let publisher = [0, 1, 2, 3, 4].publisher
//
//    publisher
//        .print("output at: ")
//        .output(at: 1)
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print($0) })
//        .store(in: &subscriptions)
//
//    publisher
//        .print("output in: ")
//        .output(in: 1...3)
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}


//查询值
// count()
//example("count") {
//    let publisher = [1, 2, 3, 4].publisher
//
//    publisher
//        .print("publisher")
//        .count()
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}


// contains(_:) contains(where:)
//example("contains") {
//    let publisher = [1, 2, 3, 4].publisher
//
//    publisher
//        .print("publisher")
//        .contains(3)
//        .sink(receiveCompletion: { print("completion", $0) },
//            receiveValue: { print("value",$0) })
//        .store(in: &subscriptions)
//
//    publisher
//        .print("publisher")
//        .contains(where: { $0 % 5 == 0 })
//        .sink(receiveCompletion: { print("completion", $0) },
//            receiveValue: { print("value", $0) })
//        .store(in: &subscriptions)
//}


// allSatisfy(_:)
//example("allSatisfy") {
//    let publisher = stride(from: 0, to: 5, by: 2).publisher
//    publisher
//        .print("publisher")
//        .allSatisfy { $0 % 2 == 0 }
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { allEven in
//            print(allEven ? "All numbers are even" : "Something is odd...")
//        })
//        .store(in: &subscriptions)
//
//    publisher
//        .print("publisher")
//        .allSatisfy { $0 % 3 == 0 }
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}


// reduce(_:_:)
//example("reduce") {
//    let publisher = ["He", "llo", " ", "Wo", "rld", "!"].publisher
//    publisher
//        .print("publisher")
//        .reduce("") { accumulator, value in
//            accumulator + value
//        }
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print("Reduced into: \($0)") })
//        .store(in: &subscriptions)
//}
//reduce 的第二个参数是一个闭包，它接受两个某种类型的值并返回一个相同类型的值。
//在 Swift 中，+ 也是一个匹配该签名的函数，我们完全可以改写代码：
example("reduce") {
    let publisher = ["He", "llo", " ", "Wo", "rld", "!"].publisher
    publisher
        .print("publisher")
        .reduce("", +)
        .sink(receiveValue: { print("Reduced into: \($0)") })
        .store(in: &subscriptions)
}

import Foundation
import Combine

func example(_ desc: String, _ action:() -> Void) {
    print("--- \(desc) ---")
    action()
}
var subscriptions = Set<AnyCancellable>()
//example("Collect") {
//    ["A", "B", "C", "D", "E"]
//        .publisher
//        .sink { print($0) }
//            receiveValue: { print($0) }
//        .store(in: &subscriptions)
//}
//example("Collect") {
//    ["A", "B", "C", "D", "E"]
//        .publisher.collect()
//        .sink { print($0) }
//            receiveValue: { print($0) }
//        .store(in: &subscriptions)
//}
//example("Collect") {
//    ["A", "B", "C", "D", "E"]
//        .publisher.collect(2) //集合值
//        .sink { print($0) }
//            receiveValue: { print($0) }
//        .store(in: &subscriptions)
//}
//example("map") {
//    let formatter = NumberFormatter()
//    formatter.numberStyle = .spellOut
//    [9, 99, 999, 9999].publisher
//        .map {
//            formatter.string(for: NSNumber(value: $0)) ?? ""
//        }
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("map & keyPath") {
//    struct Persion {
//        var name: String
//        var height: Float
//        var weight: Float
//    }
//    let publisher = PassthroughSubject<Persion, Never>()
//    publisher
//        .map(\.name, \.height, \.weight) //映射转换值
//        .map { "\($0)'s height is \($1) cm and weight is \($2) kg." }
//        .sink { print($0) }
//        .store(in: &subscriptions)
//    publisher.send(.init(name: "A", height: 180, weight: 80))
//    publisher.send(.init(name: "B", height: 170, weight: 60))
//}
//example("tryMap") {
//    Just("Path")
//        .tryMap { try FileManager.default.contentsOfDirectory(atPath: $0) }
//        .sink { print($0) }
//            receiveValue: { print($0) }
//        .store(in: &subscriptions)
//}
//example("flatMap") {
//    [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
//        .publisher
//        .collect()
//        .flatMap { codes in
//            Just(codes.map { String(UnicodeScalar($0)) }.joined())
//        } //扁平化，展平
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("flatMap & maxPublishers") {
//    let publisher = PassthroughSubject<AnyPublisher<String, Never>, Never>()
//    publisher
//        .flatMap(maxPublishers: .max(2)) { $0 } //扁平化，展平
//        .sink { print($0) }
//            receiveValue: { print($0) }
//        .store(in: &subscriptions)
//
//    let p0 = CurrentValueSubject<String, Never>("p0 - 0")
//    let p1 = CurrentValueSubject<String, Never>("p1 - 0")
//    let p2 = CurrentValueSubject<String, Never>("p2 - 0")
//
//    publisher.send(p0.eraseToAnyPublisher())
//    publisher.send(p1.eraseToAnyPublisher())
//    publisher.send(p2.eraseToAnyPublisher())
//
//    p0.send("p0 - 1")
//    p1.send("p1 - 1")
//    p2.send("p2 - 1")
//    p0.send("p0 - 2")
//    p1.send("p1 - 2")
//    p2.send("p2 - 2")
//}
//example("replaceNil") {
//    [Optional(1), nil, Optional(3)].publisher
//        .eraseToAnyPublisher()
//        .replaceNil(with: 2)
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("replaceNil") {
//    [1, nil, 3].publisher
//        .eraseToAnyPublisher()
//        .replaceNil(with: 2)
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("replaceEmpty") {
//    let empty = Empty<Int, Never>()
//    empty
//        .replaceEmpty(with: 1)
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("scan") {
//    [1, 2, 3]
//        .publisher
//        .scan(0) { latest, current in
//            print(latest, current)
//            return latest + current
//        } //值的增量输出
//        .sink(receiveValue: { print($0)})
//        .store(in: &subscriptions)
//}
//example("filter") {
//    (1...10)
//        .publisher
//        .filter { $0.isMultiple(of: 3) } //挑选出符合规则的
//        .sink(receiveValue: { print("\($0) is a multiple of 3!")})
//        .store(in: &subscriptions)
//}
//example("removeDuplicates") {
//    ["a", "b", "b", "b", "c", "d", "d", "e", "f", "f"]
//        .publisher
//        .removeDuplicates() //过滤重复值
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("compactMap") {
//    ["a", "1", "2", "b", "3", "4", "c"]
//        .publisher
//        .compactMap { Int($0) } //过滤空值
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("ignoreOutput") {
//    (1...100)
//        .publisher
//        .ignoreOutput() //全部忽略
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("first(where:)") {
//     (1...5)
//        .publisher
//        .first(where: { $0 % 2 == 0 }) //查找值
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("last(where:)") {
//     (1...5)
//        .publisher
//        .last(where: { $0 % 2 == 0 }) //查找值
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("first(where:)") {
//     (1...5)
//        .publisher
//        .print() //一旦 first(where:) 找到匹配的值，它就会通过 Subscription 发送取消，上游停止发出值。可以添加 print() 验证：
//        .first(where: { $0 % 2 == 0 })
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("dropFirst") {
//    (1...5)
//        .publisher
//        .dropFirst(3) //丢弃值
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("drop(while:)") {
//    (1...5)
//        .publisher
//        .drop(while: { $0 % 4 != 0 }) //直到第一次满足该条件后，值就可以通过，且后面的值都会通过
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("drop(while:)") {
//    (1...5)
//        .publisher
//        .drop(while: {
//            print("Checking \($0)") //闭包在满足条件后将不再执行
//            return $0 % 4 != 0
//        })
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("drop(untilOutputFrom:)") {
//    let isReady = PassthroughSubject<Void, Never>()
//    let publisher = PassthroughSubject<Int, Never>()
//
//    publisher //会跳过 Publisher 发出的任何值
//        .drop(untilOutputFrom: isReady) //直到参数 untilOutputFrom 的 Publisher 开始发出值
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//
//    (1...5).forEach { num in
//        publisher.send(num)
//        if num == 3 {
//            isReady.send()
//        }
//    }
//}
//example("prefix") {
//    (1...5)
//        .publisher
//        .prefix(2) //限制值
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("prefix(while:)") {
//    (1...5)
//        .publisher
//        .prefix(while: { $0 < 3 })
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("prefix(untilOutputFrom:)") {
//    let isReady = PassthroughSubject<Void, Never>()
//    let publisher = PassthroughSubject<Int, Never>()
//
//    publisher
//        .prefix(untilOutputFrom: isReady)
//        .sink(receiveCompletion: { print($0) },
//              receiveValue: { print($0) })
//        .store(in: &subscriptions)
//
//    (1...5).forEach { num in
//        publisher.send(num)
//        if num == 2 {
//            isReady.send()
//        }
//    }
//}
//example("prepend") {
//    [4, 5]
//        .publisher
//        .prepend(1, 2, 3) //前置
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("prepend") {
//    [4, 5]
//        .publisher
//        .prepend(1, 2, 3)
//        .prepend(-1, 0) //多次前置
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("prepend(Sequence)") {
//    [7, 8].publisher
//        .prepend([5, 6])
//        .prepend(Set(3...4))
//        .prepend(stride(from: 0, to: 3, by: 1))
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("prepend(Publisher)") {
//    let publisher1 = [3, 4].publisher
//    let publisher2 = [1, 2].publisher
//    publisher1
//        .prepend(publisher2)
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("prepend(Publisher) V2") {
//    let publisher1 = [3, 4].publisher
//    let publisher2 = PassthroughSubject<Int, Never>()
//    publisher1
//        .prepend(publisher2)
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//    publisher2.send(1)
//    publisher2.send(2) //3，4不会发出
//}
//example("prepend(Publisher) V2") {
//    let publisher1 = [3, 4].publisher
//    let publisher2 = PassthroughSubject<Int, Never>()
//    publisher1
//        .prepend(publisher2)
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//    publisher2.send(1)
//    publisher2.send(2)
//    publisher2.send(completion: .finished) //publisher2 结束 publisher1 才会发出
//}
//example("append") {
//    [1, 2, 3]
//        .publisher
//        .append(4, 5) //追加
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("append(Sequence)") {
//    [1, 2, 3]
//        .publisher
//        .append([4, 5])
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}
//example("append(Publisher)") {
//    let publisher1 = [1, 2].publisher
//    let publisher2 = [3, 4].publisher
//    publisher1
//        .append(publisher2) //同样需要注意，只有前一个 Publisher 发布完成事件，才能追加另一个 Publisher。
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}


//其他高级组合操作符

//switchToLatest()
//example("switchToLatest") {
//    let publishers = PassthroughSubject<PassthroughSubject<Int, Never>, Never>()
//    let numbers1 = PassthroughSubject<Int, Never>()
//    let numbers2 = PassthroughSubject<Int, Never>()
//    let numbers3 = PassthroughSubject<Int, Never>()
//
//    publishers
//        .switchToLatest()
//        .sink(
//            receiveCompletion: { print($0) },
//            receiveValue: { print($0) }
//        )
//        .store(in: &subscriptions)
//
//    publishers.send(numbers1)
//    numbers1.send(1)
//    numbers1.send(2)
//
//    publishers.send(numbers2)
//    numbers1.send(3)
////    numbers1.send(completion: .finished)
//    numbers2.send(4)
//    numbers2.send(5)
//
//    publishers.send(numbers3)
////    numbers2.send(6)
//    numbers2.send(completion: .finished)
//    numbers3.send(7)
//    numbers3.send(8)
//    numbers3.send(9)
//    numbers3.send(completion: .finished)
//
//    publishers.send(completion: .finished)
//}

//merge(with:)
//example("merge(with:)") {
//    let publisher1 = PassthroughSubject<Int, Never>()
//    let publisher2 = PassthroughSubject<Int, Never>()
//
//    publisher1
//        .merge(with: publisher2)
//        .sink(receiveCompletion: { print($0) },
//            receiveValue: { print($0) })
//        .store(in: &subscriptions)
//
//    publisher1.send(1)
//    publisher1.send(2)
//    publisher2.send(3)
//    publisher1.send(4)
//    publisher1.send(completion: .finished)
//    publisher2.send(5)
//    publisher2.send(completion: .finished)
//}

//combineLatest(_:_:)
//example("combineLatest") {
//    let publisher1 = PassthroughSubject<Int, Never>()
//    let publisher2 = PassthroughSubject<String, Never>()
//
//    publisher1
//        .combineLatest(publisher2)
//        .sink(
//            receiveCompletion: { print($0) },
//            receiveValue: { print("P1: \($0), P2: \($1)") }
//        )
//        .store(in: &subscriptions)
//
//    publisher1.send(1)
//    publisher1.send(2)
//
//    publisher2.send("a")
//    publisher2.send("b")
//
//    publisher1.send(3)
//    publisher1.send(completion: .finished)
//
//    publisher2.send("c")
//    publisher2.send(completion: .finished)
//}

//zip(_:)
example("zip") {
    let publisher1 = PassthroughSubject<Int, Never>()
    let publisher2 = PassthroughSubject<String, Never>()

    publisher1
        .zip(publisher2)
        .sink(receiveCompletion: { print($0) },
            receiveValue: { print("P1: \($0), P2: \($1)") })
        .store(in: &subscriptions)

    publisher1.send(1)
    publisher1.send(2)

    publisher2.send("a")
    publisher2.send("b")

    publisher1.send(3)
    publisher1.send(completion: .finished)

    publisher2.send("c")
    publisher2.send("d")
    publisher2.send(completion: .finished)
}

import Foundation
import Combine

//extension Array {
//
//    subscript(index: Int) -> Element {
//        if endIndex > index {
//
//        }
//        fatalError("out of range")
//    }
//}


//let center = NotificationCenter.default
//let myNotification = Notification.Name("MyNotification")

//let publisher = center.publisher(for: myNotification, object: nil)
//let observer = center.addObserver(forName: myNotification, object: nil, queue: nil) { notification in
//    print("Notification received!")
//}

//center.post(name: myNotification, object: nil)
//center.removeObserver(observer)


//let center = NotificationCenter.default
//let myNotification = Notification.Name("MyNotification")
//
//let publisher = center.publisher(for: myNotification, object: nil)
//let subscription = publisher
//    .sink { _ in
//        print("Notification received from a publisher!")
//    }
//
//center.post(name: myNotification, object: nil)
//subscription.cancel()


//let subscription = publisher.sink { noti in
//    print("sink noti", noti)
//}


//let just = Just("Hello, Combine!")
//_ = just
//    .sink(
//        receiveCompletion: {
//            print("Received completion: ", $0)
//        },
//        receiveValue: {
//            print("Received value: ", $0)
//        })

//_ = just
//    .sink(
//        receiveCompletion: {
//            print("Received completion (another): ", $0)
//        },
//        receiveValue: {
//            print("Received value (another): ", $0)
//        })



//let publisher = Just("just")
//
//let subscription = publisher.sink { complete in
//    print(complete)
//} receiveValue: { noti in
//    print(noti)
//}

//subscription.cancel()


//let object = MyObject()

//let publisher = ["hello", "combine"].publisher

//publisher.assign(to: \.value, on: object)

//class MyObject {
//    var subscriptions = Set<AnyCancellable>()
//
//    var value: String = "" {
//        willSet {
//            print(newValue)
//        }
//    }
//
//    @Published var pp = 0
//
//    init() {
//        ["A", "B", "C"].publisher.assign(to: \.value, on: self).store(in: &subscriptions)
//        //这里，使用 assign(to: \.word, on: self) 并存储生成的 AnyCancellable，这会导致引用循环：
//        //MyObject 类实例持有生成的 AnyCancellable，而生成的 AnyCancellable 同样持有MyObject 类实例。
//        //此时用 assign(to:) 替换 assign(to:on:) 可以防止引入这个问题。
//    }
//}

//let object = MyObject()
//
//object.$pp.sink {
//    print($0)
//}
//
//(1...4).publisher.assign(to: &object.$pp)


//final class IntSubscriber: Subscriber {
//    typealias Input = Int
//    typealias Failure = Never
//
//    func receive(subscription: Subscription) {
//        subscription.request(.max(2))
//    }
//
//    func receive(_ input: Int) -> Subscribers.Demand {
//        print("Received value: ", input)
////        return .max(1)
//        return .none
//    }
//
//    func receive(completion: Subscribers.Completion<Never>) {
//        print("Received completion: ", completion)
//    }
//}
//
//let publisher = (1...5).publisher
//let subscriber = IntSubscriber()
//publisher.subscribe(subscriber)
////publisher.receive(subscriber: subscriber)


//func futureIncrement(
//    integer: Int,
//    afterDelay delay: TimeInterval
//) -> Future<Int, Never> {
//    Future<Int, Never> { promise in
//        print("future")
//        DispatchQueue.global().asyncAfter(deadline: .now() + delay) {
//            print("promise")
//            promise(.success(integer + 1))
//        }
//    }
//}

//var subscriptions = Set<AnyCancellable>()
//let future = futureIncrement(integer: 1, afterDelay: 3)
//future
//    .sink(receiveCompletion: { print($0) },
//          receiveValue: { print($0) })
//    .store(in: &subscriptions)
//
//future
//    .sink(receiveCompletion: { print("Second: ", $0) },
//          receiveValue: { print("Second: ", $0) })
//    .store(in: &subscriptions)


//enum MyError: Error {
//    case test
//}
//
//final class StringSubscriber: Subscriber {
//    typealias Input = String
//    typealias Failure = MyError
//
//    func receive(subscription: Subscription) {
//        subscription.request(.max(2))
//    }
//
//    func receive(_ input: String) -> Subscribers.Demand {
//        print("Received value: ", input)
//        return input == "Combine" ? .max(1) : .none
//    }
//
//    func receive(completion: Subscribers.Completion<MyError>) {
//        print("Received completion: ", completion)
//    }
//}
//
//let subject = PassthroughSubject<String, MyError>()
//let subscriber = StringSubscriber()
//subject.subscribe(subscriber)
//let subscription = subject
//    .sink(
//        receiveCompletion: { completion in
//            print("Received completion (sink): ", completion)
//        },
//        receiveValue: { value in
//            print("Received value (sink): ", value)
//        })
//
//subject.send("Hello")
//subject.send("Combine")
//
////subject.subscribe(subscriber)
////subject.receive(subscriber: subscriber)
//
//subscription.cancel()
//subject.send("I am coming again.")
//subject.send(completion: .failure(MyError.test))
//subject.send(completion: .finished)
//subject.send("Is there anyone now?")


//var subscriptions = Set<AnyCancellable>()
//let subject = CurrentValueSubject<Int, Never>(0)
//subject.eraseToAnyPublisher()
//subject.print()
//    .sink(receiveValue: { print("first subscription", $0) })
//    .store(in: &subscriptions)
////print(subject.value)
//subject.send(1)
////print(subject.value)
//subject.send(2)
////print(subject.value)
//subject.value = 3
//
//subject.print()
//    .sink(receiveValue: { print("Second subscription: ", $0) })
//    .store(in: &subscriptions)
//
//subject.send(completion: .finished)


//final class IntSubscriber: Subscriber {
//    typealias Input = Int
//    typealias Failure = Never
//
//    func receive(subscription: Subscription) {
//        subscription.request(.max(2))
//    }
//
//    func receive(_ input: Int) -> Subscribers.Demand {
//        print("Received value", input)
//        switch input {
//        case 1:
//            return .max(2)
//        case 3:
//            return .max(1)
//        default:
//            return .none
//        }
//    }
//
//    func receive(completion: Subscribers.Completion<Never>) {
//        print("Received completion", completion)
//    }
//}
//let subscriber = IntSubscriber()
//let subject = PassthroughSubject<Int, Never>()
//subject.eraseToAnyPublisher()
//subject.subscribe(subscriber)
//subject.send(1)
//subject.send(2)
//subject.send(3)
//subject.send(4)
//subject.send(5)
//subject.send(6)
//subject.send(7)


//let subject = CurrentValueSubject<Int, Never>(0)
//Task {
//    for await element in subject.values {
//        print("Element: \(element)")
//    }
//    print("Completed.")
//}
//subject.send(1)
//subject.send(2)
//subject.send(3)
//subject.send(completion: .finished)



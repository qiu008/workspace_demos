import Combine
import Foundation

//错误处理

func example(_ desc: String, _ action:() -> Void) {
    print("--- (desc) ---")
    action()
}

var subscriptions = Set<AnyCancellable>()

//example("Just") {
//    Just("Hello")
//}

//example("Just") {
//    Just("Hello")
//        .sink(receiveValue: { print($0) })
//        .store(in: &subscriptions)
//}

//example("setFailureType") {
//  Just("Hello")
//    .setFailureType(to: Error.self)
//    .eraseToAnyPublisher()
//}

enum MyError: Error {
    case ohNo
}

//example("setFailureType") {
//    Just("Hello")
//        .setFailureType(to: MyError.self)
//        .sink(
//            receiveCompletion: { completion in
//                switch completion {
//                case .failure(.ohNo):
//                    print("Finished with OhNo!")
//                case .finished:
//                    print("Finished successfully!")
//                }
//            },
//            receiveValue: { value in
//                print("Got value: (value)")
//            }
//        )
//        .store(in: &subscriptions)
//}

//example("assign(to:on:)") {
//    class Person {
//        var name = "Unknown"
//    }
//    let person = Person()
//    print(person.name)
//    Just("Layer")
//        //.setFailureType(to: Error.self)
//        .handleEvents(
//            receiveCompletion: { _ in
//                print(person.name)
//            }
//        )
//        .assign(to: \.name, on: person)
//        .store(in: &subscriptions)
//}

//example("assign(to:)") {
//
//  class MyViewModel: ObservableObject {
//    @Published var currentDate = Date()
//    init() {
//      Timer.publish(every: 1, on: .main, in: .common)
//        .autoconnect()
//        .prefix(3)
//        //.assign(to: \.currentDate, on: self)
//        //.store(in: &subscriptions)
//        .assign(to: &$currentDate)
//    }
//  }
//
//  let vm = MyViewModel()
//  vm.$currentDate
//    .sink(receiveValue: { print($0) })
//    .store(in: &subscriptions)
//}

example("assertNoFailure") {
  Just("Hello")
    .setFailureType(to: MyError.self)
    .assertNoFailure()
    .sink(receiveValue: { print("Got value: \($0) ")})
    .store(in: &subscriptions)
}



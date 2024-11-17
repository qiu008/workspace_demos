import Combine
import Foundation

func example(_ desc: String, _ action:() -> Void) {
    print("--- \(desc) ---")
    action()
}

var subscriptions = Set<AnyCancellable>()

//example("URLSession") {
//    guard let url = URL(string: "https://random-data-api.com/api/v2/appliances") else {
//        return
//    }
//    URLSession.shared
//        .dataTaskPublisher(for: url)
//        .sink(receiveCompletion: { completion in
//            if case .failure(let err) = completion {
//                print("Retrieving data failed with error \(err)")
//            }
//        }, receiveValue: { data, response in
//            print("Retrieved data of size \(data.count), response = \(response)")
//        })
//        .store(in: &subscriptions)
//}

// Codable
//example("URLSession") {
//    guard let url = URL(string: "https://random-data-api.com/api/v2/appliances") else {
//        return
//    }
//    URLSession.shared
//        .dataTaskPublisher(for: url)
//        .tryMap({ data, response in
//            try JSONDecoder().decode([String:String].self, from: data)
//        })
//        .sink(receiveCompletion: { completion in
//            if case .failure(let err) = completion {
//                print("Retrieving data failed with error \(err)")
//            }
//        }, receiveValue: { data in
//            print("Retrieved data: \(data)")
//        })
//        .store(in: &subscriptions)
//}

// decode
//example("URLSession") {
//    guard let url = URL(string: "https://random-data-api.com/api/v2/appliances") else {
//        return
//    }
//    URLSession.shared
//        .dataTaskPublisher(for: url)
//        .map(\.data)
//        .decode(type: [String:String].self, decoder: JSONDecoder())
//        .sink(receiveCompletion: { completion in
//            if case .failure(let err) = completion {
//                print("Retrieving data failed with error \(err)")
//            }
//        }, receiveValue: { data in
//            print("Retrieved data: \(data)")
//        })
//        .store(in: &subscriptions)
//}

// multicast connect
//example("connect") {
//    guard let url = URL(string: "https://random-data-api.com/api/v2/appliances") else {
//        return
//    }
//    let publisher = URLSession.shared
//        .dataTaskPublisher(for: url)
//        .map(\.data)
//        .multicast { PassthroughSubject<Data, URLError>() }
//
////    let subscription1 =
//    publisher
//        .sink(receiveCompletion: { completion in
//            if case .failure(let err) = completion {
//                print("Sink1 Retrieving data failed with error \(err)")
//            }
//        }, receiveValue: { object in
//            print("Sink1 Retrieved object \(object)")
//        })
//        .store(in: &subscriptions)
//
////    let subscription2 =
//    publisher
//        .sink(receiveCompletion: { completion in
//            if case .failure(let err) = completion {
//                print("Sink2 Retrieving data failed with error \(err)")
//            }
//        }, receiveValue: { object in
//            print("Sink2 Retrieved object \(object)")
//        })
//        .store(in: &subscriptions)
//
////    let subscription =
//    publisher.connect().store(in: &subscriptions)
//}

// debug
//struct TimeLogger: TextOutputStream {
//    func write(_ string: String) {
//        print("write", string)
//    }
//}
//class TimeLogger: TextOutputStream {
//    private var previous = Date()
//    private let formatter = NumberFormatter()
//
//    init() {
//        formatter.maximumFractionDigits = 5
//        formatter.minimumFractionDigits = 5
//    }
//
//    func write(_ string: String) {
//        let trimmed = string.trimmingCharacters(in: .whitespacesAndNewlines)
//        guard !trimmed.isEmpty else { return }
//        let now = Date()
//        print("+\(formatter.string(for: now.timeIntervalSince(previous))!)s: \(string)")
//        previous = now
//    }
//}
//let subscription = (1...3).publisher
////  .print("print")
//    .print("p", to: TimeLogger())
//    .sink { _ in }

//执行副作用
//example("handleEvents", {
//    guard let url = URL(string: "https://random-data-api.com/api/v2/appliances") else {
//        return
//    }
//    URLSession.shared
//        .dataTaskPublisher(for: url)
//        .handleEvents(receiveSubscription: { _ in
//            print("Network request will start")
//        }, receiveOutput: { _ in
//            print("Network request data received")
//        }, receiveCancel: {
//            print("Network request cancelled")
//        })
//        .map(\.data)
//        .decode(type: [String:String].self, decoder: JSONDecoder())
//        .sink(receiveCompletion: { completion in
//            print("\(completion)")
//        }, receiveValue: { data in
//            print("\(data)")
//        })
//        //.store(in: &subscriptions) 忘记保留 AnyCancellable。因此 Subscription 开始但立即被取消。
//})

//使用 Debugger Operator
//breakpointOnError()
//breakpoint（receiveSubscription:receiveOutput:receiveCompletion:)
//    .breakpoint(receiveOutput: { value in
//      return value > 0 && value < 5
//    })

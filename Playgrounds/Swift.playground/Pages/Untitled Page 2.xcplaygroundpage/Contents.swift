//: [Previous](@previous)

import Foundation
import Combine

var storage = Set<AnyCancellable>()
let url = URL(string:"https://jsonplaceholder.typicode.com/posts/1")!
URLSession.shared.dataTaskPublisher(for: url).map { tuple -> Data in  //tuple的类型为(data:Data,response:URLResponse)
//    print("tuple:\(tuple)")
    return tuple.data
}.sink { completion in
    print(completion)
} receiveValue: { data in
    print(data.description)
    guard let resonpseStr = String(data: data, encoding: .utf8) else { return }
    print("数据打印data:\(resonpseStr)")
}.store(in: &storage)

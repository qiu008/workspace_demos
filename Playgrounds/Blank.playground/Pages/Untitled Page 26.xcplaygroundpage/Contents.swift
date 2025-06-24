//: [Previous](@previous)

import Foundation
import Combine

var cancellables = Set<AnyCancellable>()

//let currentSubject: CurrentValueSubject<Bool, Never> = .init(false)
//currentSubject.sink { value in
//    print("qyh_cur", value)
//}.store(in: &cancellables)
//currentSubject.send(true)
////currentSubject.send(completion: .finished)
//currentSubject.send(true)
////currentSubject.send(completion: .finished)
//currentSubject.send(true)
////currentSubject.send(completion: .finished)
//currentSubject.sink { value in
//    print("qyh_cur_", value)
//}.store(in: &cancellables)
//currentSubject.send(true)
//currentSubject.send(true)
//currentSubject.send(true)
///
let passthroughSubject: PassthroughSubject<Bool, Never> = .init()
passthroughSubject.sink { value in
    print("qyh_pass", value)
}.store(in: &cancellables)
passthroughSubject.send(true)
//passthroughSubject.send(completion: .finished)
passthroughSubject.send(true)
//passthroughSubject.send(completion: .finished)
passthroughSubject.send(true)
//passthroughSubject.send(completion: .finished)
passthroughSubject.sink { value in
    print("qyh_pass_", value)
}.store(in: &cancellables)
passthroughSubject.send(true)
passthroughSubject.send(true)
passthroughSubject.send(true)


let str: String = " 2 2 3 "
let astr = str.trimmingCharacters(in: .whitespaces)

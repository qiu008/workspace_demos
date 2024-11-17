//: [Previous](@previous)

import Foundation

struct DoublingIterator: IteratorProtocol {
    var value: Int
    var limit: Int? = nil

    mutating func next() -> Int? {
        if let l = limit, value > l {
            return nil
        } else {
            let current = value
            value *= 2
            return current
        }
    }
}

var doublingIterator = DoublingIterator(value: 1, limit: 1024)
//while let value = doublingIterator.next() {
//    print(value)
//}

struct DoublingSequence: Sequence {
    var value: Int
    var limit: Int? = nil

    func makeIterator() -> DoublingIterator {
        DoublingIterator(value: value, limit: limit)
    }
}

let doubler = DoublingSequence(value: 1, limit: 1024)
//for value in doubler {
//    print(value)
//}

//print(doubler.contains { $0 == 512 }) // true
//print(doubler.reduce(0, +)) // 2047

let lock = NSLock()

func one() {
    defer {
        lock.unlock()
        print("one unlock")
    }
    lock.lock()
    print("one lock")
    two(acuqireLock: false)
//    lock.unlock()
//    print("one unlock")
}
func two(acuqireLock: Bool = true) {
    defer {
        lock.unlock()
        print("two unlock")
    }
    if acuqireLock {
        lock.lock()
        print("two lock")
    }
    print("two")
}
//one()
two()




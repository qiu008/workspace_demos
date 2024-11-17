//: [Previous](@previous)

import Foundation

let sq = DispatchQueue(label: "SCGCD") //默认初始化就是串行队列
let serialQueue = DispatchQueue(label: "SCGCD", attributes: .init(rawValue: 0))
let cq = DispatchQueue(label: "Mazy", attributes: .concurrent)

/*
 sync：在当前线程做任务，不开启新线程
 async：开启新线程，在新开的线程(可能多个看系统支撑)做任务
 */

//sq.sync {
//    let a = 0..<100
//    a.forEach {
//        print("sq", Thread.current, "a", $0)
//    }
//}
//sq.async {
//    let b = 0..<100
//    b.forEach {
//        print("sq", Thread.current, "b", $0)
//    }
//}

//serialQueue.async {
//    let a = 0..<100
//    a.forEach {
//        print("serialQueue", Thread.current, "a", $0)
//    }
//}
//serialQueue.async {
//    let b = 0..<100
//    b.forEach {
//        print("serialQueue", Thread.current, "b", $0)
//    }
//}

//cq.async {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "a", $0)
//    }
//}
//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "b", $0)
//    }
//}
//cq.async {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "c", $0)
//    }
//}
//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "d", $0)
//    }
//}
//cq.async {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "e", $0)
//    }
//}
//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "f", $0)
//    }
//}
//cq.async {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "g", $0)
//    }
//}

//cq.sync {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "h", $0)
//    }
//}
//cq.sync {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "i", $0)
//    }
//}

//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "j", $0)
//    }
//}
//cq.async {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "k", $0)
//    }
//}
//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "l", $0)
//    }
//}
//cq.async {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "m", $0)
//    }
//}
//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "n", $0)
//    }
//}
//cq.async {
//    let a = 0..<100
//    a.forEach {
//        print("cq", Thread.current, "o", $0)
//    }
//}
//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "p", $0)
//    }
//}


let oq = OperationQueue()
//OperationQueue.defaultMaxConcurrentOperationCount
//oq.maxConcurrentOperationCount = 3 //-1
oq.addOperation {
    let b = 0..<100
    b.forEach {
        print("cq", Thread.current, "n", $0)
    }
}
oq.addOperation {
    let a = 0..<100
    a.forEach {
        print("cq", Thread.current, "o", $0)
    }
}
print("0")
//dispatch_barrier_async
oq.addBarrierBlock {
    let b = 0..<100
    b.forEach {
        print("cq", Thread.current, "p", $0)
    }
}
oq.addOperation {
    let b = 0..<100
    b.forEach {
        print("cq", Thread.current, "q", $0)
    }
}
//oq.cancelAllOperations()
print("1")
////addBarrierBlock不阻塞当前线程

//Thread.current

let smf = DispatchSemaphore(value: 0)
//smf.wait()
//cq.async {
//    let b = 0..<100
//    b.forEach {
//        print("cq", Thread.current, "p", $0)
//    }
//    smf.signal()
//}
//smf.signal()




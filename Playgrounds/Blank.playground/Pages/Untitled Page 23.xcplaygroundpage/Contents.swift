//: [Previous](@previous)

import UIKit

var greeting = "Hello, playground"

//: [Next](@next)
//UIFont.familyNames.forEach {
//    print("family name", $0)
//    UIFont.fontNames(forFamilyName: $0).forEach {
//        print("font name", $0)
//    }
//}

class ObservableObjectModel: ObservableObject {
    var aa: Int = 0
    var aaa: Bool = false
}
let aaa = ObservableObjectModel()
aaa.objectWillChange.sink { value in
    print("value", value)
}
aaa.aaa = true

class ObservableModel: Observable {
    var aa: Bool = false
}
let bb = ObservableModel()

bb.aa = true

/// 可用于视图层级深且VC无子VC时
enum ZLInnerViewEvent {
    case viewBtnAction // 响应的事件类型
    case cellBtnAction(_ isCollect: Bool) // 层级多有参数，可以通过枚举关联值传递
}
protocol ZLInnerEventResponsible: UIViewController {
    func shouldResponseTouchEvent(type: ZLInnerViewEvent)
}
class TVC: UIViewController, ZLInnerEventResponsible {
    func shouldResponseTouchEvent(type: ZLInnerViewEvent) {}
}
extension UIView {
    ///
    func bubbleEvent(_ eventType: ZLInnerViewEvent) {
        var nextRespnder = self.next
        while nextRespnder != nil {
            if let savior = nextRespnder as? ZLInnerEventResponsible {
                savior.shouldResponseTouchEvent(type: eventType)
                break
            }
            nextRespnder = nextRespnder!.next
        }
     }
}
class Tview: UIView {
    ///
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        bubbleEvent(.viewBtnAction)
        bubbleEvent(.cellBtnAction(false))
    }
}



struct SendableStruct {
    var nas: NSAttributedString = .init()
    var ii: Int = 0
}
class SendableClass {
    var nas: NSAttributedString = .init()
    var ii: Int = 0
}
//extension SendableClass: @unchecked Sendable {}
let aa: [Sendable] = [SendableStruct(), SendableClass()]
//aa.first
//aa.last

//extension UIView: Sendable {}
enum State: Sendable {
    case loggedOut
//    case loggedIn(name: NSAttributedString)
    case login(name: UIView)
}


// Before
class FoodTruckModel: ObservableObject {
//    @Published
//    var orders: [Order] = []
    
//    @Published
//    var donuts = Donut.all
}
//struct ContentView: View {
//
// @ObservedObject
// var model: FoodTruckModel
//
// var body: some View {
//  // ... //
// }
//}

// After Swift5.9
//@Observable class FoodTruckModel {
//    var orders: [Order] = []
//    var donuts = Donut.all
//}
//struct ContentView {
//    var model: FoodTruckModel
//
//    var body: View {
//        // ... //
//    }
//}

// Xcode15
@Observable class TestModel {
    var aInt = 0
//    var _aInt = 0
}

//@Observable
//class TruckModel: Observable {
//
//    @ObservationIgnored private let _$observationRegistrar = ObservationRegistrar()
//    
//    internal nonisolated func access<Member>(keyPath: KeyPath<TruckModel , Member>) {
//        _$observationRegistrar.access(self, keyPath: keyPath)
//    }
//    
//    internal nonisolated func withMutation<Member, T>(keyPath: KeyPath<TruckModel , Member>,
//                                                      _ mutation: () throws -> T) rethrows -> T {
//        try _$observationRegistrar.withMutation(of: self, keyPath: keyPath, mutation)
//    }
//    
//    var orders: [Int] {
//        get {
//            access(keyPath: \.orders)
//            return _orders
//        }
//        set {
//            withMutation(keyPath: \.orders) {
//                _orders = newValue
//            }
//        }
//    }
//    
//    var donuts: Int {
//        get {
//            access(keyPath: \.donuts)
//            return _donuts
//        }
//        set {
//            withMutation(keyPath: \.donuts) {
//                _donuts = newValue
//            }
//        }
//    }
//    
//    @ObservationIgnored private var _orders: [Int] = []
//    
//    @ObservationIgnored private var _donuts = 0
//}

//public func access<Subject: Observable, Member>( _ subject: Subject,
//                                                 keyPath: KeyPath<Subject, Member>) {
//    if let trackingPtr = _ThreadLocal.value?
//        .assumingMemoryBound(to: ObservationTracking._AccessList?.self) {
//        if trackingPtr.pointee == nil {
//            trackingPtr.pointee = ObservationTracking._AccessList()
//        }
//        trackingPtr.pointee?.addAccess(keyPath: keyPath, context: context)
//    }
//}
//
//public func withMutation<Subject: Observable, Member, T>(
//    of subject: Subject,
//    keyPath: KeyPath<Subject, Member>,
//    _ mutation: () throws -> T) rethrows -> T {
//        willSet(subject, keyPath: keyPath)
//        defer { didSet(subject, keyPath: keyPath) }
//        return try mutation()
//    }
//}
//
//public struct _AccessList: Sendable {
//    internal var entries = [ObjectIdentifier : Entry]( "ObjectIdentifier : Entry")
//
//    internal init() { }
//
//    internal mutating func addAccess<Subject: Observable>(
//        keyPath: PartialKeyPath<Subject>,
//        context: ObservationRegistrar.Context
//    ) {
//        entries[context.id, default: Entry(context)].insert(keyPath)
//    }
//
//    internal mutating func merge(_ other: _AccessList) {
//        for (identifier, entry) in other.entries {
//            entries[identifier, default: entry].formUnion(entry.properties)
//        }
//    }
//}

//struct State: @unchecked Sendable {
//    struct Observation {
//      var properties: Set<AnyKeyPath>
//      var observer: @Sendable () -> Void
//    }
//    
//    var id = 0
//    var observations = [Int : Observation]( "Int : Observation")
//    var lookups = [AnyKeyPath : Set<Int>]( "AnyKeyPath : Set<Int>")
//    
//    mutating func generateId() -> Int {
//      defer { id &+= 1 }
//      return id
//    }
//    
//    mutating func registerTracking(for properties: Set<AnyKeyPath>, observer: @Sendable @escaping () -> Void) -> Int {
//      let id = generateId()
//      observations[id] = Observation(properties: properties, observer: observer)
//      for keyPath in properties {
//        lookups[keyPath, default: []].insert(id)
//      }
//      return id
//    }
//    
//    mutating func cancel(_ id: Int) {
//      if let tracking = observations.removeValue(forKey: id) {
//        for keyPath in tracking.properties {
//          if var ids = lookups[keyPath] {
//            ids.remove(id)
//            if ids.count == 0 {
//              lookups.removeValue(forKey: keyPath)
//            } else {
//              lookups[keyPath] = ids
//            }
//          }
//        }
//      }
//    }
//    
//    mutating func willSet(keyPath: AnyKeyPath) -> [@Sendable () -> Void] {
//      var observers = [@Sendable () -> Void]( "@Sendable () -> Void")
//      if let ids = lookups[keyPath] {
//        for id in ids {
//          if let observation = observations[id] {
//            observers.append(observation.observer)
//            cancel(id)
//          }
//        }
//      }
//      return observers
//    }
//  }

//@Observable final class Store<State, Action> {
//    typealias Reduce = (State, Action) -> State
//
//    private(set) var state: State
//    private let reduce: Reduce
//
//    init(initialState state: State, reduce: @escaping Reduce) {
//        self.state = state
//        self.reduce = reduce
//    }
//
//    func send(_ action: Action) {
//        state = reduce(state, action)
//    }
//}
//withObservationTracking {
//    render(store.state)
//} onChange: {
//    print("State changed")
//}
//观察框架仅运行一次 onChange，这意味着你应该递归调用它以不断观察更改。
//你还应该注意的另一件事是 onChange 闭包在实际更改应用之前运行。
//这就是为什么我们通过启动新任务来推迟 onChange 操作的原因。
func startObservation() {
//    withObservationTracking {
//        render(store.state)
//    } onChange: {
//        Task { startObservation() }
//    }
}

import SwiftUI
//struct ProductsView: View {
//    let store: Store<AppState, AppAction>
//    var body: some View {
//        List(store.state.products, id: \.self) { product in
//            Text(product)
//        }
//        .onAppear {
//            store.send(.fetch)
//        }
//    }
//}



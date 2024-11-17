//: [Previous](@previous)

import Foundation

class Store: ObservableObject {
    @Published var firstName: String
    @Published var lastName: String
    var fullName: String {
        firstName + " " + lastName
    }

    @Published private var count: Int = 0
    
    init(firstName: String, lastName: String, count: Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.count = count
    }
}

@Observable
class Store0 {
    var firstName: String = "Yang"
    var lastName: String = "Xu"
    var fullName: String {
        firstName + " " + lastName
    }
// count 不可被观察
//@ObservationIgnored
    private var count: Int = 0

    init(firstName: String, lastName: String, count: Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.count = count
    }
}
//ObservationRegistrar

let _$abcdefg: Int = 0
_$abcdefg

var aD: Double = 9.125
Int(aD)
aD = 9.5325
Int(aD)
CGFloat(1.0) / CGFloat(7.0)

round(aD)

let nf = NumberFormatter()
nf.maximumFractionDigits = 1
//nf.minimumFractionDigits = 0
//nf.generatesDecimalNumbers = true
//nf.allowsFloats = true
//nf.numberStyle = .decimal
//nf.string(from: NSNumber(value: 0.1125))
//erf(0.125)
//erfc(0.125)
//lgamma(0.125)
//tgamma(0.125)
//ceil(0.125)
//floor(0.125)
//nearbyint(0.125)
//rint(0.125)
//round(0.125)
nf.numberStyle = .percent
nf.string(from: NSNumber(value: 0.125))

//NumberFormatter.localizedString(from: NSNumber(value: 0.125), number: .decimal)
//NumberFormatter.localizedString(from: NSNumber(value: 0.125), number: .percent)


extension Double {
    /// 四舍五入
    func rounding(scale: Int16) -> String {
        let dn = NSDecimalNumber(string: "\(self)")
        //let behavior = NSDecimalNumberHandler.default
        let behavior = NSDecimalNumberHandler(roundingMode: .plain,
                                              scale: scale,
                                              raiseOnExactness: false,
                                              raiseOnOverflow: false,
                                              raiseOnUnderflow: false,
                                              raiseOnDivideByZero: false)
        let newDn = dn.rounding(accordingToBehavior: behavior)
        print(newDn.doubleValue)
        return newDn.stringValue
    }
}
//1.125.rounding(scale: 0)
//1.125.rounding(scale: 1)
//1.125.rounding(scale: 2)
1.0005.rounding(scale: 2)
//1.555.rounding(scale: 0)
//1.555.rounding(scale: 1)
//1.555.rounding(scale: 2)



struct Storage {
    private let userNameKey = "userNameKey"

    var userName: String? {
        get {
            return UserDefaults.standard.string(forKey: userNameKey)
        }
        // nonmutating
        nonmutating set {
            UserDefaults.standard.set(newValue, forKey: userNameKey)
        }
    }
}
let s = Storage() // nonmutating
s.userName = "1" // 保证

enum TestEnum {
    case ad,
         appVersion,
         guide
}
var aSet: Set<TestEnum> = [.ad, .appVersion, .guide]
aSet.insert(.ad)


final class ChickenFeederWithQueue {
    let food = "worms"
    
    /// 私有支持属性和计算属性的组合允许同步访问。
    private var _numberOfEatingChickens: Int = 0
    var numberOfEatingChickens: Int {
        queue.sync {
            _numberOfEatingChickens
        }
    }
    
    /// 一个并发的队列，允许同时进行多次读取。
    private var queue = DispatchQueue(label: "chicken.feeder.queue",
                                      attributes: .concurrent)
    
    func chickenStartsEating() {
        /// 使用栅栏阻止写入时的读取
        queue.sync(flags: .barrier) {
            _numberOfEatingChickens += 1
        }
    }
    
    func chickenStopsEating() {
        /// 使用栅栏阻止写入时的读取
        queue.sync(flags: .barrier) {
            _numberOfEatingChickens -= 1
        }
    }
}
actor ChickenFeeder {
    ///
    let food = "worms"
    ///
    var numberOfEatingChickens: Int = 0
    ///
    var count: Int {
        return numberOfEatingChickens
    }
    
    func chickenStartsEating() {
        numberOfEatingChickens += 1
    }
    
    func chickenStopsEating() {
        numberOfEatingChickens -= 1
    }
}
extension ChickenFeeder {
    func notifyObservers() {
        NotificationCenter.default.post(name: NSNotification.Name("chicken.started.eating"),
                                        object: numberOfEatingChickens)
    }
}
let cf = ChickenFeeder()
print(cf.food)
//print(cf.count)
// Actor-isolated instance method 'chickenStartsEating()'
// can not be referenced from a non-isolated context
//cf.chickenStartsEating()
await cf.chickenStartsEating()
print(await cf.numberOfEatingChickens)
Task {
//    await cf.chickenStopsEating()
}
print(await cf.numberOfEatingChickens)

//extension ChickenFeeder {
//    func printChickensFood() {
//        print("Chickens are eating \(food)")
//    }
//}
//cf.printChickensFood()
extension ChickenFeeder {
    nonisolated func printChickensFood() {
        print("Chickens are eating \(food)")
    }
}
cf.printChickensFood()

extension ChickenFeeder: CustomStringConvertible {
    nonisolated var description: String {
        "A chicken feeder feeding \(food)"
    }
}
cf.description


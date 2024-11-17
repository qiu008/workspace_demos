import Foundation

@propertyWrapper
struct UserDefaultWrapper<T> {
    var key: String
    var defaultT: T!
    var wrappedValue: T! {
        get { (UserDefaults.standard.object(forKey: key) as? T) ?? defaultT }
        nonmutating set {
            if newValue == nil {
                UserDefaults.standard.removeObject(forKey: key)
            } else {
                UserDefaults.standard.set(newValue, forKey: key)
            }
        }
    }
    
    init(_ key: String, _ defaultT: T! = nil) {
        self.key = key
        self.defaultT = defaultT
    }
}
struct UserDefaultsUnit {
    @UserDefaultWrapper("test")
    static var test: String?
    
//    @UserDefaultWrapper("name")
//    static var name: String
}

//使用
UserDefaultsUnit.test = "hahahha" // set
//let test = UserDefaultsUnit.test // get

UUID().uuidString

NSUUID().uuidString

let a = Notification.Name(rawValue: "a")
let b = Notification.Name("a")
a == b
a.rawValue == b.rawValue

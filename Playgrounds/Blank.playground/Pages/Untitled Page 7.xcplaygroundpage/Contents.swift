//struct User {
//  let name: String
//  let age: Int
//}
//// vs.
//let user = (name: "Carl", age: 40)
//
//import Foundation
//let t = (a: 5, b: "String", c: Date())
//let mirror = Mirror(reflecting: t)
//for (_, value) in mirror.children {
//    switch value {
//    case is Int:
//    print("Int")
//    case is String:
//    print("String")
//    case is Date:
//    print("Date")
//    default: ()
//    }
//}

class Stack<T: Equatable> {
    
    private var stackItems: [T] = []
    
    func pushItem(item:T) {
        stackItems.append(item)
    }
    
    func popItem() -> T? {
        let lastItem = stackItems.last
        stackItems.removeLast()
        return lastItem
    }
    
    func isItemInStack(item: T) -> Bool {
        var found = false
        for stackItem in stackItems {
            if stackItem == item { //编译报错!!!!!!!!!!
                found = true
            }
        }
        return found
    }
}

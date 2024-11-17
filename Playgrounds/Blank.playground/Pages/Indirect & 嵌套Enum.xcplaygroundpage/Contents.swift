//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)


//在涉及到一些数据结构的经典理论和模型 (没错，就是链表，树和图) 时，我们往往会用到嵌套的类型。比如链表，在 Swift 中，我们可以这样来定义一个单向链表：
class Node<T> {
    let value: T?
    let next: Node<T>?

    init(value: T?, next: Node<T>?) {
        self.value = value
        self.next = next
    }
}
let list = Node(value: 1,
             next: Node(value: 2,
               next: Node(value: 3,
                 next: Node(value: 4, next: nil))))
// 单向链表：1 -> 2 -> 3 -> 4

//看起来还不错，但是这样的形式在表达空节点的时候并不十分理想。我们不得不借助于 nil 来表达空节点，但是事实上空节点和 nil 并不是等价的。另外，如果我们想表达一个空链表的话，要么需要把 list 设置为 Optional，要么把 Node 里的 value 以及 next 都设为 nil，这导致描述中存在歧义，我们不得不去做一些人为的约定来表述这样的情况，这在算法描述中是十分致命的。

//在 Swift 2 中，我们现在可以使用嵌套的 enum 了 -- 而这在 Swift 1.x 里是编译器所不允许的。我们用 enum 来重新定义链表结构的话，会是下面这个样子：

indirect enum LinkedList<Element: Comparable> {
    case empty
    case node(Element, LinkedList<Element>)
    
    func linkedListByRemovingElement(_ element: Element)
                                -> LinkedList<Element> {
        guard case let .node(value, next) = self else {
            return .empty
        }
        return value == element ?
            next : LinkedList.node(value, next.linkedListByRemovingElement(element))
    }

    
}
let linkedList = LinkedList.node(1, .node(2, .node(3, .node(4, .empty))))
// 单项链表：1 -> 2 -> 3 -> 4

let result = linkedList.linkedListByRemovingElement(2)
print(result)
// 1 -> 3 -> 4

//空链表
let emptyLL = LinkedList<Int>.empty


public enum AFError: Error {
    
    /// The underlying reason the `.urlRequestValidationFailed`
    public enum URLRequestValidationFailureReason {
        /// URLRequest with GET method had body data.
        case bodyDataInGETRequest(Data)
    }
    
    /// `URLRequest` failed validation.
    case urlRequestValidationFailed(reason: URLRequestValidationFailureReason)
}

// MARK: - Error Descriptions

//extension AFError: LocalizedError {
//    public var errorDescription: String? {
//        switch self {
//        case .explicitlyCancelled:
//            return "Request explicitly cancelled."
//        case let .invalidURL(url):
//            return "URL is not valid: \(url)"
//        case let .parameterEncodingFailed(reason):
//            return reason.localizedDescription
//        case let .parameterEncoderFailed(reason):
//            return reason.localizedDescription
//        case let .multipartEncodingFailed(reason):
//            return reason.localizedDescription
//        case let .requestAdaptationFailed(error):
//            return "Request adaption failed with error: \(error.localizedDescription)"
//        case let .responseValidationFailed(reason):
//            return reason.localizedDescription
//        case let .responseSerializationFailed(reason):
//            return reason.localizedDescription
//        case let .requestRetryFailed(retryError, originalError):
//            return """
//            Request retry failed with retry error: \(retryError.localizedDescription), \
//            original error: \(originalError.localizedDescription)
//            """
//        case .sessionDeinitialized:
//            return """
//            Session was invalidated without error, so it was likely deinitialized unexpectedly. \
//            Be sure to retain a reference to your Session for the duration of your requests.
//            """
//        case let .sessionInvalidated(error):
//            return "Session was invalidated with error: \(error?.localizedDescription ?? "No description.")"
//        #if !(os(Linux) || os(Windows))
//        case let .serverTrustEvaluationFailed(reason):
//            return "Server trust evaluation failed due to reason: \(reason.localizedDescription)"
//        #endif
//        case let .urlRequestValidationFailed(reason):
//            return "URLRequest validation failed due to reason: \(reason.localizedDescription)"
//        case let .createUploadableFailed(error):
//            return "Uploadable creation failed with error: \(error.localizedDescription)"
//        case let .createURLRequestFailed(error):
//            return "URLRequest creation failed with error: \(error.localizedDescription)"
//        case let .downloadedFileMoveFailed(error, source, destination):
//            return "Moving downloaded file from: \(source) to: \(destination) failed with error: \(error.localizedDescription)"
//        case let .sessionTaskFailed(error):
//            return "URLSessionTask failed with error: \(error.localizedDescription)"
//        }
//    }
//}

extension AFError.URLRequestValidationFailureReason {
    var localizedDescription: String {
        switch self {
        case let .bodyDataInGETRequest(data):
            return """
            Invalid URLRequest: Requests with GET method cannot have body data:
            \(String(decoding: data, as: UTF8.self))
            """
        }
    }
}
/// 将let放在取枚举值的地方，我个人比较喜欢这种写法
//case .urlRequestValidationFailed(let reason):

/// 不关心枚举带参，用_代替
//case .urlRequestValidationFailed(_):

/// 直接只显示枚举的状态，省略参数显示
//case .urlRequestValidationFailed:

enum NumberType: String {
    case one, two, three, four, five
}

let s: NumberType = .one

s.rawValue




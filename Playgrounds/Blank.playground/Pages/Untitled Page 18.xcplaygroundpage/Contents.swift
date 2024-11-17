//: [Previous](@previous)

import Foundation

//{
//    "result": {
//        "id": "D4F28578-51BD-40F4-A8BD-387668E06EF8",
//        "name": "John Sundell",
//        "twitterHandle": "johnsundell",
//        "gitHubUsername": "johnsundell"
//    }
//}

struct User: Identifiable, Codable {
    let id: UUID
    var name: String
    var twitterHandle: String
    var gitHubUsername: String
}

struct NetworkResponse: Codable {
    var result: User
    
    func asdff() {
        URLSession.shared.dataTaskPublisher(for: URLRequest(url: URL(string: "")!)).map(\.data).decode(type: NetworkResponse.self, decoder: JSONDecoder())
    }
}

//struct UserLoader {
//    var urlSession = URLSession.shared
//
//    func loadUser(withID id: User.ID) -> AnyPublisher<User, Error> {
//        urlSession.dataTaskPublisher(for: resolveURL(forID: id))
//            .map(\.data)
//            .decode(type: User.NetworkResponse.self, decoder: JSONDecoder())
//            .map(\.result)
//            .eraseToAnyPublisher()
//    }
//}

/*
@propertyWrapper
enum PropertyWrapperEnum<G> {
    case none(G)
    
    var wrappedValue: G {
//        willSet {
//            if newValue is Int {
//
//            }
//        }
        get {
            switch self {
            case .none(let g):
                return g
            }
        }
        set {
            print(newValue)
        }
//        didSet {
//            if oldValue is Int {
//
//            }
//        }
    }
}
struct ES {
    @PropertyWrapperEnum
    var sa: PropertyWrapperEnum = .none([0, 1])

    @PropertyWrapperStruct
    var ss: String = ""

    @PropertyWrapperStruct
    var si: Int = 0
}
*/
@propertyWrapper
struct PropertyWrapperStruct<G> {
    var wrappedValue: G {
        willSet {
            if newValue is Int {
                
            }
        }
//        get {
//
//        }
//        set {
//            print(newValue)
//        }
        didSet {
            if oldValue is Int {
                let ss = SS()
                let aa = ss.sa
//                let pp = $(ss.sa).desc
            }
        }
    }
    var projectedValue: Self { self }
//    var projectedValue: Int { 0 }
    var desc: String { "" }
}
struct SS {
    typealias Field = AttributeScopes.FoundationAttributes.DateFieldAttribute.Field
    
    @PropertyWrapperStruct
    var sa: [Int] = [0, 1]
    
    @PropertyWrapperStruct
    var ss: String = ""
    
    @PropertyWrapperStruct
    var si: Int = 0
    
    @PropertyWrapperStruct
    var se: Field = .era
    
    func sFunc() {
        let pv = $sa.desc
    }
}
/*
@propertyWrapper
class PropertyWrapperClass<G> {
    var value: G
    
    var wrappedValue: G {
//        willSet {
//            if newValue is Int {
//
//            }
//        }
        get {
            value
        }
        set {
            value = newValue
        }
//        didSet {
//            if oldValue is Int {
//
//            }
//        }
    }
    init(value: G) {
        self.value = value
    }
}
class CC {
    @PropertyWrapperClass(value: [0])
    var ca: [Int] = [0]

    @PropertyWrapperClass(value: "")
    var cs: String = ""

    @PropertyWrapperClass(value: 0)
    var ci: Int = 0
    
    func cFunc() {
        let pp = $ca.desc
    }
}
*/

enum ENUM {
    case case1,
         case2,
         case3,
         case4
}

let st: SS.Type = SS.self
let ss = st.init()
ss.$sa.desc
ss.sa

/// Type that acts as a generic extension point for all `AlamofireExtended` types.
public struct AlamofireExtension<ExtendedType> {
    /// Stores the type or meta-type of any extended type.
    public private(set) var type: ExtendedType

    /// Create an instance from the provided value.
    ///
    /// - Parameter type: Instance being extended.
    public init(_ type: ExtendedType) {
        self.type = type
    }
}
/// Protocol describing the `af` extension points for Alamofire extended types.
public protocol AlamofireExtended {
    /// Type being extended.
    associatedtype ExtendedType

    /// Static Alamofire extension point.
    static var af: AlamofireExtension<ExtendedType>.Type { get set }
    /// Instance Alamofire extension point.
    var af: AlamofireExtension<ExtendedType> { get set }
}
// AlamofireExtension<ExtendedType> == AlamofireExtension<Self> ?
extension AlamofireExtended {
    /// Static Alamofire extension point.
    public static var af: AlamofireExtension<Self>.Type {
        get { AlamofireExtension<Self>.self }
        set {}
    }

    /// Instance Alamofire extension point.
    public var af: AlamofireExtension<Self> {
        get { AlamofireExtension(self) }
        set {}
    }
}

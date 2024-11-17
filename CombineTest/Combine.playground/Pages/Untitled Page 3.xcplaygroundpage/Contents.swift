import UIKit
import Combine


let filterField = UITextField()
let pub = NotificationCenter.default.publisher(for: UITextField.textDidChangeNotification, object: filterField)
pub.sink { sender in
    print(sender.object ?? "")
}
pub.sink {
    switch $0 {
    case .failure(let failure):
        print(failure)
    case .finished:
        print("finished")
    }
} receiveValue: { sender in
    print(sender.object ?? "")
    let tf = sender.object as? UITextField
    tf?.text
}
//pub.assign(to: &<#T##Published<Notification>.Publisher#>)
//pub.assign(to: <#T##ReferenceWritableKeyPath<Root, Notification>#>, on: <#T##Root#>)
filterField.text = ""
filterField.text = "0"
filterField.text = "1"
filterField.text = "2"
filterField.text = "3"
filterField.text = "4"
filterField.text = "5"

let label = UILabel()
let sub = NotificationCenter.default
    .publisher(for: UITextField.textDidChangeNotification, object: filterField)
    .map( { ($0.object as? UITextField)?.text ?? "" } )
    .filter( {
        guard let _0 = $0 else { return false }
        return _0.unicodeScalars.allSatisfy({CharacterSet.alphanumerics.contains($0)})
    } )
    .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
    .receive(on: RunLoop.main) .assign(to:\.text, on: label)
//sub.cancel()



struct Endpoint { // 示例
    var path: String
    var queryItems: [URLQueryItem] = []
}
extension Endpoint { // 示例请求构建
    var url: URL {
        var components = URLComponents()
        components.scheme = "https"
        components.host = "dummyapi.io"
        components.path = "/data/api" + path
        components.queryItems = queryItems
        
        guard let url = components.url else {
            preconditionFailure("Invalid URL components: \(components)")
        }
        
        return url
    }
    
    var headers: [String: Any] {
        return [
            "app-id": "YOUR APP ID HERE"
        ]
    }
}

protocol NetworkControlProtocol {
    typealias Headers = [String: Any]
    
    func get<T>(type: T.Type,
                url: URL,
                headers: Headers
    ) -> AnyPublisher<T, Error> where T: Decodable
}
//extension NetworkControlProtocol {
//
//    func get<T: Decodable>(type: T.Type,
//                           url: URL,
//                           headers: Headers
//    ) -> AnyPublisher<T, Error> {
//        var urlRequest = URLRequest(url: url)
//
//        headers.forEach { (key, value) in
//            if let value = value as? String {
//                urlRequest.setValue(value, forHTTPHeaderField: key)
//            }
//        }
//
//        return URLSession.shared.dataTaskPublisher(for: urlRequest)
//            .map(\.data)
//            .decode(type: T.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }
//}
struct NetworkControl: NetworkControlProtocol {
    
    func get<T: Decodable>(type: T.Type,
                           url: URL,
                           headers: Headers
    ) -> AnyPublisher<T, Error> {
        var urlRequest = URLRequest(url: url)
        
        headers.forEach { (key, value) in
            if let value = value as? String {
                urlRequest.setValue(value, forHTTPHeaderField: key)
            }
        }
        
        return URLSession.shared.dataTaskPublisher(for: urlRequest)
            .map(\.data)
            .decode(type: T.self, decoder: JSONDecoder())
            .eraseToAnyPublisher()
    }
}

extension Endpoint { // 示例三个接口服务
    
    static var users: Self {
        return Endpoint(path: "/user")
    }
    
    static func users(count: Int) -> Self {
        return Endpoint(path: "/user",
                        queryItems: [
                            URLQueryItem(name: "limit",
                                         value: "\(count)")
            ]
        )
    }
    
    static func user(id: String) -> Self {
        return Endpoint(path: "/user/\(id)")
    }
}
/*
{
 "data": [
     {
         "id": "0F8JIqi4zwvb77FGz6Wt",
         "title": "mr",
         "firstName": "Heinz-Georg",
         "lastName": "Fiedler",
         "email": "heinz-georg.fiedler@example.com",
         "picture": "https://randomuser.me/api/portraits/men/81.jpg"
     },
     {
         "id": "0P6E1d4nr0L1ntW8cjGU",
         "title": "miss",
         "firstName": "Katie",
         "lastName": "Hughes",
         "email": "katie.hughes@example.com",
         "picture": "https://randomuser.me/api/portraits/women/74.jpg"
     }
 ]
}
*/
extension CustomStringConvertible where Self: Codable {
    var description: String {
        var description = "\n \(type(of: self)) \n"
        let selfMirror = Mirror(reflecting: self)
        for child in selfMirror.children {
            if let propertyName = child.label {
                description += "\(propertyName): \(child.value)\n"
            }
        }
        return description
    }
}
struct User: Codable, CustomStringConvertible {
    let id: String?
    let title: String?
    let firstName: String?
    let lastName: String?
    let email: String?
    let picture: String?
}
struct Users: Codable, CustomStringConvertible {
    let data: [User]?
}

protocol UsersLogicControlProtocol {
    var networkControl: NetworkControlProtocol { get }

    func getUsers() -> AnyPublisher<Users, Error>
    func getUsers(count: Int) -> AnyPublisher<Users, Error>
    func getUser(id: String) -> AnyPublisher<User, Error>
}
struct UsersLogicControl: UsersLogicControlProtocol {
    let networkControl: NetworkControlProtocol
    
    init(networkControl: NetworkControlProtocol) {
        self.networkControl = networkControl
    }
    
    func getUsers() -> AnyPublisher<Users, Error> {
        let endpoint = Endpoint.users
        
        return networkControl.get(type: Users.self,
                                     url: endpoint.url,
                                     headers: endpoint.headers)
    }
    
    func getUsers(count: Int) -> AnyPublisher<Users, Error> {
        let endpoint = Endpoint.users(count: count)
        
        return networkControl.get(type: Users.self,
                                     url: endpoint.url,
                                     headers: endpoint.headers)
    }
    
    func getUser(id: String) -> AnyPublisher<User, Error> {
        let endpoint = Endpoint.user(id: id)
        
        return networkControl.get(type: User.self,
                                     url: endpoint.url,
                                     headers: endpoint.headers)
    }
    
}

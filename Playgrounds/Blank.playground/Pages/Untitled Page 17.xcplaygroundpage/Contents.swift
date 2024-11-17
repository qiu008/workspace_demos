////: [Previous](@previous)
//
//import Foundation
//
//var greeting = "Hello, playground"
//
////: [Next](@next)
//
//struct GroceryProduct: Codable {
//    var name: String
//    var points: Int = 0
//    var description: String?
//
//    // 可以通过编解码的属性，points会被过滤掉
//    enum CodingKeys: String, CodingKey {
//        case name
//        // 修改属性编解码后的key
//        case description = "desc"
//    }
//}
//let banner = GroceryProduct(name: "香蕉", points: 250, description: "海南产的")
//
//let encoder = JSONEncoder()
//encoder.outputFormatting = .prettyPrinted
//
///// 对banner 实例进行JSON编码
//var data = try encoder.encode(banner)
//print(String(data: data, encoding: .utf8)!)
//
///* 打印:
// {
//   "name" : "Pear",
//   "points" : 250,
//   "description" : "A ripe pear."
// }
//*/
//
//
///// 对 JSON String 转Model 实例
//
//let json = """
//{
//    "name": "榴莲",
//    "points": 600,
//    "description": "一般人很难接受的水果"
//}
//""".data(using: .utf8)!
//
//let decoder = JSONDecoder()
//let product = try decoder.decode(GroceryProduct.self, from: json)
//
//print(product.name) // 打印 "榴莲"
//
//
//struct Person: Codable {
//    var firstName: String
//    var secondName: String
//
//    enum CodingKeys: String, CodingKey {
//        case firstName = "first_name"
//        case secondName = "second_name"
//    }
//}
//
//// 对person实例进行Json编码
//let person = Person(firstName: "FN", secondName: "SN")
////encoder.keyEncodingStrategy = .custom({ codingPath in
////    codingPath.last!
////})
//
//data = try! encoder.encode(person)
//let personEncodedString = String(data: data, encoding: .utf8)!
//print(personEncodedString)


struct Person: Codable {
    var gender: String = ""
    var age: Int = 0
    var name: String = ""

    var firstName: String = ""
    var secondName: String = ""

    enum CodingKeys: String, CodingKey {
        case gender
        case age
        case name
    }

    enum NameKeys: String, CodingKey {
        case firstName
        case secondName
    }
}

extension Person {
    //解析
    init(from decoder: Decoder) throws {
        let vals = try decoder.container(keyedBy: CodingKeys.self)
        gender = try vals.decode(String.self, forKey: CodingKeys.gender)
        age = try vals.decode(Int.self, forKey: CodingKeys.age)
                
          // nestedContainer 解析name属性
        let name = try vals.nestedContainer(keyedBy: NameKeys.self, forKey: .name)
        firstName = try name.decode(String.self, forKey: .firstName)
        secondName = try name.decode(String.self, forKey: .secondName)
    }

    //编码
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(gender, forKey: .gender)
        try container.encode(age, forKey: .age)
                    
        //nestedContaine 解析name节点
        var name = container.nestedContainer(keyedBy: NameKeys.self, forKey: .name)
        try name.encode(firstName, forKey: .firstName)
        try name.encode(secondName, forKey: .secondName)
    }
}

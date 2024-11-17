//: [Previous](@previous)

import Foundation

class Person {
    var age = 10
}

var p: Person? = Person()
//1
var p1 = p
// 2
var p2 = p
// 3
unowned var p3 = p
// 4
p1?.age


struct GroceryProduct: Codable {
    var name: String
    var points: Int = 0
    var description: String?
    
    //过滤编码属性
    enum CodingKeys: String, CodingKey {
        case name
        //键值修改
        case description = "desc"
    }
}

let banner = GroceryProduct(name: "香蕉", points: 250, description: "海南产的")

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

/// 对banner 实例进行JSON编码
let data = try encoder.encode(banner)
let str = String(data: data, encoding: .utf8)

/* 打印:
 {
   "name" : "Pear",
   "points" : 250,
   "description" : "A ripe pear."
 }
*/


/// 对 JSON String 转Model 实例

if let jsonStrData = str?.data(using: .utf8) {
    let decoder = JSONDecoder()
    let product = try decoder.decode(GroceryProduct.self, from: jsonStrData)
}

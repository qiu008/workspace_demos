import Foundation

//let path: [String] = [""]
//// 获取遍历数组用的生成器
//var g = path.generate()
//// 注意：由于我们要使用 g.next()，必须声明为变量。（译者注：因为每次调用 g 都会绑定到下一个值）
//let tuple = (g.next(), g.next(), g.next(), g.next())

//var a = ""
//a = "alkfjaskdjf"
//switch (a) {
//case "products"?:
//    break
//default:
//    break
//}

//var string = "ljfdlajdkj"
//string.insert("_", at: string.index(string.endIndex, offsetBy: -2))
//string.insert("_", at: .init(utf16Offset: 2, in: string))

//Double.leastNormalMagnitude < 0

//Float.leastNormalMagnitude < 0

//Double.greatestFiniteMagnitude < 0

//let a: [String] = []
//a.joined(separator: ",")

//var a = [1,2,3,4,5,nil]
//a.dropFirst(4)
//if let index = a.firstIndex(of: 4) {
//    a.remove(at: index)
//}
//print(a)

let str = "[1,2,3,4,5,null]"
//null会导致decode失败 nil也会
//let bodyMessage = response.bodyMessage?.replacingOccurrences(of: "null", with: "{}")
//print(bodyMessage ?? "compareData", "compareData")
if let data = str.data(using: .utf8) {
    let result = try? JSONDecoder().decode([Int?].self, from: data)
    print(result ?? "result")
}


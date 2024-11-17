//: [Previous](@previous)

import Foundation

extension String {
    func phoneTruncatingMiddle() -> String {
        switch count {
        case 8...:
            var phone = self
            let start = phone.index(phone.startIndex, offsetBy: 3)
            let end = phone.index(start, offsetBy: 3)
            phone.replaceSubrange(start...end, with: "****")
            return phone
        case 5, 6, 7:
            var phone = self
            let start = phone.index(phone.startIndex, offsetBy: 3)
            let end = phone.index(phone.endIndex, offsetBy: -1)
            let distance = phone.distance(from: start, to: end)
            let array = Array(repeating: "*", count: distance)
            let with = array.joined()
            phone.replaceSubrange(start..<end, with: with)
            return phone
        default:
            return self
        }
    }
}

//"1234567".phoneTruncatingMiddle()
//"123456".phoneTruncatingMiddle()
//"12345".phoneTruncatingMiddle()
//"1234".phoneTruncatingMiddle()
//"".phoneTruncatingMiddle()

//let array = [0, 1, 2, 3]
//var idx = array.startIndex
//formIndex(after: &idx)

// Data Race
//var name = "0"
//DispatchQueue.global().async {
//    name += "1"
//}
//print(name)

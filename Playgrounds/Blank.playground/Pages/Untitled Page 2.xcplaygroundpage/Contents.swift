func increment(x: Int) -> Int {
  print("Computing value of \(x)")
  return x+1
}

let array = Array(0..<1000)
//array.map {
//    $0 + 1
//}
let incArray = array.lazy.map(increment)
//print(incArray[0], incArray[4])

//import UIKit
import Foundation
let formatter = NumberFormatter()
formatter.numberStyle = .spellOut
let string = "This is Functional Programming"
let translateURLs = string
    // Split the characters into words
    .split(separator: " ")
    // Count the number of characters on each word
//    .map { $0.count }
let map = translateURLs.map { $0.count }
     // Spell out this number of chars (`stringFromNumber` can return nil)
//    .flatMap { (n: Int) -> String? in formatter.stringFromNumber(n) }
//let flatMapString = mapurl.flatMap { (n) -> String? in
//    formatter.string(for: n)
//}
let compactMap = map.compactMap { (n) -> String? in
    formatter.string(for: n)
}

let map0 = compactMap.map{ "\($0) letters" }

let compactMap0 = map0.compactMap { $0.addingPercentEncoding(withAllowedCharacters: .urlFragmentAllowed) }

let compactMap1 = compactMap0.compactMap { URL(string: $0) }

print(compactMap1)

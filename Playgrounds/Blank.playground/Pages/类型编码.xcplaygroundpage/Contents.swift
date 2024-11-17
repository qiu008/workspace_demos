//: [Previous](@previous)

//import UIKit
import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

// @encode, Cocoa中
//char *typeChar1 = @encode(int32_t);
//char *typeChar2 = @encode(NSArray);
// typeChar1 = "i", typeChar2 = "{NSArray=#}"

let int: Int = 0
let float: Float = 0.0
let double: Double = 0.0

let intNumber = NSNumber(value: int)
let floatNumber = NSNumber(value: float)
let doubleNumber = NSNumber(value: double)

//String.fromCString(intNumber.objCType)
//String.fromCString(floatNumber.objCType)
//String.fromCString(doubleNumber.objCType)
String(cString: intNumber.objCType)
String(cString: floatNumber.objCType)
String(cString: doubleNumber.objCType)

// 结果分别为：
// {Some "q"}
// {Some "f"}
// {Some "d"}
// 注意，fromCString 返回的是 `String?`


//LOG
func printLog<T>(message: T,
                    file: String = #file,
                  method: String = #function,
                    line: Int = #line)
{
    print("\((file as NSString).lastPathComponent)[\(line)], \(method): \(message)")
}

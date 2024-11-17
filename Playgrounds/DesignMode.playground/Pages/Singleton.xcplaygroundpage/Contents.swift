/*
 单例模式
 单例就像一个公司的IT部门，他们是唯一的存在，并且被所有人直接访问。
 官方定义
 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 */

import Foundation

class Singleton {
    static let sharedInstance = Singleton()
    private init() {
        // 用private防止被new
    }
}
let s  = Singleton.sharedInstance
//let s2 = Singleton() // ERROR: initializer is inaccessible due to 'private' protection level

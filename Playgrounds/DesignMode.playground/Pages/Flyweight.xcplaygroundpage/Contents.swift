/*
 享元模式
 享元模式就像CPU的Cache Memory，它通过对缓存的命中来实现速度的提升和内存的降低。
 官方定义
 运用共享技术有效地支持大量细粒度的对象。
 */

import Foundation

struct TargetObject {
    var title: String?
    
    func printTitle() {
        print(title ?? "nil")
    }
}

class Cache {
    var targetObjects = [String: TargetObject]()
    
    func lookup(key: String) -> TargetObject {
        if targetObjects.index(forKey: key) == nil {
            return TargetObject()
        }
        return targetObjects[key]!
    }
}

let cc = Cache()
cc.targetObjects["Test"] = TargetObject(title: "Test")
cc.lookup(key: "123").printTitle() // nil
cc.lookup(key: "Test").printTitle() // Test

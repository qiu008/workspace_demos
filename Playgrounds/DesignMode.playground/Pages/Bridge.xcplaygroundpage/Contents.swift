/*
 桥接模式
 桥接模式就是这么一座桥，它矗立在具体和抽象之间，当你调用的时候只看到了抽象，但是它内部实现时“桥接”到了具体。
 官方定义
 将抽象部分与实现部分分离，使它们都可以独立的变化。
 解耦了抽象和具体，让它们可以独立变化。
 */

import Foundation

protocol 开关能力 {
    func turnOn(_ on: Bool)
}

class 设备 {
    let obj: 开关能力
    
    init(_ obj: 开关能力) {
        self.obj = obj
    }
    
    func turnOn(_ on: Bool) {
        obj.turnOn(on)
    }
}

class 电视: 开关能力 {
    func turnOn(_ on: Bool) {
        if on {
            // 打开电视
        } else {
            // 关闭电视
        }
    }
}

class 空调: 开关能力 {
    func turnOn(_ on: Bool) {
        if on {
            // 打开空调
        } else {
            // 关闭空调
        }
    }
}

let tv = 设备(电视())
tv.turnOn(true) // 打开电视

let aircon = 设备(空调())
aircon.turnOn(false) // 关闭空调

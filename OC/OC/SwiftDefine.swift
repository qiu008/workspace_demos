//
//  SwiftDefine.swift
//  OC
//
//  Created by STL_QYH on 2021/6/22.
//  Copyright © 2021 STL_. All rights reserved.
//

import Foundation

public let kAppKey = "value"

enum SwiftDefineKey: String {
    case appKey = "appKey"
}

let a = SwiftDefineKey.appKey.rawValue


struct TestStruct {
    static let appkey = ""
    
}

class AClass {
    static let a = ""
}

class TestClass: NSObject {
    static let appKey = ""
}

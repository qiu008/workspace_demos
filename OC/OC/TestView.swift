//
//  TestView.swift
//  OC
//
//  Created by STL_QYH on 2021/6/22.
//  Copyright © 2021 STL_. All rights reserved.
//

import UIKit
//import HandyJSON

enum DeliverType: Int {
    case deliverTypeUnknow = 0
    case deliverTypeWithCar = 1
    case deliverTypeWithExpress = 2
}

class PreviewImage: HandyJSON {
    var imgIndex: Int?
    required init() {}
}

class TestView: UIView {
    
//    @objc
    static let appkey = ""
    
//    @objc var deliverType = DeliverType.deliverTypeUnknow
//    @objc var deliverType = UITableView.Style.plain
    
    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */

    @objc let appKey = ""
    
    let rt = RootModel()
    
    func aaaaa() {
        NSArray().arrayddddd()
    }
    
}

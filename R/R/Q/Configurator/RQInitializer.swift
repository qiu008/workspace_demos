//
//  RQRQInitializer.swift
//  R
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

import UIKit

class QModuleInitializer: NSObject {

    //Connect with object on storyboard
    @IBOutlet weak var qViewController: QViewController!

    override func awakeFromNib() {

        let configurator = QModuleConfigurator()
        configurator.configureModuleForViewInput(viewInput: qViewController)
    }

}

//
//  QRQViewController.swift
//  R
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

import UIKit

class QViewController: UIViewController, QViewInput {

    var output: QViewOutput!

    // MARK: Life cycle
    override func viewDidLoad() {
        super.viewDidLoad()
        output.viewIsReady()
    }


    // MARK: QViewInput
    func setupInitialState() {
    }
}

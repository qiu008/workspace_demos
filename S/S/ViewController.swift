//
//  ViewController.swift
//  S
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    let output = Presenter()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        output.view = self
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        output.openQScene()
    }
}


//
//  ViewController.swift
//  TC
//
//  Created by STL_QYH on 2022/2/15.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

class Circle {

    var radius: Double = 0
    
    lazy var circumference: Double = {
        Double.pi * 2 * self.radius
    }()
}

//
//  ViewController.swift
//  AddVcPushVc
//
//  Created by stl_ on 2026/1/7.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .brown
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        
//        let nc: UINavigationController = .init(rootViewController: RedViewController())
//        self.present(nc, animated: true)
        var aa: Int = 3
//        let bb = {
//            aa -= 1
//        }
//        bb()
        let cc = { [aa] in
            debugPrint("qyh.cc.aa", aa)
        }
        cc()
        aa -= 1
        cc()
        debugPrint("qyh.aa", aa)
    }
}

class RedViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .red
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        
        let orange: OrangeViewController = .init()
        navigationController?.viewControllers.append(orange)
        
        let yellow: YellowViewController = .init()
        navigationController?.pushViewController(yellow, animated: true)
        
    }
}
class OrangeViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .orange
    }


}
class YellowViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .yellow
    }


}
class GreenViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}
class CyanViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

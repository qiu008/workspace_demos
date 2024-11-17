//
//  ViewController.swift
//  App
//
//  Created by STL_QYH on 2020/10/9.
//

import UIKit
import AuthenticationServices

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        let appleBtn = ASAuthorizationAppleIDButton(authorizationButtonType: .signIn, authorizationButtonStyle: .black)
        appleBtn.frame = CGRect(x: 50, y: 50, width: 200, height: 50)
        let appleIDBtn = ASAuthorizationAppleIDButton(type: .signIn, style: .black)
        appleIDBtn.frame = CGRect(x: 50, y: 150, width: 200, height: 50)
        view.addSubview(appleBtn)
        view.addSubview(appleIDBtn)
        
        let name: Notification.Name = Notification.Name("test")
//        DispatchQueue.global().async {
//            NotificationCenter.default.addObserver(self, selector: #selector(self.test(_:)), name: name, object: nil)
//        NotificationQueue.default.enqueue(.init(name: name), postingStyle: .whenIdle)
//            NotificationQueue.default.dequeueNotifications(matching: .init(name: name), coalesceMask: 1)
//        }
        DispatchQueue.global().async {
            NotificationCenter.default.post(name: name, object: "object")
        }
        
    }
    
    @objc func test(_ noti: Notification) {
        print(noti)
    }
}


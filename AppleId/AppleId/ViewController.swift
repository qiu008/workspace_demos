//
//  ViewController.swift
//  AppleId
//
//  Created by STL_QYH on 2025/3/28.
//

import UIKit
import AuthenticationServices

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        let aa = ASAuthorizationAppleIDProvider()
        let req = aa.createRequest()
        req.requestedScopes = [.email, .fullName]
        
    }


}


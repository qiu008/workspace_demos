//
//  ViewController.swift
//  UIStack
//
//  Created by STL_QYH on 2022/10/2.
//

import UIKit

class ViewController: UIViewController {
    
    /// stackView
    private lazy var stackView: UIStackView = {
        let stack = UIStackView()
        stack.backgroundColor = .red
        stack.axis = .horizontal
        stack.spacing = 8
//        stack.alignment = .center
        stack.distribution = .fillEqually
        return stack
    }()
    
    lazy var datePicker: UIDatePicker = {
        let dp = UIDatePicker(frame: CGRect(x: 0, y: 100, width: 200, height: 200))
        dp.datePickerMode = .dateAndTime
        dp.preferredDatePickerStyle = .compact
        return dp
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
//        b_()
        
        
        let str = "阿拉山口减肥i"
        let str_utf8 = str.utf8
        let data_utf8 = Data(str_utf8)
        let b64_str = data_utf8.base64EncodedString()
        let data_b64 = Data(base64Encoded: b64_str)
        save(data_utf8, service: "service_uft_8", account: "test_str")

        save(data_b64!, service: "service_uft_8", account: "test_str")
        
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
//        print(datePicker.date)
    }
}

extension ViewController {
    
    func read(service: String, account: String) -> Data? {
        let query = [
            kSecAttrService: service,
            kSecAttrAccount: account,
            kSecClass: kSecClassGenericPassword,
            kSecReturnData: true
        ] as CFDictionary
        
        var result: AnyObject?
        SecItemCopyMatching(query, &result)
        
        return (result as? Data)
    }
    
    func save(_ data: Data, service: String, account: String) {
        
        // Create query
        let query = [
            kSecValueData: data,
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: service,
            kSecAttrAccount: account,
        ] as CFDictionary
        
        // Add data in query to keychain
        let status = SecItemAdd(query, nil)
        switch status {
        case errSecSuccess:
            print("Success")
        case errSecDuplicateItem:
            let query = [
                kSecClass: kSecClassGenericPassword,
                kSecAttrService: service,
                kSecAttrAccount: account,
            ] as CFDictionary
            let attributesToUpdate = [kSecValueData: data,] as CFDictionary
            
            let status = SecItemUpdate(query, attributesToUpdate)
            switch status {
            case errSecSuccess:
                print("Update Success")
            default:
                print("Error: \(status)")
            }
        default:
            print("Error: \(status)")
        }
    }

    
    func b_() {
        view.addSubview(datePicker)
    }
    
    func a_() {
        stackView.translatesAutoresizingMaskIntoConstraints = false
        
        stackView.isLayoutMarginsRelativeArrangement = true
        
        view.addSubview(stackView)
        
        stackView.topAnchor.constraint(equalTo: view.topAnchor, constant: 100).isActive = true
        stackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 0).isActive = true
        stackView.heightAnchor.constraint(equalToConstant: 56).isActive = true
        stackView.widthAnchor.constraint(equalToConstant: 280).isActive = true
        
        let button = UIButton()
        button.backgroundColor = .orange
        stackView.addArrangedSubview(button)
        let btn = UIButton()
        btn.backgroundColor = .yellow
        stackView.addArrangedSubview(btn)
//        stackView.arrangedSubviews.forEach {
//            $0.widthAnchor.constraint(equalToConstant: (280-24)/2).isActive = true
//            $0.heightAnchor.constraint(equalToConstant: 56).isActive = true
//        }
        button.leadingAnchor.constraint(equalTo: stackView.leadingAnchor, constant: 8).isActive = true
        btn.trailingAnchor.constraint(equalTo: stackView.trailingAnchor, constant: -8).isActive = true
    }
}

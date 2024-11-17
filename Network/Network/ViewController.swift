//
//  ViewController.swift
//  Network
//
//  Created by STL_QYH on 2022/7/29.
//

import UIKit
import Combine

class ViewController: UIViewController {

    private var cancellables = [AnyCancellable]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        view.backgroundColor = UIColor(named: "ThemeColor")
        
        let apiClient = APIClient(baseURL: "https://jsonplaceholder.typicode.com")
        apiClient.dispatch(FindTodos()).sink(receiveCompletion: { completion in
            print("completion", completion)
        }, receiveValue: { value in
            print("value", value)
        }).store(in: &cancellables)
    }
}


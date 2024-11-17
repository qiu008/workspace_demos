//
//  ViewController.swift
//  TestTableView
//
//  Created by STL_QYH on 2021/11/25.
//

import UIKit

class ViewController: UIViewController {

    lazy var tableView: UITableView = {
        let tv = UITableView(frame: view.bounds, style: .plain)
        tv.dataSource = self
        return tv
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.addSubview(tableView)
        
        //基本上结构体的内存大小与其实例的大小是一致的
//        let example = Example(foo: 8, bar: true)

        print(MemoryLayout<Example>.size)      // 9
        print(MemoryLayout<Example>.stride)    // 16
        print(MemoryLayout<Example>.alignment) // 8
        
        
    }
}

extension ViewController: UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 200
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: "ReusableCell") {
            print("ReusableCell", indexPath.row)
            return cell
        }
        print("TableViewCell", indexPath.row)
//        let cell = UITableViewCell(style: .default, reuseIdentifier: "ReusableCell")
        let cell = TableViewCell(style: .default, reuseIdentifier: "ReusableCell", isVideo: false)
        return cell
    }
}

struct Example {
    let foo: Int  // 8
    let bar: Bool // 1
}


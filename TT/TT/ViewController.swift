//
//  ViewController.swift
//  TT
//
//  Created by STL_QYH on 2024/12/24.
//

import UIKit

import UIKit

class ViewController: UIViewController {
    
    var tableView: UITableView!
    var data: [String] = ["Item 1", "Item 2", "Item 3"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 初始化 tableView
        tableView = UITableView(frame: view.bounds, style: .insetGrouped)
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        tableView.dragInteractionEnabled = true  // 启用拖动
        tableView.dragDelegate = self  // 设置 dragDelegate
        view.addSubview(tableView)
    }
}
extension ViewController: UITableViewDataSource {
    ///
    func numberOfSections(in tableView: UITableView) -> Int {
        return 3
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return data.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = data[indexPath.row]
        return cell
    }
    
    func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        if indexPath.section < 2 {
            return false
        }
        return true
    }
    
    func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
        // 更新数据源
        let item = data[sourceIndexPath.row]
        data.remove(at: sourceIndexPath.row)
        data.insert(item, at: destinationIndexPath.row)
    }
}

extension ViewController: UITableViewDelegate {
    ///
    func tableView(_ tableView: UITableView, targetIndexPathForMoveFromRowAt sourceIndexPath: IndexPath, toProposedIndexPath proposedDestinationIndexPath: IndexPath) -> IndexPath {
        if sourceIndexPath.section < 2 || proposedDestinationIndexPath.section < 2 {
            return sourceIndexPath
        }
        return proposedDestinationIndexPath
    }
}

extension ViewController: UITableViewDragDelegate {
    ///
    func tableView(_ tableView: UITableView, itemsForBeginning session: UIDragSession, at indexPath: IndexPath) -> [UIDragItem] {
        if indexPath.section < 2 {
            return []
        }
        // 创建拖动项
        let item = data[indexPath.row]
        let itemProvider = NSItemProvider(object: item as NSString)
        let dragItem = UIDragItem(itemProvider: itemProvider)
        return [dragItem]
    }
}

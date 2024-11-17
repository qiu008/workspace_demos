//
//  MoreViewController.swift
//  OpenBook
//
//  Created by STL_QYH on 2022/3/2.
//

import UIKit

enum TestEnum: Int {
    case none
    case test
}

class MoreViewController: UIViewController {

//    let vcIT = UIPercentDrivenInteractiveTransition()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "orange"
        view.backgroundColor = .orange
//        TestEnum.allCases
        // Do any additional setup after loading the view.
//        let tv = UITableView(frame: .zero, style: UITableView.Style.grouped)
//        let cell = UITableViewCell(style: UITableViewCell.CellStyle.default, reuseIdentifier: "")
//        UITableView.Style.allCases
//        UITableViewCell.CellStyle.allCases
    }
}

//extension MoreViewController: UINavigationControllerDelegate {
//
//    func navigationController(_ navigationController: UINavigationController, interactionControllerFor animationController: UIViewControllerAnimatedTransitioning) -> UIViewControllerInteractiveTransitioning? {
//        if animationController is OpenBookAnimation {
//            return vcIT
//        }
//        return nil
//    }
//
//    func navigationController(_ navigationController: UINavigationController, animationControllerFor operation: UINavigationController.Operation, from fromVC: UIViewController, to toVC: UIViewController) -> UIViewControllerAnimatedTransitioning? {
//        if fromVC is ViewController || toVC is ViewController {
//            return OpenBookAnimation(operation: operation)
//        }
//        return nil
//    }
//}

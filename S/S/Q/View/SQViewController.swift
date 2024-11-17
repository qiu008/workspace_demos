//
//  SQViewController.swift
//  S
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

import UIKit

class QViewController: UIViewController {

    var output: QViewOutput!

    // MARK: override
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .brown
        setupNavItems()
        setupSubViews()
        addObserverForNoti()
    }
}

// MARK: - Assistant

extension QViewController {

    func setupNavItems() {}
    
    func setupSubViews() {}
    
    func addObserverForNoti() {}
}

// MARK: - Network

extension QViewController {}

// MARK: - Delegate

extension QViewController {}

// MARK: - Selector

@objc extension QViewController {

    func onClickQBtn(_ sender: UIButton) {}
    
    func onRecvQNoti(_ noti: Notification) {}
}

// MARK: - QViewInput 

extension QViewController: QViewInput {}

// MARK: - QModuleBuilder

class QModuleBuilder {

    class func setupModule(handler: QModuleOutput? = nil) -> (UIViewController, QModuleInput) {
        let viewController = QViewController()
        let array: [Any] = [0, "1", [2]]
        print(array is Array<String>)
        let presenter = QPresenter()
        presenter.view = viewController
        presenter.transitionHandler = viewController
        presenter.outer = handler
        viewController.output = presenter
       
        let interactor = QInteractor()
        interactor.output = presenter
        presenter.interactor = interactor
        
        let input = presenter
        
        return (viewController, input)
    }
}

//
//  StestViewController.swift
//  S
//
//  Created by 邱耀辉 on 07/09/2020.
//  Copyright © 2020 STL. All rights reserved.
//

import UIKit

class testViewController: UIViewController {

    var output: testViewOutput!

    // MARK: override
    override func viewDidLoad() {
        super.viewDidLoad()

        setupNavItems()
        setupSubViews()
        addObserverForNoti()
    }
}

// MARK: - Assistant

extension testViewController {

    func setupNavItems() {}
    
    func setupSubViews() {}
    
    func addObserverForNoti() {}
}

// MARK: - Network

extension testViewController {}

// MARK: - Delegate

extension testViewController {}

// MARK: - Selector

@objc extension testViewController {

    func onClicktestBtn(_ sender: UIButton) {}
    
    func onRecvtestNoti(_ noti: Notification) {}
}

// MARK: - testViewInput 

extension testViewController: testViewInput {}

// MARK: - testModuleBuilder

class testModuleBuilder {

    class func setupModule(handler: testModuleOutput? = nil) -> (UIViewController, testModuleInput) {
        let viewController = testViewController()
        
        let presenter = testPresenter()
        presenter.view = viewController
        presenter.transitionHandler = viewController
        presenter.outer = handler
        viewController.output = presenter
       
        let interactor = testInteractor()
        interactor.output = presenter
        presenter.interactor = interactor
        
        let input = presenter
        
        return (viewController, input)
    }
}

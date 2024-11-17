//
//  RQRQConfigurator.swift
//  R
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

import UIKit

class QModuleConfigurator {

    func configureModuleForViewInput<UIViewController>(viewInput: UIViewController) {

        if let viewController = viewInput as? QViewController {
            configure(viewController: viewController)
        }
    }

    private func configure(viewController: QViewController) {

        let router = QRouter()

        let presenter = QPresenter()
        presenter.view = viewController
        presenter.router = router

        let interactor = QInteractor()
        interactor.output = presenter

        presenter.interactor = interactor
        viewController.output = presenter
    }

}

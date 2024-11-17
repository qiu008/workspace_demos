//
//  SQPresenter.swift
//  S
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

import UIKit

typealias QPresenterView = QViewOutput
typealias QPresenterInteractor = QInteractorOutput

class QPresenter {

    weak var view: QViewInput!
    weak var transitionHandler: UIViewController!
    var interactor: QInteractorInput!
    var outer: QModuleOutput?
}

extension QPresenter {

    var nav: UINavigationController? {
        return transitionHandler.navigationController
    }
}

// MARK: - QPresenterView

extension QPresenter: QPresenterView {}

// MARK: - QPresenterInteractor

extension QPresenter: QPresenterInteractor {}

// MARK: - QModuleInput

extension QPresenter: QModuleInput {}

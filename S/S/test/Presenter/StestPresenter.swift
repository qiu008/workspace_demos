//
//  StestPresenter.swift
//  S
//
//  Created by 邱耀辉 on 07/09/2020.
//  Copyright © 2020 STL. All rights reserved.
//

import UIKit

typealias testPresenterView = testViewOutput
typealias testPresenterInteractor = testInteractorOutput

class testPresenter {

    weak var view: testViewInput!
    weak var transitionHandler: UIViewController!
    var interactor: testInteractorInput!
    var outer: testModuleOutput?
}

extension testPresenter {

    var nav: UINavigationController? {
        return transitionHandler.navigationController
    }
}

// MARK: - testPresenterView

extension testPresenter: testPresenterView {}

// MARK: - testPresenterInteractor

extension testPresenter: testPresenterInteractor {}

// MARK: - testModuleInput

extension testPresenter: testModuleInput {}

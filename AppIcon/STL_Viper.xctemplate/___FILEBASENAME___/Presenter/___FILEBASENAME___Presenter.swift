//___FILEHEADER___

import UIKit

typealias ___VARIABLE_productName___PresenterView = ___VARIABLE_productName___ViewOutput
typealias ___VARIABLE_productName___PresenterInteractor = ___VARIABLE_productName___InteractorOutput

class ___VARIABLE_productName___Presenter {

    weak var view: ___VARIABLE_productName___ViewInput?
    weak var transitionHandler: UIViewController?
    var interactor: ___VARIABLE_productName___InteractorInput!
    var outer: ___VARIABLE_productName___ModuleOutput?
}

extension ___VARIABLE_productName___Presenter {

    var nav: UINavigationController? {
        transitionHandler?.navigationController
    }
}

// MARK: - ___VARIABLE_productName___PresenterView

extension ___VARIABLE_productName___Presenter: ___VARIABLE_productName___PresenterView {}

// MARK: - ___VARIABLE_productName___PresenterInteractor

extension ___VARIABLE_productName___Presenter: ___VARIABLE_productName___PresenterInteractor {}

// MARK: - ___VARIABLE_productName___ModuleInput

extension ___VARIABLE_productName___Presenter: ___VARIABLE_productName___ModuleInput {}

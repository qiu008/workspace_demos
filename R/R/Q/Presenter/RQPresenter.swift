//
//  QRQPresenter.swift
//  R
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

class QPresenter: QModuleInput, QViewOutput, QInteractorOutput {

    weak var view: QViewInput!
    var interactor: QInteractorInput!
    var router: QRouterInput!

    func viewIsReady() {

    }
}

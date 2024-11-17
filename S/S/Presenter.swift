//
//  Presenter.swift
//  S
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

class Presenter {
    weak var view: ViewController?
}

extension Presenter: QModuleOutput {
    func openQScene() {
        let (vc, _) = QModuleBuilder.setupModule(handler: self)
        view?.present(vc, animated: true, completion: {})
    }
}

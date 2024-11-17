//
//  StestProtocols.swift
//  S
//
//  Created by 邱耀辉 on 07/09/2020.
//  Copyright © 2020 STL. All rights reserved.
//

// MARK: - ModuleProtocol

/// OuterSide -> test
protocol testModuleInput: class {}

/// test -> OuterSide
protocol testModuleOutput: class {}

// MARK: - SceneProtocol

/// Presenter -> View
protocol testViewInput: class {}

/// View -> Presenter
protocol testViewOutput {}

/// Presenter -> Interactor
protocol testInteractorInput {}

/// Interactor -> Presenter
protocol testInteractorOutput: class {}

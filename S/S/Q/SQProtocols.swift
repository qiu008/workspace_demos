//
//  SQProtocols.swift
//  S
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

// MARK: - ModuleProtocol

/// OuterSide -> Q
protocol QModuleInput: class {}

/// Q -> OuterSide
protocol QModuleOutput: class {}

// MARK: - SceneProtocol

/// Presenter -> View
protocol QViewInput: class {}

/// View -> Presenter
protocol QViewOutput {}

/// Presenter -> Interactor
protocol QInteractorInput {}

/// Interactor -> Presenter
protocol QInteractorOutput: class {}

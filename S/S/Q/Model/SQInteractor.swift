//
//  SQInteractor.swift
//  S
//
//  Created by qiuyaohui on 21/08/2020.
//  Copyright © 2020 STL. All rights reserved.
//

// MARK: - Entity

class QEntity {}

// MARK: - Interactor

class QInteractor {

    weak var output: QInteractorOutput?
}

extension QInteractor: QInteractorInput {}

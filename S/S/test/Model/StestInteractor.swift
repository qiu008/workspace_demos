//
//  StestInteractor.swift
//  S
//
//  Created by 邱耀辉 on 07/09/2020.
//  Copyright © 2020 STL. All rights reserved.
//

// MARK: - Entity

class testEntity {}

// MARK: - Interactor

class testInteractor {

    weak var output: testInteractorOutput?
}

extension testInteractor: testInteractorInput {}

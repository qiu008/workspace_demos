//
//  ViewController.swift
//  S
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    let output = Presenter()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        output.view = self
        
        let someClass = SomeClass()
        someClass.originalMethod()
        someClass.orignalMethodWithParameters(for: "Param1", param2: "Param2")
        print(someClass.originalMethodWithParametersAndReturnType(param: "Param"))
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        output.openQScene()
    }
}

class SomeClass {
    dynamic func originalMethod() {
        print("I am the original method")
    }

    dynamic func orignalMethodWithParameters(for param1: String, param2: String) {
        print("I am the original method with parameters - param1: \(param1) - param2: \(param2)")
    }

    dynamic func originalMethodWithParametersAndReturnType(param: String) -> Bool {
        print("I am the original method with parameter - param: \(param) - and return type: Bool")
        return true
    }
}

extension SomeClass {
    @_dynamicReplacement(for: originalMethod)
    func replacementMethod() {
        print("I'm the replacement method")
    }

    @_dynamicReplacement(for: orignalMethodWithParameters(for:param2:))
    func replacementMethodWithParameters(param1: String, param2: String) {
        print("I am the replacement method with parameters - param1: \(param1) - param2: \(param2)")
    }

    @_dynamicReplacement(for: originalMethodWithParametersAndReturnType(param:))
    func replacement_withParameters_andReturnType(param: String) -> Bool {
        print("I am the replacement method with parameter - param: \(param) - and return type: Bool")
        return false
    }
}
/**替代方案
 如果可能的话，你应该考虑以下替代方案来替代交换，因为相对来说以下方案更安全，更易于维护：
 子类化：使用集成子类化和重写方法通常是一种更安全和更易于维护的方法。
 组合：使用组合和包装对象可以提供类似的好处，而无需修改原始类。
 依赖注入：通过协议或委托注入行为，可以在不进行运行时修改的情况下实现灵活性。
 总之，方法交换是一种强大的技术工具，但也需要谨慎使用。相信读完本文能帮助你更好地理解和运用这项技术，也能在面试中应对自如。
*/

//
//  main.swift
//  QAQ
//
//  Created by STL_QYH on 2021/4/1.
//

import Foundation

protocol Drawing {
  func render()
}

extension Drawing {
  func circle() { print("protocol") }
  func render() { circle() }
}

class SVG: Drawing {
  func circle() { print("class") }
}

SVG().render()
SVG().circle()


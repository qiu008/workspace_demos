//
//  TestsTests.swift
//  TestsTests
//
//  Created by STL_QYH on 2020/11/27.
//

import XCTest
@testable import Tests

class TestsTests: XCTestCase {

    var sut: ViewController?
    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
        sut = UIStoryboard(name: "Main", bundle: nil).instantiateInitialViewController() as? ViewController
        UIApplication.shared.windows.first?.rootViewController = sut
        
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        sut?.showAlert(UIButton())
    }

    func testExample() throws {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testPerformanceExample() throws {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }

}

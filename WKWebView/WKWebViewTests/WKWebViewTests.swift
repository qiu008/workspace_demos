//
//  WKWebViewTests.swift
//  WKWebViewTests
//
//  Created by STL_QYH on 2023/9/20.
//

// WKWebView -> 工程名
@testable import WKWebView

import XCTest

final class WKWebViewTests: XCTestCase {

    var counter: Counter!
    
    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
        counter = Counter()
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        counter = nil
    }

    func testExample() throws {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
        // Any test you write for XCTest can be annotated as throws and async.
        // Mark your test throws to produce an unexpected failure when your test encounters an uncaught error.
        // Mark your test async to allow awaiting for asynchronous code to complete. Check the results with assertions afterwards.
        
//        counter.increment()
//        XCTAssertEqual(counter.value, 1)
//        increment()
    }

    func testPerformanceExample() throws {
        // This is an example of a performance test case.
        measure {
            // Put the code you want to measure the time of here.
        }
    }
    
    // test 命名开头使其成为测试函数
    func testIncrement() {
        counter.increment()
        XCTAssertEqual(counter.value, 1)
    }
}

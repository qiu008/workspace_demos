//
//  ViewController.swift
//  Symbol
//
//  Created by STL_QYH on 2022/10/24.
//

import UIKit

class ViewController: UIViewController {

    // OS_dispatch_queue_serial
//    lazy var queue = DispatchQueue(label: "serial")
    lazy var queue = DispatchQueue(label: "concurrent", attributes: .concurrent)
    lazy var jam = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        view.backgroundColor = .brown
        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(1)) {
            self.jam = false
            print(Thread.current, 0)
            print(Date(), 0)
        }
//        DispatchQueue.global().async {
//            print(Thread.current, 2)
//            print(Date(), 2)
//            while self.jam {
//                print(Date(), "while")
//            }
//            print("end")
//        }
        queue.async {
            print(Thread.current, 1)
        }
        queue.async {
            print(Thread.current, 2)
            while self.jam {
                print("while")
            }
            print("end")
        }
        queue.async {
            print(Thread.current, 3)
        }
        queue.async {
            print(Thread.current, 4)
        }
        queue.async {
            print(Thread.current, 5)
        }
        queue.async {
            print(Thread.current, 6)
        }
        queue.async {
            print(Thread.current, 7)
        }
        queue.async {
            print(Thread.current, 8)
        }
        queue.async {
            print(Thread.current, 9)
        }
        queue.async {
            print(Thread.current, 10)
        }
        queue.async {
            print(Thread.current, 11)
        }
        queue.async {
            print(Thread.current, 12)
        }
        queue.async {
            print(Thread.current, 13)
        }
        queue.async {
            print(Thread.current, 14)
        }
        queue.async {
            print(Thread.current, 15)
        }
        queue.async {
            print(Thread.current, 16)
        }
        queue.async {
            print(Thread.current, 17)
        }
        queue.async {
            print(Thread.current, 18)
        }
        queue.async {
            print(Thread.current, 19)
        }
        queue.async {
            print(Thread.current, 20)
        }
        queue.async {
            print(Thread.current, 21)
        }
        queue.async {
//            UIAlertAction
            print(Thread.current, 22)
        }
    }
}

extension ViewController {
    // 将方法重构为异步
//    func fetchImages(completion: @escaping (Result<[UIImage], Error>) -> Void) {}
    
    // Covert Function to Async
//    func fetchImages() async throws -> [UIImage] {}
    
    // Add Async Alternative
    @available(*, deprecated, renamed: "fetchImages()")
    func fetchImages(completion: @escaping (Result<[UIImage], Error>) -> Void) {
//        Task {
//            do {
//                let result = try await fetchImages()
//                completion(.success(result))
//            } catch {
//                completion(.failure(error))
//            }
//        }
    }
//    func fetchImages() async throws -> [UIImage] {}
    
    // Add Async Wrapper
//    @available(*, renamed: "fetchImages()")
//    func fetchImages(completion: @escaping (Result<[UIImage], Error>) -> Void) {}
//
//    func fetchImages() async throws -> [UIImage] {
//        return try await withCheckedThrowingContinuation { continuation in
//            fetchImages() { result in
//                continuation.resume(with: result)
//            }
//        }
//    }
    
}

class TV: UIView {
    
    override func draw(_ rect: CGRect) {
        super.draw(rect)
        
    }
}

actor TestActor {
    
}

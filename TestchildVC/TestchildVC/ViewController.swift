//
//  ViewController.swift
//  TestchildVC
//
//  Created by STL_QYH on 2021/6/24.
//

import UIKit
//import TestFramework

let width = UIScreen.main.bounds.size.width
let height = UIScreen.main.bounds.size.height
let test = Notification.Name("test")

class ViewController: UIViewController {

    weak var p: SomeProtocol?
    
    lazy var tView: UIView = {
        let tv = UIView(frame: CGRect(x: 0, y: height, width: width, height: 360))
        tv.backgroundColor = .black
        return tv
    }()
    
    lazy var animationView: UIView = {
        let tv = UIView(frame: CGRect(x: width, y: 100, width: 100, height: 100))
        tv.backgroundColor = .black
        return tv
    }()
    
    weak var someViewRef: UIView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
//        TestView().testFunc()
//        StaticLibrary
        view.addSubview(tView)
        view.addSubview(animationView)
//        loadBigData()
        var a = [1,2,3] //值类型被复制的时机是值类型的内容发生改变时
        withUnsafePointer(to: &a) { p in
            print("ap", p)
        }
        var b = a //内容没改地址就已经变了，就是说被复制了, 此时 a 和 b 的内存地址已经不同了
        withUnsafePointer(to: &b) { p in
            print("bp", p)
        }
        b.append(5) // b 的内存地址再次改变？
        withUnsafePointer(to: &b) { p in
            print("bp", p)
        }
        
        NotificationCenter.default.addObserver(forName: test, object: "nil", queue: nil) { sender in
            print("Notification", sender.name, sender.object ?? "nil", sender.userInfo ?? "nil")
        } //object：收的时候有，发的时候一定的有；
        NotificationCenter.default.post(name: test, object: nil)
        
//        NSURLConnection
//        URLSession.shared.dataTask(with: URLRequest(url: URL(string: "")!)) { data, response, error in
//
//        }
        
        someViewRef = UIView(frame: CGRect(x: 100, y: 50, width: 100, height: 100))
        someViewRef?.backgroundColor = .red

    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
//        super.touchesEnded(touches, with: event)
        let tvc = TestViewController()
        present(tvc, animated: true)
//        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(3)) { [weak tvc] in
//            tvc?.dismiss(animated: false)
//        }
//        if tView.frame.minY == height {
//            UIView.animate(withDuration: 0.25) {
//                self.tView.frame = CGRect(x: 0, y: height - 360, width: width, height: 360)
//            }
//        } else {
//            UIView.animate(withDuration: 0.25) {
//                self.tView.frame = CGRect(x: 0, y: height, width: width, height: 360)
//            }
//        }
        
//        basicAnimation()
//        appearKeyframeAnimation()
    }
    
    func basicAnimation() {
        animationView.layer.removeAnimation(forKey: "nil")
        let base = CABasicAnimation()
        base.keyPath = "position"
        base.fromValue = CGPoint(x: width, y: 100)
        base.toValue = CGPoint(x: 50, y: 100)
//        base.byValue = CGPoint(x: 100, y: 200)
        base.duration = 2
//        base.autoreverses = true
        base.isRemovedOnCompletion = false
        base.fillMode = .forwards
//        base.delegate = self
        animationView.layer.add(base, forKey: "nil")
    }
    
    func appearKeyframeAnimation() {
        let key = "appearKeyframeAnimation"
        if let _ = animationView.layer.animation(forKey: key) {
            animationView.layer.removeAnimation(forKey: key)
        }
        let ka = CAKeyframeAnimation()
        ka.keyPath = "position"
        ka.timingFunction = CAMediaTimingFunction(name: .linear)
        ka.isRemovedOnCompletion = false
        ka.fillMode = .forwards //前提是isRemovedOnCompletion = false
        ka.duration = 3
        let p = CGPoint(x: 50, y: 100 + 50)
        let p0 = CGPoint(x: 50 + 15, y: 100 + 50)
//        ka.values = [animationView.center, p, p0]
        let p1 = CGPoint(x: -50, y: 100 + 50)
        ka.values = [animationView.center, p, p0, p1]
//        ka.keyTimes = [0, 0.5, 0.7, 0.9, 1]
        ka.delegate = self
        animationView.layer.add(ka, forKey: key)
    }
    
    func disappearKeyframeAnimation() {
        let key = "disappearKeyframeAnimation"
        if let _ = animationView.layer.animation(forKey: key) {
            animationView.layer.removeAnimation(forKey: key)
        }
        let ka = CAKeyframeAnimation()
        ka.keyPath = "position"
        ka.timingFunction = CAMediaTimingFunction(name: .easeIn)
        ka.isRemovedOnCompletion = false
        ka.fillMode = .forwards //前提是isRemovedOnCompletion = false
        ka.duration = 1
        let p0 = CGPoint(x: 50 + 15, y: 100 + 50)
        let p1 = CGPoint(x: -50, y: 100 + 50)
        ka.values = [p0, p1]
        animationView.layer.add(ka, forKey: key)
    }
    
    deinit {
        print("\(self)", "释放")
    }
}

extension ViewController: CAAnimationDelegate {

    func animationDidStop(_ anim: CAAnimation, finished flag: Bool) {
//        disappearKeyframeAnimation()
    }
}

func autoreleasepool_swift(_ code: () -> Void) {
//    NSLocalizedString("", tableName: "", bundle: Bundle.main, value: "", comment: "")
//    assert(true, "")
    code()
}

extension ViewController {
    
    func loadBigData() {
        if let path = Bundle.main.path(forResource: "big", ofType: "jpg"), let url = URL(string: path) {
            for _ in 1...10000 {
//                let _ = try? Data(contentsOf: url)
//                Thread.sleep(forTimeInterval: 0.5)
//                autoreleasepool_swift {
//                    let _ = try? Data(contentsOf: url)
//                }
                autoreleasepool {
                    let _ = try? Data(contentsOf: url)
//                    let _ = NSData(contentsOfFile: path)
                }
            }
        }
    }
}

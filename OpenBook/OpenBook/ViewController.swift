//
//  ViewController.swift
//  OpenBook
//
//  Created by STL_QYH on 2022/3/2.
//

import UIKit
import WebKit

class Person {
    var age = 10
}
/*
 let p: Person? = Person()
 (lldb) x/8gx 0x600003979380
 0x600003979380: 0x0000000101b875c8 0x0000000000000003
 0x600003979390: 0x000000000000000a 0x0000000000000000
 0x6000039793a0: 0x0000000000000000 0x0000000000000000
 0x6000039793b0: 0x0000000000000000 0x0000000000000000
 (lldb) x/8gx 0x600003979380
 0x600003979380: 0x0000000101b875c8 0x0000000200000003
 0x600003979390: 0x000000000000000a 0x0000000000000000
 0x6000039793a0: 0x0000000000000000 0x0000000000000000
 0x6000039793b0: 0x0000000000000000 0x0000000000000000
 (lldb) x/8gx 0x600003979380
 0x600003979380: 0x0000000101b875c8 0x0000000200000005
 0x600003979390: 0x000000000000000a 0x0000000000000000
 0x6000039793a0: 0x00007fff864dafe0 0x0000000000000000
 0x6000039793b0: 0x0000000000000000 0x0000000000000002
 
 let p: Person = Person()
 (lldb) x/8gx 0x60000282bb60
 0x60000282bb60: 0x0000000101b2f5b8 0x0000000000000003
 0x60000282bb70: 0x000000000000000a 0x0000000000000000
 0x60000282bb80: 0x00000009a0080001 0x00007fff8a8cd3a0
 0x60000282bb90: 0x0000000000000000 0x00007fff865c15f8
 (lldb) x/8gx 0x60000282bb60
 0x60000282bb60: 0x0000000101b2f5b8 0x0000000200000003
 0x60000282bb70: 0x000000000000000a 0x0000000000000000
 0x60000282bb80: 0x00000009a0080001 0x00007fff8a8cd3a0
 0x60000282bb90: 0x0000000000000000 0x00007fff865c15f8
 (lldb) x/8gx 0x60000282bb60
 0x60000282bb60: 0x0000000101b2f5b8 0x0000000200000005
 0x60000282bb70: 0x000000000000000a 0x0000000000000000
 0x60000282bb80: 0x00000009a0080001 0x00007fff8a8cd3a0
 0x60000282bb90: 0x0000000000000000 0x00007fff865c15f8
 */
class ViewController: UIViewController {
    
    //    let vcIT = UIPercentDrivenInteractiveTransition()
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        switch keyPath {
        case "estimatedProgress":
            print("change", change ?? "is nil")
        default:
            break
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "red"
        view.backgroundColor = .red
        // Do any additional setup after loading the view.
        let wv = WKWebView(frame: view.bounds, configuration: WKWebViewConfiguration())
        wv.addObserver(self, forKeyPath: "estimatedProgress", options: .new, context: nil)
        wv.load(URLRequest(url: URL(string: "https://online.fliphtml5.com/eftjg/vddt/#p=1")!))
        view.addSubview(wv)
        
        //        navigationController?.delegate = self
        
        //        let p0: Person? = Person()
        //        print("")
        //        //1
        //        let p1 = p0
        //        // 2
        //        let p2 = p0
        //        // 3
        //        unowned var p3 = p0
        //        // 4
        //        print(p1)
        //        weak var p4 = p0
        //        print(p2)
        
        // 强引用计数 无主引用 弱引用
        var s0: Person? = Person() // 0 1
        var s1 = s0 // 1 1
        var s2 = s1 // 2 1
        weak var s3 = s2 // 2 1 2
        weak var s4 = s3 // 2 1 3
        print(s4)
        /*
         (lldb) x/8gx 0x60000023e1a0
         0x60000023e1a0: 0x00000001056ce5a8 0x0000000200000003
         0x60000023e1b0: 0x000000000000000a 0x0000000000000000
         0x60000023e1c0: 0x0000000000000000 0x0000000000000000
         0x60000023e1d0: 0x0000000000000000 0x0000000000000000
         (lldb) x/8gx 0x60000023e1a0
         0x60000023e1a0: 0x00000001056ce5a8 0x0000000400000003
         0x60000023e1b0: 0x000000000000000a 0x0000000000000000
         0x60000023e1c0: 0x0000000000000000 0x0000000000000000
         0x60000023e1d0: 0x0000000000000000 0x0000000000000000
         (lldb) x/8gx 0x60000023e1a0
         0x60000023e1a0: 0x00000001056ce5a8 0x0000000600000003
         0x60000023e1b0: 0x000000000000000a 0x0000000000000000
         0x60000023e1c0: 0x0000000000000000 0x0000000000000000
         0x60000023e1d0: 0x0000000000000000 0x0000000000000000
         (lldb) x/8gx 0x60000023e1a0
         0x60000023e1a0: 0x00000001056ce5a8 0xc0000c00000493a4
         0x60000023e1b0: 0x000000000000000a 0x0000000000000000
         0x60000023e1c0: 0x0000000000000000 0x0000000000000000
         0x60000023e1d0: 0x0000000000000000 0x0000000000000000
         (lldb) x/8gx 0x60000023e1a0
         0x60000023e1a0: 0x00000001056ce5a8 0xc0000c00000493a4
         0x60000023e1b0: 0x000000000000000a 0x0000000000000000
         0x60000023e1c0: 0x00003e9d4bfde1c0 0x00000000006007fb
         0x60000023e1d0: 0x00007fff6de49aef 0x0000000000000027
         */
    }
    
    //    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    //        super.touchesBegan(touches, with: event)
    //        let vc = MoreViewController()
    //        navigationController?.pushViewController(vc, animated: true)
    //    }
}

extension ViewController: UINavigationControllerDelegate {
    
    func navigationController(_ navigationController: UINavigationController, animationControllerFor operation: UINavigationController.Operation, from fromVC: UIViewController, to toVC: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        switch operation {
        case .push:
            if fromVC is Self {
                //                transition.coverImage = coverImage
                //                coverImage = nil
                return OpenBookAnimation()
            }
        case .pop:
            if toVC is Self {
                //                transition.coverImage = nil
                return OpenBookAnimation()
            }
        default:
            break
        }
        return nil
    }
}

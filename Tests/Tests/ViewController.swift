//
//  ViewController.swift
//  Tests
//
//  Created by STL_QYH on 2020/11/27.
//

import UIKit
import StoreKit

final class Ref<T> {
    var val : T
    init(_ v : T) {val = v}
}

struct Box<T> {
    var ref : Ref<T>
    init(_ x : T) { ref = Ref(x) }
    
    var value: T {
        get { return ref.val }
        set {
            if (!isKnownUniquelyReferenced(&ref)) {
                ref = Ref(newValue)
                return
            }
            ref.val = newValue
        }
    }
}

struct Persion {
    var name = "oldbirds"
}

class ViewController: UIViewController {
    var actionString: String?
    
    lazy var fView: UIView = {
        let view = UIView(frame: self.view.bounds)
        view.backgroundColor = .orange
        return view
    }()
    
    lazy var tView: UIView = {
        let view = UIView(frame: self.view.bounds)
        view.backgroundColor = .cyan
        return view
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        let a = InputTextField(frame: CGRect(x: 0, y: 100, width: 200, height: 30))
        a.borderStyle = .roundedRect
        view.addSubview(a)
        
        //        view.addSubview(tView)
        //        view.addSubview(fView)
        
        //UIView.transition(from: fView, to: tView, duration: 0.25) //, options: .transitionFlipFromLeft
        
        let oldbirds = Persion()
        var box = Box(oldbirds)
        var box2 = box // box2 与 box 共享 box.ref
        print(box.value.name) // oldbirds
        print(box2.value.name) // oldbirds
        
        box2.value.name = "like" // box2 会创建新的 ref
        print(box.value.name) // oldbirds
        print(box2.value.name) // like
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            //            UIView.transition(from: self.fView, to: self.tView, duration: 1, options: .autoreverse) //
            
            //            UIView.transition(with: self.tView, duration: 1, options: .allowAnimatedContent) {
            //
            //            } completion: { (end) in
            //                print(end)
            //            }
            
        }
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        // 应用内打开下载页
        let storeVC = SKStoreProductViewController()
        storeVC.delegate = self
        let value = SocialDownloadEnum.QQ.rawValue
        let dict = [SKStoreProductParameterITunesItemIdentifier: value]
        storeVC.loadProduct(withParameters: dict) { (result, error) in
            guard error == nil else { return }
        }
        self.present(storeVC, animated: true, completion: nil)
    }
    
    @IBAction func showAlert(_ sender: UIButton) {
        let alertViewController = UIAlertController(title: "Test Title", message: "Message", preferredStyle: .alert)
        let okAction = UIAlertAction(title: "OK", style: .default) { (action) -> Void in
            self.actionString = "OK"
        }
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel) { (action) -> Void in
            self.actionString = "Cancel"
        }
        alertViewController.addAction(cancelAction)
        alertViewController.addAction(okAction)
        present(alertViewController, animated: true)
    }
}

extension ViewController: SKStoreProductViewControllerDelegate {
    func productViewControllerDidFinish(_ viewController: SKStoreProductViewController) {
        print("SKStoreProductViewController", viewController)
        //self.dismiss(animated: true)
    }
}


protocol AnimalFeed {
    associatedtype CropType: Crop where CropType.FeedType == Self
    static func grow() -> CropType
}
protocol Crop {
    associatedtype FeedType: AnimalFeed// where FeedType.CropType == Self
    func harvest () -> FeedType
}
extension Farm {
    private func feedAnimal(_ animal: some Animal) {
        let crop = type(of: animal).Feed.grow()
        let feed = crop.harvest()
//        let SomeFeed = type(of: animal).Feed
//        if feed is SomeFeed {
//            animal.eat(feed as! SomeFeed)
//        }
        animal.eat(feed)
        /*
         这里没法推断Animal.Feed、Crop.FeedType是同一个类型
         尽管事实上，它们本来就是同一个类型。
         对于同一种动物来讲，它们所吃的食物是相同的，而收获这种食物的植物也相同（吃多种食物怎么处理呢？）
         但是我们声明的协议中并没有将这层关系表达出来。
         添加以下限制
         where CropType.FeedType == Self
         以下限制不必加
         where FeedType.CropType == Self
         */
    }
}

protocol Food {
    
}

protocol Animal {
    associatedtype Feed: AnimalFeed
    func eat(_ food: Feed)
    
    associatedtype CommodityType: Food
    func produce() -> CommodityType
}

extension Animal {
    
}

//struct Hay {
//
//}
//struct Cow: Animal {
//    func eat(_ food: Hay) {}
//}
//
//struct Horse: Animal {
//      func eat(_ food: Carrot) {}
//}
//
//struct Chicken: Animal {
//      func eat(_ food: Grain) {}
//}

struct Farm {
    func feed(_ animal: some Animal) {
        let crop = type(of: animal).Feed.grow()
        let feed = crop.harvest()
        animal.eat(feed)
    }
//    func feedAll(_ animals: [some Animal]) {
//        animals.forEach { animal in
//            let crop = type(of: animal).Feed.grow()
//            let feed = crop.harvest()
//            animal.eat(feed)
//        }
//    }
    func feedAll(_ animals: [any Animal]) {
        animals.forEach { animal in
//            animal.eat(<#T##food: Animal.Feed##Animal.Feed#>)
        }
        for animal in animals {
//            let crop = type(of: animal).Feed.grow()
//            let feed = crop.harvest()
//            animal.eat(feed)
            feed(animal)
        }
        animals.forEach { animal in
            feed(animal)
        }
    }
    
    func produceCommodities(_ animals: [any Animal]) -> [any Food] {
        animals.map { animal in
            animal.produce()
        }
    }
}

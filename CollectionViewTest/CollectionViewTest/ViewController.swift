//
//  ViewController.swift
//  CollectionViewTest
//
//  Created by STL_QYH on 2021/2/20.
//

import UIKit

class ViewController: UIViewController {

    let screenWidth = UIScreen.main.bounds.size.width
    
    let count = 5
    
    lazy var tableView: UITableView = {
        let tv = UITableView(frame: view.bounds, style: .plain)
        let reuseId = "DynamicTableViewCell" + "\(count)"
        tv.register(DynamicTableViewCell.self, forCellReuseIdentifier: reuseId)
        return tv
    }()
    
    lazy var layout: UICollectionViewFlowLayout = {
        let fl = UICollectionViewFlowLayout()
//        fl.itemSize = CGSize(width: 100, height: 100)
//        fl.headerReferenceSize = CGSize(width: 300, height: 10)
        return fl
    }()
    
    lazy var collectionView: UICollectionView = {
        let cv = UICollectionView(frame: view.bounds, collectionViewLayout: layout)
//        cv.register(UICollectionReusableView.self, forSupplementaryViewOfKind: UICollectionView.elementKindSectionHeader, withReuseIdentifier: "UICollectionReusableView")
        cv.register(UICollectionViewCell.self, forCellWithReuseIdentifier: "UICollectionViewCell")
        cv.dataSource = self
        cv.delegate = self
        return cv
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        view.addSubview(collectionView)
        // Do any additional setup after loading the view.
//        let a = Int.max
//        let a_float = Float(a)
//        print(a_float)
//
//        let b = Int.min
//        let b_float = Float(b)
//        print(b_float)
        
//        var string = "123456"
//        var result = string.dropLast(2)
////        result = string.removeLast(2)
//        string.removeLast(2)
        
//        var a = [0, 1, 2, 3, 4, nil]
//        var b = a.reversed()
//        print(b)
//        print(b.reversed())
        
//        a.reverse()
//        print(a)
//        print("")
        
        let huan = HuanView(frame: CGRect(x: 100, y: 100, width: 100, height: 100))
        view.addSubview(huan)
    }
}

extension ViewController: UICollectionViewDataSource {

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if section == 0 {
            return 3
        }
        return 4
    }
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 2
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return collectionView.dequeueReusableCell(withReuseIdentifier: "UICollectionViewCell", for: indexPath)
    }
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        let crv = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "UICollectionReusableView", for: indexPath)
        return crv
    }
}

extension ViewController: UICollectionViewDelegateFlowLayout {

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if indexPath.section == 0 {
            return CGSize(width: 100, height: 100)
        }
        return CGSize(width: 100, height: 100)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        if section == 0 {
            return 0
        }
        return 0
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        if section == 0 {
            return 8
        }
        return 1
    }
}

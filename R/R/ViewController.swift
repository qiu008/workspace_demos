//
//  ViewController.swift
//  R
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

import UIKit
//import SwiftSyntax
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        if let ciFilter = CIFilter(name: "CIQRCodeGenerator") {
//            ciFilter.setDefaults()
            if let ciImage = ciFilter.outputImage {
                let image = UIImage(ciImage: ciImage)
                let imgView = UIImageView(image: image)
                imgView.contentMode = .scaleAspectFit
                imgView.frame = CGRect(x: 50, y: 100, width: 100, height: 100)
                view.addSubview(imgView)
            }
        }
//        if let ciFilter = CIFilter(name: kCIAttributeFilterName) {
//            print(ciFilter)
//        }
        
        
        var a = [0]
        print(a)
        a = appemdOne(a)
        print(a)
    }
    
    func appemdOne(_ a: [Int]) -> [Int] {
        print(a)
        var aa = a
        print(aa)
        aa.append(1)
        return aa
    }
}

/*
 // 1 NSString *filePath = [[NSBundle mainBundle] pathForResource:@"image" ofType:@"png"]; NSURL*fileNameAndPath = [NSURL fileURLWithPath:filePath];
 // 2 CIImage *beginImage = [CIImage imageWithContentsOfURL:fileNameAndPath];
 // 3 CIFilter *filter = [CIFilter filterWithName:@"CISepiaTone" keysAndValues: kCIInputImageKey, beginImage, @"inputIntensity", @0.8, nil];
 CIImage *outputImage = [filter outputImage];
 // 4 UIImage *newImage = [UIImage imageWithCIImage:outputImage]; self.imageView.image = newImage;
 */

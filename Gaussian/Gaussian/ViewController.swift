//
//  ViewController.swift
//  Gaussian
//
//  Created by STL_QYH on 2023/8/25.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        let label: UILabel = .init(frame: CGRect(x: 6, y: 80, width: 60, height: 21))
        label.text = "321546789123"
        view.addSubview(label)
        let imgVi: UIImageView = .init(frame: CGRect(x: 16, y: 80, width: 50, height: 21))
        view.addSubview(imgVi)
        let rect = imgVi.frame
        DispatchQueue.global().async {
//            let context: CIContext = .init()
            guard let image = UIImage(named: "brokersview"), let ciImage = CIImage(image: image) else {
                return
            }
    //        guard let newImage = image.sd_blurredImage(withRadius: 100) else {
    //            return image
    //        }
    //        return newImage
               // 滤镜效果 高斯模糊
        //    CIFilter *filter = [CIFilter filterWithName:@"CIGaussianBlur"];
        //    [filter setValue:cimage forKey:kCIInputImageKey];
        //    // 指定模糊值 默认为10, 范围为0-100
        //    [filter setValue:[NSNumber numberWithFloat:blur] forKey:@"inputRadius"];
            guard let filter = CIFilter(name: "CIGaussianBlur") else {
                return
            }
            filter.setValue(ciImage, forKey: kCIInputImageKey)
//            filter.setValue(20, forKey: "inputRadius")
//            filter.setValue(10, forKey: kCIInputRadiusKey)
               /**
                *  滤镜效果 VariableBlur
                *  此滤镜模糊图像具有可变模糊半径。你提供和目标图像相同大小的灰度图像为它指定模糊半径
                *  白色的区域模糊度最高，黑色区域则没有模糊。
                */
    //           CIFilter *filter = [CIFilter filterWithName:@"CIMaskedVariableBlur"];
    //           // 指定过滤照片
    //           [filter setValue:ciImage forKey:kCIInputImageKey];
    //           CIImage *mask = [CIImage imageWithCGImage:maskImage.CGImage] ;
    //           // 指定 mask image
    //           [filter setValue:mask forKey:@"inputMask"];
    //           // 指定模糊值  默认为10, 范围为0-100
    //           [filter setValue:[NSNumber numberWithFloat:blur] forKey: @"inputRadius"];
               
    //           // 生成图片
    //           CIContext *context = [CIContext contextWithOptions:nil];
    //           // 创建输出
    //           CIImage *result = [filter valueForKey:kCIOutputImageKey];
            guard let result = filter.value(forKey: kCIOutputImageKey) as? CIImage else {
                return
            }
            
               // 下面这一行的代码耗费时间内存最多,可以开辟线程处理然后回调主线程给imageView赋值
               //result.extent 指原来的大小size
           //    NSLog(@"%@",NSStringFromCGRect(result.extent));
           //    CGImageRef outImage = [context createCGImage: result fromRect: result.extent];
               
    //           CGImageRef outImage = [context createCGImage: result fromRect:CGRectMake(0, 0, 320.0 * 2, 334.0 * 2)];
    //           UIImage * blurImage = [UIImage imageWithCGImage:outImage];
            
            guard let cgImage = CIContext().createCGImage(result, from: rect) else {
    //        guard let cgImage = context.createCGImage(result, from: ciImage.extent) else {
                return
            }
            let _image =  UIImage(cgImage: cgImage)
            DispatchQueue.main.async {
//                imgVi.image = _image
                imgVi.backgroundColor = .init(patternImage: _image)
            }
        }
        
    }


}


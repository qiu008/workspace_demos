import UIKit
import PlaygroundSupport

//打印内存地址
func address(of object: UnsafeRawPointer) -> String {
    let addr = Int(bitPattern: object)
    return NSString(format: "%p", addr) as String
}

final class Box<A> {
  var value: A
  init(_ value: A) {
    self.value = value
  }
}

/// 高斯模糊
struct GaussianBlur {
    private var boxedFilter: Box<CIFilter> = {
        var filter = CIFilter(name: "CIGaussianBlur", parameters: [:])!
        filter.setDefaults()
        return Box(filter)
    }()

    private var filter: CIFilter {
        get { boxedFilter.value }
        set { boxedFilter = Box(newValue) }
    }

    private var filterForWriting: CIFilter {
        mutating get {
          if !isKnownUniquelyReferenced(&boxedFilter) {
            filter = filter.copy() as! CIFilter
            print("😄拷贝filter，\(address(of: &self))")
          } else {
            print("共享filter, \(address(of: &self))")
          }
          return filter
        }
    }

    var inputImage: CIImage {
        get { return filter.value(forKey: kCIInputImageKey) as! CIImage }
        set { filterForWriting.setValue(newValue, forKey: kCIInputImageKey) }
    }

    var radius: Double {
        get { return filter.value(forKey: kCIInputRadiusKey) as! Double }
        set { filterForWriting.setValue(newValue, forKey: kCIInputRadiusKey) }
    }

    var outputImage: CIImage? {
      return filter.outputImage
    }
}

let view = UIView(frame: CGRect(x: 0, y: 0, width: 320, height: 660))

let imgUrl = Bundle.main.url(forResource: "6924717", withExtension: "jpg")!
let beginImage = CIImage(contentsOf: imgUrl)!
var gaussianBlur = GaussianBlur()
gaussianBlur.radius = 5 // 共享
gaussianBlur.inputImage = beginImage // 共享
let filterImg = UIImageView(frame: CGRect(x: 10, y: 10, width: 300, height: 200))
filterImg.image = UIImage(ciImage: gaussianBlur.outputImage!)
view.addSubview(filterImg)

print("\n")
//var gaussianBlur2 = gaussianBlur
//gaussianBlur2.radius = 10
//gaussianBlur2.inputImage = beginImage
//let filterImg2 = UIImageView(frame: CGRect(x: 10, y: 220, width: 300, height: 200))
//filterImg2.image = UIImage(ciImage: gaussianBlur2.outputImage!)
//view.addSubview(filterImg2)
//PlaygroundPage.current.liveView = view

print("\n")
//var gaussianBlur3 = gaussianBlur
//gaussianBlur3.radius = 2
//let filterImg3 = UIImageView(frame: CGRect(x: 10, y: 440, width: 300, height: 200))
//filterImg3.image = UIImage(ciImage: gaussianBlur3.outputImage!)
//view.addSubview(filterImg3)
//PlaygroundPage.current.liveView = view

print("OK")

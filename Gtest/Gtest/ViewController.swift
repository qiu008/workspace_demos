//
//  ViewController.swift
//  Gtest
//
//  Created by stl_ on 2025/12/8.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
//        let gradientColors = [UIColor.orange.withAlphaComponent(0.5), UIColor.red.withAlphaComponent(0.5)]
        let gradientColors = [UIColor.blue, UIColor.red]
        
//        let label: CustomGradientLabel = .init()
//        let label: GradientLabel = .init()
//        label.frame = .init(x: 100, y: 200, width: 60, height: 50)
//        label.textAlignment = .center
//        label.textColor = .white
//        label.text = "永森\n离谱啊"
//        label.numberOfLines = 2
//        label.gradientColors = [.orange.withAlphaComponent(0.5), .red.withAlphaComponent(0.5)]
//        view.addSubview(label)
        
        let label: UILabel = .init()
        label.frame = .init(x: 100, y: 200, width: 60, height: 50)
        label.textAlignment = .center
//        label.textColor = .white
        label.text = "永森\n离谱啊"
        label.numberOfLines = 2
        view.addSubview(label)
        
        let gradientLayer = CAGradientLayer()
        gradientLayer.frame = label.frame
        gradientLayer.colors = gradientColors.map { $0.cgColor }
        gradientLayer.mask = label.layer
        gradientLayer.startPoint = .init(x: 0, y: 0.5)
        gradientLayer.endPoint = .init(x: 1, y: 0.5)
        
        view.layer.addSublayer(gradientLayer)
        label.frame = gradientLayer.bounds
    }


}

class GradientLayerLabel: UILabel {

    // 渐变颜色数组
    var gradientColors: [UIColor] = [.red, .blue] {
        didSet { updateGradient() }
    }

    private let gradientLayer = CAGradientLayer()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupGradient()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupGradient()
    }

    private func setupGradient() {
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.5)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 0.5) // 水平渐变
        layer.addSublayer(gradientLayer)

        updateGradient()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        gradientLayer.frame = bounds
        updateGradient()
    }

    private func updateGradient() {
        gradientLayer.colors = gradientColors.map { $0.cgColor }
        gradientLayer.frame = bounds

        // 将 label 的文本绘制到渐变图层上，使用 kCAFillRuleEvenOdd 剪裁
        UIGraphicsBeginImageContextWithOptions(gradientLayer.bounds.size, false, UIScreen.main.scale)

        guard let context = UIGraphicsGetCurrentContext() else { return }

        // 在上下文中绘制原始文本（白色）
        self.textColor = .white
        self.layer.render(in: context)

        // 获取位图遮罩
        let maskImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()

        // 设置遮罩图层
        let maskLayer = CALayer()
        maskLayer.backgroundColor = UIColor.clear.cgColor
        maskLayer.contents = maskImage?.cgImage
        maskLayer.frame = gradientLayer.bounds

        gradientLayer.mask = maskLayer

        // 恢复原 text color 避免影响布局
        self.textColor = .clear
    }
}

class GradientLabel: UILabel {
    
    // 渐变颜色数组
    var gradientColors: [UIColor] = [.red, .blue] {
        didSet {
            self.setNeedsDisplay()
        }
    }
    
    override func drawText(in rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }
        
        // 获取文本大小
        let textRect = self.textRect(forBounds: rect, limitedToNumberOfLines: self.numberOfLines)
        
        // 创建渐变层
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let locations: [CGFloat] = [0.0, 1.0]
        let cgColors = gradientColors.map { $0.cgColor } as CFArray
        
        guard let gradient = CGGradient(colorsSpace: colorSpace, colors: cgColors, locations: locations) else { return }
        
        // 保存上下文状态
        context.saveGState()
        
        // 绘制文本路径（作为裁剪区域）
        let attributedString = NSAttributedString(string: self.text ?? "", attributes: [.font: self.font!])
        attributedString.draw(in: textRect)
        
        // 使用当前绘制内容作为遮罩进行裁剪
//        context.clip(using: .destinationIn)
        context.clip(using: .evenOdd)
//        context.clip()
        
        // 在裁剪区域内绘制渐变
        let startPoint = CGPoint(x: 0, y: textRect.midY)
        let endPoint = CGPoint(x: textRect.maxX, y: textRect.midY)
        context.drawLinearGradient(gradient, start: startPoint, end: endPoint, options: [])
        
        // 恢复上下文
        context.restoreGState()
    }
}

class CustomGradientLabel: UILabel {

    override func drawText(in rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext(),
              let text = text,
              !text.isEmpty else { super.drawText(in: rect); return }

        // 创建渐变
        let colors = [UIColor.red.withAlphaComponent(0.5).cgColor, UIColor.orange.withAlphaComponent(0.5).cgColor] as CFArray
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let gradient = CGGradient(colorsSpace: colorSpace, colors: colors, locations: nil)!

        // 保存上下文状态
        context.saveGState()

        // 绘制渐变路径
//        let fontSize = font.pointSize
//        let textRect = (text as NSString).boundingRect(with: CGSize(width: CGFloat.greatestFiniteMagnitude, height: fontSize), options: .usesLineFragmentOrigin, attributes: [.font: font!], context: nil)
        let textRect = self.textRect(forBounds: rect, limitedToNumberOfLines: self.numberOfLines)
        
        let x = (bounds.width - textRect.width) / 2
        let y = (bounds.height - textRect.height) / 2

        let path = CGPath(rect: CGRect(x: x, y: y, width: textRect.width, height: textRect.height), transform: nil)
        context.addPath(path)
        context.clip(using: .evenOdd) // 裁剪出文字区域
//        context.clip() // 裁剪出文字区域

        // 绘制渐变
        let startPoint = CGPoint(x: 0, y: bounds.minY)
        let endPoint = CGPoint(x: bounds.maxX, y: bounds.minY)
//        let endPoint = CGPoint(x: 1, y: bounds.minY)
        context.drawLinearGradient(gradient, start: startPoint, end: endPoint, options: [])

        context.restoreGState()
    }
}

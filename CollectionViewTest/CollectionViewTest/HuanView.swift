//
//  Huan.swift
//  CollectionViewTest
//
//  Created by STL_QYH on 2023/7/27.
//

import UIKit

class HuanView: UIView {

    override init(frame: CGRect) {
        super.init(frame: frame)
//        backgroundColor = .black
        let bPath: UIBezierPath = .init(arcCenter: CGPoint(x: center.x - frame.minX, y: center.y - frame.minY),
                                        radius: bounds.width / 2 - 5,
                                        startAngle: -Double.pi/2,
                                        endAngle: -Double.pi/2-2*Double.pi,
                                        clockwise: false)
        let bgLayer: CAShapeLayer = .init()
        bgLayer.strokeColor = UIColor.lightGray.cgColor
        bgLayer.path = bPath.cgPath
        bgLayer.fillColor = nil
        bgLayer.lineWidth = 10
//        bgLayer.frame = bounds
        layer.addSublayer(bgLayer)
        
        let lPath: UIBezierPath = .init(arcCenter: frame.origin,
                                        radius: bounds.width / 2 - 5,
                                        startAngle: -Double.pi/2,
                                        endAngle: -Double.pi/2-Double.pi,
                                        clockwise: false)
        let lLayer: CAShapeLayer = .init()
        lLayer.strokeColor = UIColor.orange.cgColor
        lLayer.path = lPath.cgPath
        lLayer.lineCap = .round
        lLayer.fillColor = nil
        lLayer.lineWidth = 10
//        lLayer.frame = bounds
        layer.addSublayer(lLayer)
        
        lLayer.strokeEnd = 0.95
        
        var point: CGPoint = bounds.origin
        point.x += bounds.width / 2.0
        point.y += bounds.height / 2.0
        let rPath: UIBezierPath = .init(arcCenter: point,
                                        radius: bounds.width / 2 - 5,
                                        startAngle: -Double.pi/2,
                                        endAngle: -Double.pi/2-Double.pi,
                                        clockwise: true)
        let rLayer: CAShapeLayer = .init()
        rLayer.strokeColor = UIColor.orange.cgColor
        rLayer.path = rPath.cgPath
        rLayer.lineCap = .round
        rLayer.fillColor = nil
        rLayer.lineWidth = 10
//        rLayer.frame = bounds
        layer.addSublayer(rLayer)
        
        rLayer.strokeEnd = 0.95
        
        let animation: CABasicAnimation = .init(keyPath: "strokeEnd")
        animation.fromValue = 0
        animation.toValue = 0.95
        animation.duration = 1
        
        lLayer.add(animation, forKey: "strokeEndAnimation")
        rLayer.add(animation, forKey: "strokeEndAnimation")
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */
}

//
//  OpenBookAnimation.swift
//  OpenBook
//
//  Created by STL_QYH on 2022/3/2.
//

import UIKit

class OpenBookAnimation: NSObject, UIViewControllerAnimatedTransitioning {

    let duration: TimeInterval
    
    init(duration: TimeInterval = 0.5) {
        self.duration = duration
    }
    
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 0.5
    }
    
    // This method can only be a no-op if the transition is interactive and not a percentDriven interactive transition.
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        let containerView = transitionContext.containerView
        
        var t3d = CATransform3DIdentity
        t3d.m34 = -1.0 / 500.0;
        containerView.layer.sublayerTransform = t3d
        
//        switch operation {
//        case .push:
//            let from = transitionContext.view(forKey: .from)
//            guard let fromView = from?.snapshotView(afterScreenUpdates: false),
//                  let to = transitionContext.view(forKey: .to),
//                  let toView = to.snapshotView(afterScreenUpdates: true) else { return }
//
//            containerView.addSubview(toView)
//            containerView.addSubview(fromView)
//
//            let toViewFrame = toView.frame
//            let fromViewFrame = fromView.frame
//            fromView.layer.anchorPoint = CGPoint(x: 0, y: 0.5)
//            fromView.frame = fromViewFrame
//            toView.frame = fromViewFrame
//
//            UIView.animateKeyframes(withDuration: duration, delay: 0, options: .calculationModeLinear) {
//                fromView.layer.transform = CATransform3DMakeRotation(-.pi/2, 0, 1, 0)
//                toView.frame = toViewFrame
//                fromView.frame = toViewFrame
//            } completion: { didComplete in
//                fromView.removeFromSuperview()
//                toView.removeFromSuperview()
//                containerView.addSubview(to)
//                containerView.layer.sublayerTransform = CATransform3DIdentity
//                transitionContext.completeTransition(didComplete)
//            }
//        case .pop:
//            let fromV = transitionContext.view(forKey: .from)
//            let toV = transitionContext.view(forKey: .to)
//            let toView = toV?.snapshotView(afterScreenUpdates: true)
//            let fromView = fromV?.snapshotView(afterScreenUpdates: false)
//            transitionContext.containerView.addSubview(toV!)
//            transitionContext.containerView.addSubview(fromView!)
//            transitionContext.containerView.addSubview(toView!)
//            fromV?.isHidden = true
//            let toViewFrame = toView?.frame
//            let fromViewFrame = fromView?.frame
//            toView?.layer.anchorPoint = CGPoint(x: 0, y: 0.5)
//            fromView?.frame = fromViewFrame!
//            toView?.frame = fromViewFrame!
//            toView?.layer.transform = CATransform3DMakeRotation(-.pi/2, 0, 1, 0);
//            UIView.animateKeyframes(withDuration: duration, delay: 0, options: .calculationModeLinear) {
//                toView?.layer.transform = CATransform3DIdentity
//                fromView?.frame = toViewFrame!
//                toView?.frame = toViewFrame!
//            } completion: { didComplete in
//                fromView?.removeFromSuperview()
//                toView?.removeFromSuperview()
//                transitionContext.containerView.layer.sublayerTransform = CATransform3DIdentity
//                transitionContext.completeTransition(didComplete)
//                if transitionContext.transitionWasCancelled {
//                    fromV?.isHidden = false
//                    toV?.removeFromSuperview()
//                }
//            }
//        default:
//            break
//        }
    }
    
    func animationEnded(_ transitionCompleted: Bool) {
        print("transitionCompleted", transitionCompleted)
    }
}

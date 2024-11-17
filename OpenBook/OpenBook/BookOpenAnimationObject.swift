//
//  BookOpenAnimationObject.swift
//  OpenBook
//
//  Created by STL_QYH on 2022/3/3.
//

import UIKit

class BookOpenAnimationObject: NSObject, UIViewControllerAnimatedTransitioning {

    let duration: TimeInterval
    
    let operation: UINavigationController.Operation
    
    init(operation: UINavigationController.Operation, duration: TimeInterval = 0.5) {
        self.operation = operation
        self.duration = duration
    }
    
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return duration
    }
    
    // This method can only be a no-op if the transition is interactive and not a percentDriven interactive transition.
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
//        let containerView = transitionContext.containerView
        
        var t3d = CATransform3DIdentity
        t3d.m34 = -1.0 / 500.0;
        transitionContext.containerView.layer.sublayerTransform = t3d
        
        switch operation {
        case .push:
            push(transitionContext: transitionContext)
        case .pop: break
            
        default:
            break
        }
    }
    
    func animationEnded(_ transitionCompleted: Bool) {
        print("transitionCompleted", transitionCompleted)
    }
    
    func push(transitionContext: UIViewControllerContextTransitioning) {
        let from = transitionContext.view(forKey: .from)
        guard let fromImage = screenCapture(view: from) else { return }
//        guard let fromView = from.snapshotView(afterScreenUpdates: false) else { return }
        let fromView = getImageView(image: fromImage)
        guard let to = transitionContext.view(forKey: .to) else { return }
//        guard let toView = to?.snapshotView(afterScreenUpdates: true) else { return }
        guard let toImage = screenCapture(view: to) else { return }
        let toView = getImageView(image: toImage)
        transitionContext.containerView.addSubview(toView)
        transitionContext.containerView.addSubview(fromView)
        
//        let toViewFrame = toView.frame
        let toViewFrame = UIScreen.main.bounds
//        let fromViewFrame = fromView.frame
        let fromViewFrame = CGRect(x: 0, y: 0, width: 100, height: 200)
        fromView.layer.anchorPoint = CGPoint(x: 0, y: 0.5)
        fromView.frame = fromViewFrame
        toView.frame = fromViewFrame
        
        UIView.animateKeyframes(withDuration: duration, delay: 0, options: .calculationModeLinear) {
            fromView.layer.transform = CATransform3DMakeRotation(-.pi/2, 0, 1, 0)
            toView.frame = toViewFrame
            fromView.frame = toViewFrame
        } completion: { _ in
            fromView.removeFromSuperview()
            toView.removeFromSuperview()
            transitionContext.containerView.addSubview(to)
            transitionContext.containerView.layer.sublayerTransform = CATransform3DIdentity
//                let didComplete = !transitionContext.transitionWasCancelled
//            transitionContext.completeTransition(true)
        }
//        UIViewController *to = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
//        let toVc = transitionContext.viewController(forKey: .to)
        
//        UIViewController *from = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
//        let fromVc = transitionContext.viewController(forKey: .from)
        
//        let containerView = transitionContext.containerView
        
//        UIView *fromView = (from.ATTarget != nil ? from.ATTarget : from.view);

//        CGRect rect = [fromView convertRect:fromView.bounds toView:containerView];


//        UIView *contentView = [self GetImageView:[self screenCapture:to.view]];

//        contentView.frame = rect;

//        if (fromView.layer.cornerRadius > 0.0) {
//
//            contentView.layer.cornerRadius = fromView.layer.cornerRadius;
//
//            contentView.layer.masksToBounds = YES;
//        }
//
//        [containerView addSubview:contentView];
//
//
//        UIImageView *coverView = [self GetImageView: [self screenCapture:fromView]];
//
//        coverView.tag = DZM_TAG_COVER;
//
//        coverView.frame = CGRectMake(rect.origin.x - (rect.size.width / 2), rect.origin.y, rect.size.width, rect.size.height);
//
//        [containerView addSubview:coverView];
//
//
//        coverView.layer.anchorPoint = CGPointMake(0, 0.5);
//
//        coverView.opaque = YES;
//
//
//        CATransform3D transform = CATransform3DMakeRotation(-M_PI_2 , 0.0, 1.0, 0.0);
//
//        transform.m34 = 1.0f / 500.0f;
//
//        [UIView animateWithDuration:[self transitionDuration:transitionContext] delay:0.0f options:UIViewAnimationOptionCurveEaseInOut animations:^{
//
//            coverView.frame = to.view.bounds;
//
//            contentView.frame = to.view.bounds;
//
//            coverView.layer.transform = transform;
//
//        } completion:^(BOOL finished) {
//
//            coverView.image = nil;
//
//            coverView.hidden = YES;
//
//            [contentView removeFromSuperview];
//
//            [containerView addSubview:to.view];
//
//            [transitionContext completeTransition:YES];
//        }];
        
    }

    func pop(transitionContext: UIViewControllerContextTransitioning) {
        
//        UIViewController *to = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
//
//        UIViewController *from = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
//
//        UIView *containerView = [transitionContext containerView];
//
//
//        [containerView addSubview:to.view];
//
//
//        UIView *toView = (to.ATTarget != nil ? to.ATTarget : to.view);
//
//        CGRect rect = [toView convertRect:toView.bounds toView:containerView];
//
//
//        UIView *contentView = [self GetImageView:[self screenCapture:from.view]];
//
//        contentView.frame = from.view.bounds;
//
//        if (toView.layer.cornerRadius > 0.0) {
//
//            contentView.layer.cornerRadius = toView.layer.cornerRadius;
//
//            contentView.layer.masksToBounds = YES;
//        }
//
//        [containerView addSubview:contentView];
//
//
//        UIImageView *coverView = [containerView viewWithTag:DZM_TAG_COVER];
//
//        coverView.image = [self screenCapture:toView];
//
//        coverView.hidden = NO;
//
//        [containerView addSubview:coverView];
//
//
//        CATransform3D transform = CATransform3DMakeRotation(0.0, 0.0, 1.0, 0.0);
//
//        transform.m34 = 1.0f / 500.0f;
//
//        [UIView animateWithDuration:[self transitionDuration:transitionContext]  delay:0.0f options:UIViewAnimationOptionBeginFromCurrentState | UIViewAnimationOptionShowHideTransitionViews animations:^{
//
//            contentView.frame = rect;
//
//            coverView.frame = rect;
//
//            coverView.layer.transform = transform;
//
//        } completion:^(BOOL finished) {
//
//            [coverView removeFromSuperview];
//
//            [contentView removeFromSuperview];
//
//            [transitionContext completeTransition:YES];
//        }];
    }
    
    func getImageView(image: UIImage) -> UIImageView {
        return UIImageView(image: image)
    }
    
    func screenCapture(view: UIView?) -> UIImage? {
        guard let target = view else { return nil }
        UIGraphicsBeginImageContextWithOptions(target.frame.size, false, 0.0)
        guard let ctx = UIGraphicsGetCurrentContext() else { return nil }
        target.layer.render(in: ctx)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return image
    }
}

//
//  WeakProxy.m
//  OC
//
//  Created by STL_QYH on 2021/4/7.
//  Copyright © 2021 STL_. All rights reserved.
//

#import "WeakProxy.h"

@interface WeakProxy ()

@property (nonatomic, weak) id target;

@end

@implementation WeakProxy

+ (instancetype)proxyWithObject:(id)target {
    return [[self alloc] initWithObject:target];
}

- (instancetype)initWithObject:(id)target {
    _target = target;
    return self;
}

// 重签名
- (NSMethodSignature *)methodSignatureForSelector:(SEL)sel {
    NSLog(@"methodSignatureForSelector");
    return [_target methodSignatureForSelector:sel];
}

// 重置target
- (void)forwardInvocation:(NSInvocation *)invocation {
    NSLog(@"forwardInvocation");
    SEL sel = invocation.selector;
    if ([_target respondsToSelector:sel]) {
        NSLog(@"invokeWithTarget");
        [invocation invokeWithTarget:_target];
    }
}

//
//- (BOOL)respondsToSelector:(SEL)aSelector {
//    NSLog(@"respondsToSelector");
//    return [self.target respondsToSelector:aSelector];
//}

@end

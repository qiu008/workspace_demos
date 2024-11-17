//
//  NCProxy.m
//  OC
//
//  Created by STL_QYH on 2021/4/8.
//  Copyright © 2021 STL_. All rights reserved.
//

#import "NCProxy.h"

@interface NCProxy()

@property (nonatomic, strong) NSObject *object;

@end

@implementation NCProxy

- (id)transformToObject:(NSObject *)object {
    _object = object;
    return _object;
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)sel {
    return [_object methodSignatureForSelector:sel];
//    NSMethodSignature *nsms = [super methodSignatureForSelector:sel];
//    if (_object) {
//        nsms = [_object methodSignatureForSelector:sel];
//    }
//    return nsms;
}

- (void)forwardInvocation:(NSInvocation *)invocation {
    if ([_object respondsToSelector:invocation.selector]) {
        [invocation invokeWithTarget:_object];
    }
}

@end

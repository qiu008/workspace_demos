//
//  WeakProxy.h
//  OC
//
//  Created by STL_QYH on 2021/4/7.
//  Copyright © 2021 STL_. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface WeakProxy : NSProxy

+ (instancetype)proxyWithObject:(id)target;

- (instancetype)initWithObject:(id)target;

@end

NS_ASSUME_NONNULL_END

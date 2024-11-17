//
//  NCProxy.h
//  OC
//
//  Created by STL_QYH on 2021/4/8.
//  Copyright © 2021 STL_. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NCProxy : NSProxy

- (id)transformToObject:(NSObject *)object;

@end

NS_ASSUME_NONNULL_END

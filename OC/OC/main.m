//
//  main.m
//  OC
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AppDelegate.h"

int main(int argc, char * argv[]) {
    NSString *appDelegateClassName;
    NSString *applicationClassName;
    @autoreleasepool {
        // Setup code that might create autoreleased objects goes here.
        appDelegateClassName = NSStringFromClass([AppDelegate class]);
        applicationClassName = NSStringFromClass(UIApplication.class);
    }
    return UIApplicationMain(argc, argv, applicationClassName, appDelegateClassName);
}

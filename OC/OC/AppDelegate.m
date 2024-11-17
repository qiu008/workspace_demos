//
//  AppDelegate.m
//  OC
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

#import "AppDelegate.h"
#import <objc/runtime.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <UserNotifications/UNNotificationRequest.h>
#import <UserNotifications/UNNotification.h>

//@protocol SomePC

//@end

@interface SomePC // <SomePC>

@end

@interface Test : NSObject
// OC会优化字节对齐，SWIFT则需要手动优化
@property (nonatomic, assign) BOOL isChild;
@property (nonatomic, assign) NSInteger age;
@property (nonatomic, assign) BOOL isMan;
@end

@implementation Test
@end


@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    NSInteger size = class_getInstanceSize(Test.class);
    NSLog(@"%ld", size);
    NSDecimalNumber *dn =
    [[NSDecimalNumber alloc] init];
    return YES;
}
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
//    [UNUserNotificationCenter.currentNotificationCenter removeDeliveredNotificationsWithIdentifiers:@[@""]];
    [UNUserNotificationCenter.currentNotificationCenter getDeliveredNotificationsWithCompletionHandler:^(NSArray<UNNotification *> * _Nonnull notifications) {
//        NSPredicate *pp = [NSPredicate predicateWithFormat:@""];
//        [notifications filteredArrayUsingPredicate:pp];
        NSMutableArray<NSString *> *ma = [NSMutableArray arrayWithCapacity:notifications.count];
        for (UNNotification *noti in notifications) {
            noti.request.content;
            [ma addObject:noti.request.identifier];
        }
        [UNUserNotificationCenter.currentNotificationCenter removeDeliveredNotificationsWithIdentifiers:ma];
    }];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    
}
- (NSString *)getZZwithString:(NSString *)string {
    NSRegularExpression *regularExpretion=[NSRegularExpression regularExpressionWithPattern:@"<[^>]*>|\n"
                                                                                    options:NSRegularExpressionCaseInsensitive
                                                                                      error:nil];
    string=[regularExpretion stringByReplacingMatchesInString:string options:NSMatchingReportProgress range:NSMakeRange(0, string.length) withTemplate:@""];
    return string;
}

#pragma mark - UISceneSession lifecycle


- (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options {
    // Called when a new scene session is being created.
    // Use this method to select a configuration to create the new scene with.
    return [[UISceneConfiguration alloc] initWithName:@"Default Configuration" sessionRole:connectingSceneSession.role];
}


- (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet<UISceneSession *> *)sceneSessions {
    // Called when the user discards a scene session.
    // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
    // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
}


@end

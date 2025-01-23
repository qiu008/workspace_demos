//
//  ViewController.m
//  OC
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

#import "dlfcn.h"
#import <libkern/OSAtomic.h>
#import "UIControl+KKClickInterval.h"
#import "ViewController.h"
//#import <YYModel.h>
//#import "RootModel.h"
//#import "WidgetModel.h"
//#import <Security/Security.h>
#import "WeakProxy.h"
#import "HuanView.h"

//@interface Box<__covariant T> : NSObject //__covariant - 协变
@interface Box<__contravariant T: NSString *> : NSObject//__contravariant 逆变
//@interface Box<T: id<NSCopying>> : NSObject
//@interface Box<T: NSObject *> : NSObject
@property T t;
@end
@implementation Box @end
//O-C范式编程
@interface NSArrayMapper<OT, RT> : NSObject
+ (NSArray<RT> *)mapArray:(NSArray<OT> *)input block:(RT(^)(OT ot))block;
@end
@implementation NSArrayMapper
+ (NSArray *)mapArray:(NSArray *)input block:(id(^)(id ot))block {
    NSMutableArray *nsma = [NSMutableArray array];
    [input enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        id rt = block(obj);
        if (rt) {
            [nsma addObject:rt];
        }
    }];
    return nsma;
}
@end

@interface ViewController ()

@property (nonatomic, strong) NSTimer *timer;

@end

@implementation ViewController

- (BOOL)canBecomeFirstResponder {
    [super canBecomeFirstResponder];
    [UIApplication.sharedApplication sendAction:@selector(testUIApplicationAendAction) to:self from:self forEvent:NULL];
    return YES;
}

- (void)testUIApplicationAendAction {
    NSLog(@"testUIApplicationAendAction");
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.subviews;
    NSArray *subviews = @[@""];
    // Do any additional setup after loading the view.
    
//    kSecUseDataProtectionKeychain;
    
//    [UIImage imageWithData:[NSData dataWithContentsOfFile:@""]];
//    UIImageJPEGRepresentation(UIImage.new, 1.0);
    
//    NSArray *array = @[@1, @"2"];
////    NSArray<NSNumber *> *array0 = @[@1, @2];
//    NSArray *array1 = [NSArrayMapper<NSNumber *, NSString *> mapArray:array block:^NSString *(NSNumber *ot) {
//        if ([ot isKindOfClass:[NSNumber class]]) {
//            return ot.stringValue;
//        }
//        return nil;
//    }];
//    NSLog(@"%@", array1);
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationWillTerminateNotification object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
        [[UIActivityViewController alloc] initWithActivityItems:nil applicationActivities:nil];
    }];
    [[[NSNotificationCenter alloc] init] addObserverForName:UIApplicationWillTerminateNotification object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
            
    }];
//    Box<NSString *> *box = [[Box alloc] init];
//    [box setT:@2]; NSLog(@"%@", box.t);
//    Box<NSObject *> *box0 = [[Box alloc] init];
//    Box<UIView *> *view = [[Box alloc] init];
//    Box<UILabel *> *label = [[Box alloc] init];
//    view = label; //协变
//    Box<NSString *> *nss = [[Box alloc] init];
//    Box<NSMutableString *> *nsms = [[Box alloc] init];
//    nsms = nss; //逆变
    
//    NSArray *array = @[@"1", @2];
//    [array enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
//        NSLog(@"%@", obj);
//    }];
//    NSArray<NSString *> *array1 = @[@"1", @2];
//    [array1 enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
//        NSLog(@"%@", obj);
//    }];
    
//    [NSKeyedArchiver archivedDataWithRootObject:@"" requiringSecureCoding:YES error:NULL];
//    NSString *string = @" 1 ";
//    NSLog(@"-%@-", string);
//    string = [string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
//    NSLog(@"-%@-", string);
//    string = @" \n1\n1\n ";
//    NSLog(@"-%@-", string);
//    string = [string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
//    NSLog(@"-%@-", string);
    
//    NSError *error;
//    NSString *regionCountryAll = [[NSBundle mainBundle] pathForResource:@"RegionCountryAll" ofType:@""];
//    id iD = [NSJSONSerialization JSONObjectWithData:[NSData dataWithContentsOfFile:regionCountryAll]
//                                            options:NSJSONReadingMutableLeaves error:&error];
//    RootModel *rM = [RootModel yy_modelWithJSON:iD];
//    NSMutableDictionary *mDic = [NSMutableDictionary dictionary];
//    for (NSString *key in rM.widget.allKeys) {
//        NSDictionary *value = rM.widget[key];
//        WidgetModel *wM = [WidgetModel yy_modelWithDictionary:value];
//        mDic[key] = wM;
//    }
//    NSLog(@"%@", mDic);
//    WidgetModel *wM = mDic[@"600003"];
//    NSLog(@"%@", wM.regionLang);
//    NSLog(@"%@", wM.widgetId);
//    NSLog(@"%@", wM.widgetName);
    [UIControl kk_exchangeClickMethod];
    UIButton *btn = [UIButton buttonWithType:(UIButtonTypeCustom)];
    btn.frame = CGRectMake(100, 100, 100, 100);
    btn.backgroundColor = UIColor.redColor;
    [btn addTarget:self action:@selector(btnactoin) forControlEvents:(UIControlEventTouchUpInside)];
//    [self.view addSubview:btn];
    
//    self.timer = [NSTimer timerWithTimeInterval:1
//                                         target:[WeakProxy proxyWithObject:self]
//                                       selector:@selector(timerInvoked:)
//                                       userInfo:nil
//                                        repeats:YES];
//    [[NSRunLoop mainRunLoop] addTimer:self.timer forMode:NSRunLoopCommonModes];
    NSLog(@"main, %%");
    dispatch_queue_t q = dispatch_queue_create("test", DISPATCH_QUEUE_SERIAL);
    dispatch_sync(q, ^{
        NSLog(@"dispatch_sync, %@", NSThread.currentThread);
    });
    dispatch_async(q, ^{
        NSLog(@"dispatch_async, %@", NSThread.currentThread);
    });
    NSLog(@"main, %@", NSThread.currentThread);
    
//    [UITableView alloc]
    UIButton *tempBtn = btn;
    if (btn == tempBtn) {
        //OC中==是地址判等
    }
    //OC中通常重写-isEqual:去实现类似
    //-isEqualToString:
    //-isEqualToClass:
    //作内容判等
    tempBtn = [UIButton buttonWithType:(UIButtonTypeCustom)];
    if ([tempBtn isEqual:btn]) {
        //没有重写会调用NSObject(父类?)中的版本，是进行==地址判等
        NSLog(@"isEqual");
    } else {
        //没有重写会调用NSObject(父类?)中的版本，是进行==地址判等
        NSLog(@"isn`t equal");
    }
    if ([btn isEqual:_timer]) {
        NSLog(@"isEqual");
    } else {
        //没有重写会调用NSObject(父类?)中的版本，是进行==地址判等
        NSLog(@"isn`t equal");
    }
    /*
     - (BOOL)isEqual:(id)object {}
     OC中重写-isEqual:时一般也需重写-hash：
     - (NSUInteger)hash {}
     
     */
    
}

- (void)timerInvoked:(NSTimer *)timer {
    NSLog(@"1");
}

- (void)btnactoin {
    NSLog(@"btn actoin");
}

//- (void)viewWillAppear:(BOOL)animated {
//    //改成想要的样式
//}
//
//- (void)viewWillDisappear:(BOOL)animated {
//    //改回之前的样式
//}

//func returnAuthCode(code: String, state: String, redirectUri: String) {
- (void)returnAuthCode:(NSString *)code state:(NSString *)state redirectUri:(NSString *)redirectUri {
//    let redirectURL = URL(string: redirectUri)!
    NSURL *redirectURL = [NSURL URLWithString:redirectUri];
//    var components = URLComponents(url: redirectURL, resolvingAgainstBaseURL: false)
    NSURLComponents *components = [NSURLComponents componentsWithURL:redirectURL resolvingAgainstBaseURL:NO];
    // Return the authorization code and original state
//    let paramAuthCode = URLQueryItem(name: "code", value: code)
    NSURLQueryItem *paramAuthCode = [NSURLQueryItem queryItemWithName:@"code" value:code];
//    let paramState = URLQueryItem(name: "state", value: state)
    NSURLQueryItem *paramState = [NSURLQueryItem queryItemWithName:@"state" value:state];
//    components?.queryItems = [paramAuthCode, paramState]
    components.queryItems = @[paramAuthCode, paramState];
//    if let resultURL = components?.url {
//        UIApplication.shared.open(
//            resultURL,
//            options: [UIApplication.OpenExternalURLOptionsKey.universalLinksOnly : true],
//            completionHandler: nil)
//    }
    [[UIApplication sharedApplication] openURL:components.URL options:@{UIApplicationOpenURLOptionUniversalLinksOnly : @YES} completionHandler:nil];
    
//    guard let url = URL(string: "\(redirectUri)?state=\(state)&code=\(authCode)")
//    NSURL *url = [NSURL URLWithString:@"%@?state=%@&code=%@", redirectUri, state, authCode];
    
    NSString *path = [[NSBundle mainBundle] pathForResource:@"Config" ofType:@"plist"];
    NSDictionary *nsDictionary = [NSDictionary dictionaryWithContentsOfFile:path];
}

@end

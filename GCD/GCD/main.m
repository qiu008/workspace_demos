//  main.m
//  GCD
//  Created by STL_QYH on 2020/11/19.
#import <Foundation/Foundation.h>
void log1() {
    
}
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        //dispatch_queue_t t = dispatch_get_current_queue(); //弃用
//        dispatch_queue_t mainQueue = dispatch_get_main_queue();
//        dispatch_queue_set_specific(mainQueue, "key", "main", NULL);
        
//        dispatch_queue_t globalQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
        
//        dispatch_sync(globalQueue, ^{ //同步,不同队列，不开启子线程
//            NSLog(@"sgq-isMainThread-%d", NSThread.isMainThread); //1
//            NSLog(@"sgq-specific-%d", dispatch_get_specific("key") == NULL); //1
//        });
        //异步才可能触发开启子线程
//        dispatch_async(globalQueue, ^{ //异步,不同队列，开启子线程
//            NSLog(@"agq-isMainThread-%d", NSThread.isMainThread); //0
//            NSLog(@"agq-isMultiThreaded-%d", [NSThread isMultiThreaded]); //0
//            NSLog(@"agq-specific-%d", dispatch_get_specific("key") == NULL); //1
//        });
        
        
//        dispatch_queue_t serialQueue = dispatch_queue_create("serialQueue", DISPATCH_QUEUE_SERIAL);
//        dispatch_async(globalQueue, ^{
//            NSThread *globalThread = NSThread.currentThread;
//            dispatch_sync(serialQueue, ^{
//                NSLog(@"ssq-%d", NSThread.currentThread == globalThread);
//            });
//        });
        
        
//        dispatch_block_t log = ^{
//            NSLog(@"log-%d", NSThread.isMainThread);
//            void *value = dispatch_get_specific("key");
//            NSLog(@"log-specific-%d", value == NULL);
//        };
        
//        dispatch_async(globalQueue, log); //非主线程，非主队列
        
//        dispatch_async(globalQueue, ^{
//            dispatch_async(mainQueue, log); //非主线程，主队列
//        });
        
//        dispatch_main();
        
        
//        thread_t t_id = mach_thread_self();
//        NSLog(@"t_id-%d", t_id);
        
//        dispatch_block_t logMain = ^{
//            NSLog(@"logMain-t_id-%d", mach_thread_self());
//            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), mainQueue, logMain);
//        };
        
//        dispatch_async(globalQueue, ^{
//            dispatch_async(mainQueue, ^{
//                NSLog(@"%d", t_id == mach_thread_self());
//                NSLog(@"%d", NSThread.isMainThread);
//            });
//        });
        
//        dispatch_block_t logSerial = ^{
//            NSLog(@"%d", NSThread.isMainThread);
//            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), serialQueue, log);
//            NSLog(@"logSerial-t_id-%d", mach_thread_self());
//            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), serialQueue, logMain);
//        };
        
//        dispatch_async(globalQueue, ^{
//            dispatch_async(serialQueue, logSerial);
//            dispatch_async(mainQueue, logMain);
//        });
        
//        dispatch_async(serialQueue, ^{
//            [NSRunLoop.currentRunLoop run];
//        });
//        dispatch_async(globalQueue, ^{
//            dispatch_async(serialQueue, logSerial);
//        });
//
        
//        dispatch_main();
        
        __block CFRunLoopRef runloop = NULL;
        NSThread *thread = [[NSThread alloc] initWithBlock:^{
            runloop = [NSRunLoop.currentRunLoop getCFRunLoop];
            [NSRunLoop.currentRunLoop addPort:[NSPort port] forMode:NSRunLoopCommonModes];
            [NSRunLoop.currentRunLoop run];
        }];
//        CFRunLoopPerformBlock(runloop, NSRunLoopCommonModes, ^{
//            NSLog(@"thread-");
//        });
        [NSObject performSelector:@selector(description) onThread:thread withObject:nil waitUntilDone:NO];
//        CFRunLoopPerformBlock(runloop, NSRunLoopCommonModes, ^{
//            NSLog(@"thread-0");
//        });
        
//        [NSRunLoop.currentRunLoop run];
        //NSRunLoop *currentRunLoop = NSRunLoop.currentRunLoop;
        /*NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:1
                                                         repeats:YES
                                                           block:^(NSTimer * _Nonnull timer) {
            NSLog(@"timer");
        }];
        [currentRunLoop addTimer:timer forMode:NSDefaultRunLoopMode];*/
        /*NSPort *port = [NSPort port];
        [currentRunLoop addPort:port forMode:NSDefaultRunLoopMode];
        [port scheduleInRunLoop:currentRunLoop forMode:NSDefaultRunLoopMode];*/
        //[currentRunLoop run];
    }
    return 0;
}

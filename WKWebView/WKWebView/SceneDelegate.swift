//
//  SceneDelegate.swift
//  WKWebView
//
//  Created by STL_QYH on 2023/9/20.
//

import UIKit
import CloudKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func cloudKit() {
        func saveRecord() {
            cdb.save(ckr) { _ckr, error in
                if let _ckr {
                    print("save", _ckr, _ckr.recordType, _ckr.recordID)
                } else if let error {
                    print("save", error)
                }
            }
        }
        //创建索引ID
//        CKRecordID *artworkRecordID = [[CKRecordID alloc] initWithRecordName:@"115"];
        let id = CKRecord.ID(recordName: "0")
        
        //创建一条记录,type就是模型,与CloudKit 管理后台的Record types 一致,
        //如果后台没有,会自动添加相应的模型或者字段.
//        CKRecord *artworkRecord = [[CKRecord alloc] initWithRecordType:@"Artwork" recordID:artworkRecordID];
        let ckr = CKRecord(recordType: "otp", recordID: id)
        //设置模型的数据,和字典用法几乎一样
//        artworkRecord[@"title" ] = @"MacKerricher State Park";
//        artworkRecord[@"artist"] = @"Mei Chen";
//        artworkRecord[@"address"] = @"Fort Bragg, CA";
        ckr.setObject(UUID().uuidString as __CKRecordObjCValue, forKey: "secret")
        
//        CKContainer *myContainer = [CKContainer defaultContainer];
//        CKDatabase  *publicDatabase = [myContainer publicCloudDatabase];
        let ckc = CKContainer.default()
        let cdb = ckc.sharedCloudDatabase // 共享数据库
//        let cdb = ckc.publicCloudDatabase // 公有数据库
        cdb.fetch(withRecordID: id) { _ckr, error in
            guard let _ckr else {
                saveRecord()
                return
            }
            if let secret = _ckr.object(forKey: "secret") as? String {
                print("secret", secret)
            } else {
                saveRecord()
            }
        }
        
        //私有数据库
//        CKDatabase  *privateDatabase = [myContainer privateCloudDatabase];
        
        //自定义的容器,比如上图中的共享容器,需要id标识
//        CKContainer *shareContainer = [CKContainer containerWithIdentifier:@"iCloud.com.example.ajohnson.GalleryShared"];
        
        //添加一条记录(这里是添加到公有数据库里面)
//        [publicDatabase saveRecord:artworkRecord completionHandler:^(CKRecord *artworkRecord, NSError *error){
//            if (!error) {
//                //写入成功
//            }
//            else {
//                //写入失败的处理
//            }
//        }];
         
//         注意:
//         默认用户只能只读数据库,要添加修改则需要登录icloud账户
//         公有数据库所有的用户(安装app的用户,不是指开发者)都可以访问,私有的只能当前用户能访问.
//         如果用户没有登录,提醒用户登录icloud
//         [[CKContainer defaultContainer] accountStatusWithCompletionHandler:^(CKAccountStatus accountStatus, NSError* error) {
//             if (accountStatus == CKAccountStatusNoAccount) {
//                 UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"尚未登录iCloud" message:nil preferredStyle:UIAlertControllerStyleAlert];
//
//                 [alert addAction:[UIAlertAction actionWithTitle:@"确定"
//                                                           style:UIAlertActionStyleCancel
//                                                         handler:nil]];
//
//                 dispatch_async(dispatch_get_main_queue(), ^{
//                     [self presentViewController:alert animated:YES completion:nil];
//                 });
//             }
//             else {
//               //登录过了
//             }
//         }];
         
//         CKDatabase *publicDatabase = [[CKContainer defaultContainer] publicCloudDatabase];
//         CKRecordID *artworkRecordID = [[CKRecordID alloc] initWithRecordName:@"115"];
//         [publicDatabase fetchRecordWithID:artworkRecordID completionHandler:^(CKRecord *artworkRecord, NSError *error) {
//            if (error) {
//              //处理错误
//            }
//            else {
//              // 成功获取到数据
//            }
//         }];
         
    }

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        cloudKit()
        // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
        // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
        // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).
        guard let _ = (scene as? UIWindowScene) else { return }
        if let _ = UIApplication.shared.delegate?.window {
            
        }
        if let wsd = UIApplication.shared.delegate?.window??.windowScene?.delegate as? UIWindowSceneDelegate, let _ = wsd.window {
            
        }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // Called as the scene is being released by the system.
        // This occurs shortly after the scene enters the background, or when its session is discarded.
        // Release any resources associated with this scene that can be re-created the next time the scene connects.
        // The scene may re-connect later, as its session was not necessarily discarded (see `application:didDiscardSceneSessions` instead).
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene has moved from an inactive state to an active state.
        // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive.
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
        // This may occur due to temporary interruptions (ex. an incoming phone call).
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Called as the scene transitions from the background to the foreground.
        // Use this method to undo the changes made on entering the background.
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Called as the scene transitions from the foreground to the background.
        // Use this method to save data, release shared resources, and store enough scene-specific state information
        // to restore the scene back to its current state.
    }


}


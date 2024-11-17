//
//  AppDelegate.swift
//  Actor
//
//  Created by STL_QYH on 2023/12/14.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        DispatchQueue.global().async {
            Astruct().amainactorfunc()
        }
        Bstruct().bfunc()
//        MyMainActor.shared.getSomething()
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
        Task {
            await MainActor.run {
                
            }
            // 不处理返回结果版本
//            await withTaskGroup(of: UIImage.self) { taskGroup in
//                //let photoURLs = await listPhotoURLs(inGallery: "Amsterdam Holiday")
//                let photoURLs: [String] = []
//                for photoURL in photoURLs {
//                    //taskGroup.addTask { await downloadPhoto(url: photoURL) }
//                }
//                for await image in taskGroup {
//                    image
//                }
//            }
            // 处理返回结果版本
//            let images = await withTaskGroup(of: UIImage.self, returning: [UIImage].self) { taskGroup in
////                let photoURLs = await listPhotoURLs(inGallery: "Amsterdam Holiday")
//                let photoURLs: [String] = []
//                for photoURL in photoURLs {
////                    taskGroup.addTask { await downloadPhoto(url: photoURL) }
//                }
//                return await taskGroup.reduce(into: [UIImage]()) { partialResult, name in
//                    partialResult.append(name)
//                }
//            }
            // 可抛出错误
            let _images = try await withThrowingTaskGroup(of: UIImage.self, returning: [UIImage].self) { taskGroup in
//                let photoURLs = try await listPhotoURLs(inGallery: "Amsterdam Holiday")
                let photoURLs: [String] = []
                for photoURL in photoURLs {
//                    taskGroup.addTask { try await downloadPhoto(url: photoURL) }
                }
//                do {
////                    var array = [UIImage]()
//                    let images = try await taskGroup.reduce([UIImage](), { partialResult, image in
////                        array.append(image)
//                        return partialResult
//                    })
//                    return images
//                } catch {
//                    return []
//                }
                return try await taskGroup.reduce(into: [UIImage]()) { partialResult, name in
                    partialResult.append(name)
                }
            }
            
            let images = try await withThrowingTaskGroup(of: UIImage.self, returning: [UIImage].self) { taskGroup in
//                let photoURLs = try await listPhotoURLs(inGallery: "Amsterdam Holiday")
                let photoURLs: [URL] = []
                for photoURL in photoURLs {
//                    taskGroup.addTask { try await downloadPhoto(url: photoURL) }
                    taskGroup.addTask {
                        UIImage(data: try Data(contentsOf: photoURL)) ?? UIImage()
                    }
                    let _ = taskGroup.addTaskUnlessCancelled {
                        UIImage(data: try Data(contentsOf: photoURL)) ?? UIImage()
                    }
                }
//                taskGroup.cancelAll()

                var images = [UIImage]()

                /// Note the use of `next()`:
                while let downloadImage = try await taskGroup.next() {
                    images.append(downloadImage)
                }
                return images
            }
            
//            let photoURLs = try await listPhotoURLs(inGallery: "Amsterdam Holiday")
//            let images = try await withThrowingTaskGroup(of: UIImage.self) { _ in
//                for photoURL in photoURLs {
//                Task { try await downloadPhoto(url: photoURL) }
//                }
//            }
            
            
        }

    }

    func updateData(completion: @MainActor @escaping () -> ()) {
        Task {
//            await someHeavyBackgroundOperation()
            await MyMainActor.shared.getSomething()
//            await
            completion()
        }
    }
    
    
}

@globalActor actor MyGlobalActor: GlobalActor {

    static let shared = MyGlobalActor()
}

actor MyMainActor {

    static let shared = MyMainActor()
    
    func getSomething() {
        
    }
}

@MyGlobalActor
class MyGlobalClass {
    
}

@MainActor
class MainClass {
    
}

struct Astruct {
    @MainActor
//    @MyGlobalActor
    func amainactorfunc() {
        
    }
}

//@MainActor
struct Bstruct {
    @MainActor
//    @MyGlobalActor
    func bfunc() {
//        DispatchQueue.main.sync {
            Astruct().amainactorfunc()
//        }
//        MyMainActor.shared.getSomething()!
    }
}

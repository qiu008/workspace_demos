//
//  ViewController.swift
//  Widget
//
//  Created by STL_QYH on 2024/7/23.
//

import UIKit
import ActivityKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        guard ActivityAuthorizationInfo().areActivitiesEnabled else {
            debugPrint("不支持灵动岛")
            return
        }
        ["Woo", "hello", "world"].forEach {
            do {
                // 初始化状态，ContentState是可变的对象
                let attributes = FishWidgetAttributes(name: $0)
                let contentState = FishWidgetAttributes.ContentState(emoji: "🤔️")
                // 初始化状态，这里是不变的数据
                let activity = try Activity.request(attributes: attributes, contentState: contentState) // , pushType: .token
                debugPrint("viewDidLoad_activity.id", activity.id)
//                DispatchQueue.global().asyncAfter(deadline: .now() + .seconds(5)) {
//                    Task {
//                        await activity.update(using: FishWidgetAttributes.ContentState(emoji: "🤩"))
//                    }
//                }
            } catch {
                debugPrint("viewDidLoad_error", error)
            }
        }
    }
    
//    override func viewWillAppear(_ animated: Bool) {
//        super.viewWillAppear(animated)
//        for activity in Activity<FishWidgetAttributes>.activities {
//            Task {
//                await activity.end(dismissalPolicy:.immediate)
//            }
//        }
//    }
}


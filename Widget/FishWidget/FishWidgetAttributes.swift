//
//  FishWidgetAttributes.swift
//  Widget
//
//  Created by STL_QYH on 2024/7/23.
//

import ActivityKit

struct FishWidgetAttributes: ActivityAttributes {

    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }
    // Fixed non-changing properties about your activity go here!
    var name: String
}

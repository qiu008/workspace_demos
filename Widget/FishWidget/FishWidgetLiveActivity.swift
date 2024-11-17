//
//  FishWidgetLiveActivity.swift
//  FishWidget
//
//  Created by STL_QYH on 2024/7/23.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct FishWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FishWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.center) {
                    Text(context.state.emoji)
                    // more content
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension FishWidgetAttributes {
    fileprivate static var preview: FishWidgetAttributes {
        FishWidgetAttributes(name: "World")
    }
}

extension FishWidgetAttributes.ContentState {
    fileprivate static var smiley: FishWidgetAttributes.ContentState {
        FishWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: FishWidgetAttributes.ContentState {
         FishWidgetAttributes.ContentState(emoji: "🤩")
     }
}

//#Preview("Notification", as: .content, using: FishWidgetAttributes.preview) {
//   FishWidgetLiveActivity()
//} contentStates: {
//    FishWidgetAttributes.ContentState.smiley
//    FishWidgetAttributes.ContentState.starEyes
//}
//#Preview("Notification", as: .content, using: FishWidgetAttributes.preview) {
//   FishWidgetLiveActivity()
//} contentStates: {
//    return [FishWidgetAttributes.ContentState.smiley,
//            FishWidgetAttributes.ContentState.starEyes]
//}

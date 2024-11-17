//
//  ContentView.swift
//  SingleDirectionalDataFlow
//
//  Created by STL_QYH on 2024/11/12.
//

import SwiftUI

struct ContentView: View {
    @StateObject var store = Store(state: TimerState(goal: 13 * 3600),
                                   reducer: timerReducer,
                                   dependencies: TimerDependencies(share: { start, end in
                                        // 模拟共享计时状态的逻辑
                                        print("Shared from \(start) to \(String(describing: end))")
                                    }),
                                   middlewares: [timerMiddleware])
    
    var body: some View {
        NavigationView {
            VStack {
                if let start = store.state.start, store.state.end == nil {
                    Text(start, style: .timer)
//                    Label("Lightning", systemImage: "bolt.fill")
                    Button("Stop") {
                        Task { await store.send(.finish) }
                    }
                    
                    Button("Reset") {
                        Task { await store.send(.reset) }
                    }
                } else {
                    Button("Start") {
                        Task { await store.send(.start) }
                    }
                }
            }
            .navigationTitle("Timer")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button("Share") {
                        Task { await store.send(.share) }
                    }
                }
            }
        }
    }
}

#Preview {
    ContentView()
}

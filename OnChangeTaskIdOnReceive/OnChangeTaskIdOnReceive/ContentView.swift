//
//  ContentView.swift
//  OnChangeTaskIdOnReceive
//
//  Created by STL_QYH on 2024/12/5.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
    }
}

class ViewModel: ObservableObject {
    @Published var count = 0
}

struct Root: View {
    @StateObject private var viewModel = ViewModel()
    var body: some View {
        NavigationStack {
            SubView(level: 1)
                .navigationDestination(for: Int.self) { value in
                    SubView(level: value)
                }
        }
        .environmentObject(viewModel)
    }
}

struct SubView: View {
    let level: Int
    @EnvironmentObject var viewModel: ViewModel
    var body: some View {
        VStack {
            // 通过打印 update，验证 viewModel.count 变化时视图的响应性
            let _ = print("level \(level) Updated")
            Button("Count++") {
                viewModel.count += 1
            }
            NavigationLink(value: level + 1) {
                Text("Goto Next Level")
            }
        }
        .buttonStyle(.borderedProminent)
        .navigationTitle(Text("Level: \(level)"))
        // 在每个层级通过 onChange 响应 viewModel.count 的变化
        /// 最底层和最顶层
        .onChange(of: viewModel.count){ _ in
            print("Level *\(level)* onChanged")
        }
        /// 仅最顶层
//        .task(id: viewModel.count){
//            print("Level *\(level)* onChanged in task(id:)")
//        }
        /// 所有层
//        .onReceive(viewModel.$count){ _ in
//            print("Level *\(level)* receive count notification")
//        }
    }
}

#Preview {
    ContentView()
}

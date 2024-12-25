//
//  ContentView.swift
//  Published
//
//  Created by STL_QYH on 2024/12/9.
//
//  @Published

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

#Preview {
    ContentView()
}


/// 何为 @Published 的能力
//不要被它名称尾缀的 ed 所迷惑，它的发布时机是在改变前（ willSet ）
//class Weather {
//    @Published var temperature: Double
//    init(temperature: Double) {
//        self.temperature = temperature
//    }
//}
//let weather = Weather(temperature: 20)
//let cancellable = weather.$temperature
//    .sink() {
//        print ("Temperature now: \($0)")
//}
//weather.temperature = 25
// Temperature now: 20.0
// Temperature now: 25.0

class Weather:ObservableObject {  // 遵循 ObservableObject
    @Published var temperature: Double
    init(temperature: Double) {
        self.temperature = temperature
    }
}
let weather = Weather(temperature: 20)
let cancellable = weather.objectWillChange // 订阅 weather 实例的 obejctWillChange
    .sink() { _ in
        print ("weather will change")
}
//weather.temperature = 25
// weather will change

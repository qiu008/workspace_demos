//
//  ContentView.swift
//  Q
//
//  Created by STL_ on 2020/8/17.
//  Copyright © 2020 STL_. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, World!").bold().foregroundColor(.orange)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

//public protocol View {
//
//    /// The type of view representing the body of this view.
//    ///
//    /// When you create a custom view, Swift infers this type from your
//    /// implementation of the required `body` property.
//    associatedtype Body : View
//
//    /// The content and behavior of the view.
//    @ViewBuilder var body: Self.Body { get }
//}

protocol Food {
//    associatedtype AType: Food
//    var food: AType { get }
    
    func desc() -> String
}
class Apple: Food {
    func desc() -> String {
        return "apple"
    }
}
protocol Animal {
    func eat(food: Food)
}
class People: Animal {
    func eat(food: Food) {
        print("eat \(food.desc())")
    }
}
protocol Animal2 {
    associatedtype F: Food
    
    func eat(food: F)
}
class People2: Animal2 {
    typealias F = Apple
    
    func eat(food: F) {
        print("eat \(food.desc())")
    }
}

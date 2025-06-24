//
//  ContentView.swift
//  SU
//
//  Created by STL_QYH on 2022/9/1.
//

import SwiftUI

struct ContentView: View {
    
    @State var heightText: String = ""
    @State var weightText: String = ""
    @State var bmiDesc: String = ""
    @State var bmi: Float = 0
    @State var isPresented: Bool = false
    
    var body: some View {
        if isPresented {
            Text("isPresented").modifier(MainTitle())
        }
        VStack {
            if isPresented {
                Text("isPresented").mainTitle()
            }
            TextEditor(text: .constant("text editor"))
            Text("BMI").font(.largeTitle)
            TextField("height", text: $heightText)
            TextField("weight", text: $weightText)
            Button("calculate") {
                print("calculate")
                guard let height = Float(heightText),
                      let weight = Float(weightText) else {
                    return
                }
                bmi = weight / height / height
                switch bmi {
                case 30...:
                    bmiDesc = "Obese"
                case 25...:
                    bmiDesc = "OverWeight"
                case 18.5...:
                    bmiDesc = "Ok"
                default:
                    bmiDesc = "UnderWeight"
                }
            }
            Button("Button") {
                print("btn act")
            }
//            .actionSheet(isPresented: $isPresented) {
//                ActionSheet(title: Text("title"))
//            }
            //Link
            Link(destination: URL(string:"https://www.baidu.com/")!) {
                Text("Link")
            }
            
            Link("View Our Terms of Service",
                 destination: URL(string: "https://www.example.com/TOS.html")!)
            
//设置OpenURLAction
//            Link("Visit Our Site", destination: URL(string: "https://www.example.com")!)
//                .environment(\.openURL, OpenURLAction { url in
//                    print("Open \(url)")
//                    return .handled
//                })
            
            Text("\(bmi, specifier: "%.1f"), \(bmiDesc)")
//            Text("文如秋雨").modifier(MainTitle())
//            Text("文如秋雨").mainTitle()
            
//            let schedule = PeriodicTimelineSchedule(from: .now, by: 1)
//            TimelineView(schedule) { ctx in
//                Text(ctx.date.description)
//            }
//            TimelineView(.periodic(from: .now, by: 1)) { context in
//                Text(context.date.description).font(.title)
//            }
            
            
            
        }.padding()
    }
}

//struct ContentView_Previews: PreviewProvider {
//    static var previews: some View {
//        Group {
//            ContentView()
//        }
//        ProfileView()
//        ProfileViewWithOverlay()
//    }
//}

struct ProfileView: View {
    var body: some View {
        ZStack(alignment: .bottom) {
            Image(systemName: "person.circle.fill")
//            Image("ProfilePicture")
                .resizable()
                .frame(width: 200, height: 200)
                .aspectRatio(contentMode: .fit)
            HStack {
//                Spacer()
                VStack(alignment: .leading) {
                    Text("Rachael Chiseck")
                        .font(.headline)
                    Text("Chief Executive Officer")
                        .font(.subheadline)
                }
                Spacer()
            }
            .padding()
            .foregroundColor(.primary)
            .background(Color.primary
                            .colorInvert()
                            .opacity(0.75))
        }
    }
}

struct ProfileViewWithOverlay: View {
    var body: some View {
        VStack {
            Image(systemName: "person.fill")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .overlay(ProfileDetail(), alignment: .bottom)
        }
    }
}


struct ProfileDetail: View {
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text("Rachael Chiseck")
                    .font(.headline)
                Text("Chief Executive Officer")
                    .font(.subheadline)
            }
            Spacer()
        }
        .padding()
        .foregroundColor(.primary)
        .background(Color.primary
                        .colorInvert()
                        .opacity(0.75))
    }
}

struct MainTitle: ViewModifier {
    func body(content: Content) -> some View {
        content
        //修饰符
    }
}

extension View {
    func mainTitle() -> some View {
        self.modifier(MainTitle())
    }
}

final class SwiftUIView: View {
    
    var body: some View {
        Label("Lightning", systemImage: "bolt.fill")
    }
}

let emojis = ["😀", "😬", "😄", "🙂", "😗", "🤓", "😏", "😕", "😟", "😎", "😜", "😍", "🤪"]
struct EmojiDemo: View {
    ///
    struct RightEmoji: View {
//        let id: Int = .random(in: 0 ... 100_000) // 打开这个就可以更新
//        let randomEmoji = emojis.randomElement() ?? ""
        var body: some View {
            let randomEmoji = emojis.randomElement() ?? ""
            Text(randomEmoji)
                .font(.largeTitle)
                .scaleEffect(4.0)
        }
    }
///视图声明值的重新评估条件
///除了首次将视图加载到视图树上需要计算视图声明值外，为了避免不必要的开销，SwiftUI 只有在特定条件下才会重新评估视图声明值。这些条件包括：
///1：由 SwiftUI 预设的属性包装器引发的明确评估要求（例如：@State、@StateObject、@Environment 等）。
///2：视图类型的实例值发生变化。
//    let randomEmoji = emojis.randomElement() ?? ""
    var randomEmoji: String {
        emojis.randomElement() ?? ""
    }
    var body: some View {
        TimelineView(.periodic(from: .now, by: 0.2)) { timeline in
            HStack(spacing: 120) {
//                let randomEmoji = emojis.randomElement() ?? ""
                Text(randomEmoji)
                    .font(.largeTitle)
                    .scaleEffect(4.0)

                RightEmoji()
            }
        }
    }
}
#Preview(body: {
    EmojiDemo()
})

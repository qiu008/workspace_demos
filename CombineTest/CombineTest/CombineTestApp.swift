//
//  CombineTestApp.swift
//  CombineTest
//
//  Created by STL_QYH on 2023/2/6.
//

import SwiftUI
import Combine


@main
struct CombineTestApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct XXAssetModel{
    
    var id = UUID()
    var currency: Int
}

class XXResourceViewModel: ObservableObject {
    
    @Published var myAsset: XXAssetModel = .init(currency: 0)
    
    fileprivate func editCurrency() {
//        let inputSource = InputSource()
//        inputSource.setEventHandler {
//            // 输入源触发时执行的操作
//        }
//        RunLoop.current.add(inputSource, forMode: .common)
        
//        RunLoopQueue
        
        myAsset.currency = myAsset.currency + 10
    }
}

struct ConverterView: View {
    
    @ObservedObject var viewModel = XXResourceViewModel()
    
    var body: some View {
        return Text("\(viewModel.myAsset.currency)")
    }
}

final class UserData: ObservableObject {
    
    let objectWillChange = PassthroughSubject<UserData, Never>()
    
    //    var allCurrencies: [Currency] {
    //        didSet {
    //            objectWillChange.send(self)
    //        }
    //    }
}

//struct ConverterView1: View {
//    @EnvironmentObject var userData: UserData
//    var body: some View {
//        return List(userData.allCurrencies) {
//            Item()
//        }
//    }
//}

//static func request(_ kind: XXKind, _ queryItems: [URLQueryItem]?) -> AnyPublisher<XXResource, Error> {
//    guard var components = URLComponents(url: baseUrl.appendingPathComponent(kind.rawValue), resolvingAgainstBaseURL: true)
//    else { fatalError("Couldn't create URLComponents") }
//    components.queryItems = queryItems
//
//    let request = URLRequest(url: components.url!)
//
//    return apiClient.run(request)
//        .map(.value) // 为XXResource中定义的实际值
//        .eraseToAnyPublisher()
//}

import UIKit

//R.swift

struct Article: Equatable {
    let title: String
}

class Basket {
    var articles = [Article]()
}

protocol Repository {
    func getAll() -> [Article]
}

class DataBaseRepository: Repository {
    func getAll() -> [Article] {
        // TODO：从数据库中查找数据
        return [Article(title: "测试数据")]
    }
}

public protocol InjectionKeyProtocol {
    associatedtype Value
    static var currentValue: Self.Value { get set }
}

/// 提供获取依赖
struct InjectedValues {
    private static var current = InjectedValues()
    
    static subscript<K>(key: K.Type) -> K.Value where K : InjectionKeyProtocol {
        get { key.currentValue }
        set { key.currentValue = newValue }
    }
    
    static subscript<T>(_ keyPath: WritableKeyPath<InjectedValues, T>) -> T {
        get { current[keyPath: keyPath] }
        set { current[keyPath: keyPath] = newValue }
    }
    
    var repository: Repository {
        get { Self[RepositoryKey.self] }
        set { Self[RepositoryKey.self] = newValue }
    }
    
    var service: BasketService {
        get { Self[ServiceKey.self] }
        set { Self[ServiceKey.self] = newValue }
    }
}

@propertyWrapper
struct Injected<T> {
    private let keyPath: WritableKeyPath<InjectedValues, T>
    
    var wrappedValue: T {
        get { InjectedValues[keyPath] }
        set { InjectedValues[keyPath] = newValue }
    }
    
    init(_ keyPath: WritableKeyPath<InjectedValues, T>) {
        self.keyPath = keyPath
    }
}

private struct RepositoryKey: InjectionKeyProtocol {
    static var currentValue: Repository = DataBaseRepository()
}

private struct ServiceKey: InjectionKeyProtocol {
    static var currentValue = BasketService()
}

class BasketService {
    @Injected(\.repository)
    var repository: Repository

    func addArticles(to basket: Basket) {
        let allArticles = repository.getAll()
        basket.articles.append(contentsOf: allArticles)
    }
}

class BasketViewController: UIViewController {
    private var basket = Basket()
    
    @Injected(\.service)
    var service: BasketService
    
    func loadArticles() {
        service.addArticles(to: basket)
        print(basket.articles)
    }
}

let vc = BasketViewController()
vc.loadArticles()

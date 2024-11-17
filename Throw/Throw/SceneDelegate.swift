//
//  SceneDelegate.swift
//  Throw
//
//  Created by STL_QYH on 2023/12/19.
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?


    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
        // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
        // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).
        guard let _ = (scene as? UIWindowScene) else { return }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // Called as the scene is being released by the system.
        // This occurs shortly after the scene enters the background, or when its session is discarded.
        // Release any resources associated with this scene that can be re-created the next time the scene connects.
        // The scene may re-connect later, as its session was not necessarily discarded (see `application:didDiscardSceneSessions` instead).
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene has moved from an inactive state to an active state.
        // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive.
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
        // This may occur due to temporary interruptions (ex. an incoming phone call).
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Called as the scene transitions from the background to the foreground.
        // Use this method to undo the changes made on entering the background.
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Called as the scene transitions from the foreground to the background.
        // Use this method to save data, release shared resources, and store enough scene-specific state information
        // to restore the scene back to its current state.
    }

    let swiftLeeLogo: UIImageView = .init()
    let view: UIView = .init()
    var isConstraints: Bool = false
    
    @AutoLayoutBuilder var constraints: [NSLayoutConstraint] {
        // Single constraint
        swiftLeeLogo.centerXAnchor.constraint(equalTo: view.centerXAnchor)
//        view.constraintsForAnchoringTo(boundsOf: swiftLeeLogo)
        swiftLeeLogo.constraintsAffectingLayout(for: .horizontal)
        if let window {
            swiftLeeLogo.centerYAnchor.constraint(equalTo: window.centerYAnchor)
        }
        if isConstraints {
            swiftLeeLogo.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        } else {
            swiftLeeLogo.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        }
        for _ in (0..<Int.random(in: 0..<10)) {
            swiftLeeLogo.centerXAnchor.constraint(equalTo: view.centerXAnchor) // Single constraint
        }
        if #available(iOS 16, *) { // buildLimitedAvailability
            swiftLeeLogo.centerXAnchor.constraint(equalTo: view.centerXAnchor) // Single constraint
        } else if #available(iOS 17, *) {
            swiftLeeLogo.centerXAnchor.constraint(equalTo: view.centerXAnchor) // Single constraint
        }
        
        if #unavailable(iOS 18) { // buildLimitedAvailability
            swiftLeeLogo.centerXAnchor.constraint(equalTo: view.centerXAnchor) // Single constraint
        } else if #unavailable(iOS 17) {
            swiftLeeLogo.centerXAnchor.constraint(equalTo: view.centerXAnchor) // Single constraint
        }
    }
    
    func test() {
        NSLayoutConstraint.activate {
             // Single constraint
             swiftLeeLogo.centerXAnchor.constraint(equalTo: view.centerXAnchor)
             
//             label.constraintsForAnchoringTo(boundsOf: view) // Returns an array
             
             // Unwrapping an optional
//             if let fixedLogoSize = fixedLogoSize {
//                 swiftLeeLogo.widthAnchor.constraint(equalToConstant: fixedLogoSize.width)
//                 swiftLeeLogo.heightAnchor.constraint(equalToConstant: fixedLogoSize.height)
//             }
             
             // Conditional check
//             if alignLogoTop {
                 // Handle either the first component:
                 swiftLeeLogo.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor)
//             } else {
                 // Or the second component:
                 swiftLeeLogo.centerYAnchor.constraint(equalTo: view.centerYAnchor)
//             }
         }
        let label = UILabel()
        let containerView = UIView()
        containerView.addSubview(label) { containerView, label in
            
            if label.numberOfLines == 1 {
                // Conditional constraints
            }
            
            // Or just use an array:
//            label.constraintsForAnchoringTo(boundsOf: containerView)
            
        }
    }
}

@resultBuilder
struct AutoLayoutBuilder {
    static func buildArray(_ components: [[NSLayoutConstraint]]) -> [NSLayoutConstraint] {
        components.flatMap({$0})
    }
    
    static func buildEither(first component: [NSLayoutConstraint]) -> [NSLayoutConstraint] {
        component
    }
    static func buildEither(second component: [NSLayoutConstraint]) -> [NSLayoutConstraint] {
        component
    }
    // .. Handle different cases, like unwrapping and collections
//    static func buildBlock(_ components: NSLayoutConstraint...) -> [NSLayoutConstraint] {
//        components
//    }
    
    static func buildBlock(_ components: [NSLayoutConstraint]...) -> [NSLayoutConstraint] {
        components.flatMap({$0})
    }
    static func buildOptional(_ component: [NSLayoutConstraint]?) -> [NSLayoutConstraint] {
        component ?? []
    }
    
    static func buildExpression(_ expression: [NSLayoutConstraint]) -> [NSLayoutConstraint] {
        expression
    }
    static func buildExpression(_ expression: NSLayoutConstraint) -> [NSLayoutConstraint] {
        [expression]
    }
    
    
}

extension NSLayoutConstraint {
    /// Activate the layouts defined in the result builder parameter `constraints`.
    static func activate(@AutoLayoutBuilder constraints: () -> [NSLayoutConstraint]) {
        activate(constraints())
    }
}

protocol SubviewContaining {}
extension SubviewContaining where Self == UIView {
    
    /// Add a child subview and directly activate the given constraints.
    func addSubview<View: UIView>(_ view: View, @AutoLayoutBuilder constraints: (Self, View) -> [NSLayoutConstraint]) {
        addSubview(view)
        NSLayoutConstraint.activate(constraints(self, view))
    }
}

extension UIView: SubviewContaining {}

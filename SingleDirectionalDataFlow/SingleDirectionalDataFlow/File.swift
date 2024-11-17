//
//  File.swift
//  SingleDirectionalDataFlow
//
//  Created by STL_QYH on 2024/11/12.
//
//  Functional Core
//

import Foundation

// 函数式核心部分

struct TimerState: Equatable {
    var start: Date?
    var end: Date?
    var goal: TimeInterval
    var sharingStatus: SharingStatus = .notShared
}

enum TimerAction: Equatable {
    case start
    case finish
    case reset
    case share
    case setSharingStatus(SharingStatus)
}

enum SharingStatus: Equatable {
    case shared
    case uploading
    case notShared
}

public typealias Reducer<State, Action> = (State, Action) -> State

let timerReducer: Reducer<TimerState, TimerAction> = { state, action in
    var state = state
    switch action {
    case .start:
        state.start = .now
    case .finish:
        state.end = .now
    case .reset:
        state.start = nil
        state.end = nil
    case .share:
        state.sharingStatus = .uploading
    case let .setSharingStatus(status):
        state.sharingStatus = status
    }
    return state
}

// 副作用部分

public typealias Middleware<State, Action, Dependencies> = (State, Action, Dependencies) async -> Action?

struct TimerDependencies {
    let share: (Date, Date?) async throws -> Void
}

let timerMiddleware: Middleware<TimerState, TimerAction, TimerDependencies> = { state, action, dependencies in
    switch action {
    case .share:
        guard let start = state.start else {
            return .setSharingStatus(.notShared)
        }
        do {
            try await dependencies.share(start, state.end)
            return .setSharingStatus(.shared)
        } catch {
            return .setSharingStatus(.notShared)
        }
    default:
        return nil
    }
}

// 命令式外壳部分

@MainActor public final class Store<State, Action, Dependencies>: ObservableObject {
    @Published public private(set) var state: State

    private let reducer: Reducer<State, Action>
    private let dependencies: Dependencies
    private let middlewares: [Middleware<State, Action, Dependencies>]

    public init(state: State, reducer: @escaping Reducer<State, Action>, dependencies: Dependencies,
                middlewares: [Middleware<State, Action, Dependencies>] = []) {
        self.reducer = reducer
        self.state = state
        self.dependencies = dependencies
        self.middlewares = middlewares
    }

    public func send(_ action: Action) async {
        state = reducer(state, action)

        await withTaskGroup(of: Optional<Action>.self) { [state, dependencies] group in
            for middleware in middlewares {
                group.addTask {
                    await middleware(state, action, dependencies)
                }
            }
            for await case let action? in group {
                await send(action)
            }
        }
    }
}


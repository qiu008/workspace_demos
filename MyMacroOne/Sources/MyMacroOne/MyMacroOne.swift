// The Swift Programming Language
// https://docs.swift.org/swift-book

/// A macro that produces both a value and a string containing the
/// source code that generated the value. For example,
///
///     #stringify(x + y)
///
/// produces a tuple `(x + y, "x + y")`.
@freestanding(expression)
public macro stringify<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "StringifyMacro")

// 独立宏
//@freestanding(expression) // 表达式独立宏
//public macro stringify<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "StringifyMacro")

//@freestanding(declaration) // 声明式
//public macro fdm<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "FdmMacro")


// 绑定宏
//@attached(member) // 成员绑定
//public macro amm<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "AmmMacro")

//@attached(peer) // 对等绑定
//public macro apm<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "ApmMacro")

//@attached(accessor) // 访问器绑定
//public macro aam<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "AamMacro")

//@attached(extension) // 扩展绑定
//public macro aem<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "AemMacro")

//@attached(memberAttribute) // 成员属性绑定
//public macro amam<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "AmamMacro")

//@attached(body) // 函数体替换绑定
//public macro abm<T>(_ value: T) -> (T, String) = #externalMacro(module: "MyMacroOneMacros", type: "AbmMacro")

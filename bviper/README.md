# bivper

STL iOS Team viper templete for generamba

https://github.com/rambler-digital-solutions/Generamba

### 更新记录
#### V1.0
##### 注释规则：

```
/**
* 多行注释
* 注释换行
*/
```

```
/// 单行注释
```

##### 缩进规则：
为了防止模版文件.txt无法完美适配Xcode.1tab = 4space，切节约空间无内容的{}默认不展开
类/方法实现的的大括号

```
func()/class {
    
    /// 代码写这里，上面一个空行，下面无空行
}
```


##### 马克规则：

```
// MARK: - Section

/// 下面内容需空一行
```

```
// MARK: Title
/// 无需空行
```

##### 关于事件选择器：


```
// MARK: - Selector

@objc extension aClass {

    func aSelector(_ sender: Any) {
        /// 实现
    }
}
```
原则上selector默认都是private但未强制要求，主要用与存放
通知、按钮click、视图tap等，如果这里方法较多，可以再如下分类：

```
// MARK: - Selector

@objc extension aClass {

    // MARK: 按钮的事件
    func aSelector(_ sender: Any) {
        /// 实现
    }
    
    // MARK: 通知的事件
    func bSelector(_ sender: Any) {
        /// 实现
    }
}
```

#### V1.1

##### 将protocol中所有的块注释全部换成行注释：

```
// MARK: - ModuleProtocol

/// OuterSide -> Test
protocol TestModuleInput: class {}

/// Test -> OuterSide
protocol TestModuleOutput: class {}

// MARK: - SceneProtocol

/// Presenter -> View
protocol TestViewInput: class {}

/// View -> Presenter
protocol TestViewOutput {}

/// Presenter -> Interactor
protocol TestInteractorInput {}

/// Interactor -> Presenter
protocol TestInteractorOutput: class {}
```

#### V1.2

##### 修正部分注释细节

```
bviper/Code/protocols.swift.liquid
- //  {{ module_info.name }}{{ module_info.file_name }}
+ //  {{ module_info.file_name }}

bviper/Code/Model/interactor.swift.liquid
- //  {{ module_info.name }}{{ module_info.file_name }}
+ //  {{ module_info.file_name }}
```

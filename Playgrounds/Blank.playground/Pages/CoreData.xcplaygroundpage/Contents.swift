//: [Previous](@previous)

import Foundation
import CoreData
//var greeting = "Hello, playground"

//: [Next](@next)

//NSManagedObject

//在 Objective-C 中一个典型的 NSManagedObject 子类的样子是这样的：
// MyModel.h
@interface MyModel : NSManagedObject

@property (nonatomic, copy) NSString * title;

@end

// MyModel.m
#import "MyModel.h"
@implementation MyModel

@dynamic title;

@end



//Core Data 是 Cocoa 的一个重要组成部分，也是非常依赖 @dynamic 特性的部分。Apple 在 Swift 中专门为 Core Data 加入了一个特殊的标注来处理动态代码，那就是 @NSManaged。我们只需要在 NSManagedObject 的子类的成员的字段上加上 @NSManaged 就可以了：
class MyModel: NSManagedObject {

    @NSManaged var title: String

}
#imageLiteral(resourceName: "coredata.png")

//另外，在通过数据模型图创建 Entity 时要特别注意在 Class 中指定类型名时必须加上 app 的 module 名字，才能保证在代码中做类型转换时不发生错误。

//最后要指出一点，Apple 在文档中指出 @NSManaged 是专门用来解决 Core Data 中动态代码的问题的，因此我们最好是遵守这个规则，只在 NSManagedObject 的子类中使用它。但是如果你将 @NSManaged 写到其他的类中，也是能够编译通过的。在这种情况下，被标记的属性的访问将会回滚到 Objective-C 的 getter 和 setter 方法。也即，对于一个叫做 title 的属性，在运行时会调用 title 和 setTitle: 方法。行为上来说和以前的 @dynamic 关键字是一样的，我们当然也可以使用 Objective-C 运行时来提供这两个方法，但是要注意的是这么做的话我们就必须对涉及到的类和方法标记为 @objc。我并不推荐这样做，因为你无法知道这样的代码在下一个版本中是否还能工作。

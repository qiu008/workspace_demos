//struct Material {
//    public var roughness: Float
//    public var color: Color
//    public var texture: Texture
//}

//class Texture {
//    var isSparkly: Bool
//}

//struct Material {
//    private var _texture: Texture
//
//    public var texture {
//        get { _texture }
//        set { _texture = Texture(copying: newValue) }
//    }
//}

//struct Material {
//    private var _texture: Texture
//
//    public var isSparkly: Bool {
//        get {
//            if !isKnownUniquelyReferenced(&amp;_texture) { // 确保 _texture 引用计数为 1
//                _texture = Texture(copying: _texture)
//            }
//            return _texture.isSparkly
//        }
//        set {
//            _texture.isSparkly = newValue
//        }
//    }
//}

//@dynamicMemberLookup
//struct Material {
//    public var roughness: Float
//    public var color: Color
//
//    private var _texture: Texture
//
//    public subscript<T>(dynamicMember keyPath: ReferenceWritableKeyPath<Texture, T>) -> T {
//        get { _texture[keyPath: keyPath] }
//        set {
//            if !isKnownUniquelyReferenced(&amp;_texture) { _texture = Texture(copying: _texture) }
//            _texture[keyPath: keyPath] = newValue
//        }
//    }
//}

// Implementing a Property Wrapper
//@propertyWrapper
//public struct LateInitialized<Value> {
//
//    private var storage: Value?
//
//    public var value: Value {
//        get {
//            guard let value = storage else {
//                fatalError("value has not yet been set!")
//            }
//            return value
//        }
//        set { storage = newValue }
//    }
//}

//@LateInitialized public var text: String

// Compiler-synthesized code…
//var $text: LateInitialized<String> = LateInitialized<String>()
//public var text: String {
//    get { $text.value }
//    set { $text.value = newValue }
//}

//@UserDefault(key: "BOOSTER_IGNITED", defaultValue: false)
//static var isBoosterIgnited: Bool
//
//@ThreadSpecific
//var localPool: MemoryPool
//
//@Option(shorthand: "m", documentation: "Minimum value", defaultValue: 0) // 命令行参数
//var minimum: Int

//@propertyWrapper
//struct CopyOnWrite<Value: Copyable> {
//    init(initialValue: Value) {
//        store = initialValue
//    }
//
//    private var store: Value
//
//    var value: Value {
//        mutating get {
//            if !isKnownUniquelyReferenced(&amp;store) {
//                store = store.copy()
//            }
//            return store
//        }
//        set { store = newValue }
//    }
//}

//struct Material {
//    public var roughness: Float
//    public var color: Color
//    @CopyOnWrite public var texture: Texture
//}

//extension Texture: Copyable { ... }

//struct Topic {
//    var title: String = "Hello World"
//    var content: String = "Hello World"
//}

//struct TopicViewer: View {
//    @State private var isEditing = false
//    @Binding var topic: Topic
//
//    var body: some View {
//        VStack {
//            Text("Title: #\(topic.title)")
//            if isEditing {
//                TextField($topic.content)
//            }
//        }
//    }
//}

//@propertyWrapper @dynamicMemberLookup
//public struct Binding<Value> {
//
//    public var value: Value {
//        get { ... }
//        nonmutating set { ... }
//    }
//
//    public subscript<Property>(dynamicMember keyPath: WritableKeyPath<Value, Property>) {
//        ...
//    }
//}

//@Binding var topic: Topic
// 等价于
//var $topic: Binding<Topic> = Binding<Topic>()
//public var topic: Topic {
//    get { $topic.value }
//    set { $topic.value = newValue }
//}

//topic                // Topic instance
//topic.title          // String instance

//$topic      // Binding<Topic> instance
//$topic.title      // Binding<String> instance
//$topic[dynamicMember: \Topic.title]  // Binding<String> instance

//let a = ["", "a", nil]
//for item in a where item?.isEmpty == false {
//    print(item)
//}

protocol TestProtocol: AnyObject {
    func test()
}

struct Struct {
//    var name = "name"
//    var age = 0
    let name: String = ""
    var age: Int
}
var a = Struct(age: 0)
print(a)
//a.name = "someone"
//a.age = 1
//print(a)
var b = a
//b.name = "someone"
b.age = 1
print(a)
print(b)

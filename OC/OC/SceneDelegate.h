//
//  SceneDelegate.h
//  OC
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SceneDelegate : UIResponder <UIWindowSceneDelegate>

@property (strong, nonatomic) UIWindow * window;

@end

/*
 // NSObject 结构体
 #ifndef _REWRITER_typedef_NSObject
 #define _REWRITER_typedef_NSObject
 typedef struct objc_object NSObject; // 定义
 typedef struct {} _objc_exc_NSObject;
 #endif

 struct NSObject_IMPL { // 实现
     Class isa;
 };
 
 // 可以看到,objc_object中就是一个isa
 struct objc_object {
 private:
     isa_t isa;

 public://外部可以获取isa
     // getIsa() allows this to be a tagged pointer object
     Class getIsa();
 }
 
 // 在objc源码中可以看到Class就是通过objc_class结构体定义的，它就表示一个类
 typedef struct objc_class *Class;
 
 // objc_class
 struct objc_class : objc_object {//继承自objc_object,充分证明万物皆对象
     // Class ISA;               //来自继承的objc_object
     Class superclass;           //父类
     cache_t cache;             // 方法缓存区，快速查询方法
     class_data_bits_t bits;    // 类信息，方法、协议、属性、成员变量列表

     class_rw_t *data() const {//获取bits的数据
         return bits.data();
     }
 }
 
 struct class_data_bits_t {
     friend objc_class;

     // Values are the FAST_ flags above.
     uintptr_t bits;
 private:
     //获取数据，为class_rw_t
     class_rw_t* data() const {
         return (class_rw_t *)(bits & FAST_DATA_MASK);
     }
 }
 
 // 创建新类继承自 NSObject
 @interface WYPerson : NSObject

 @property (nonatomic, assign) int age;

 @end

 @implementation WYPerson

 - (void)eat{
     NSLog(@"eat");
 }
 
 // WYPerson 结构体
 #ifndef _REWRITER_typedef_WYPerson
 #define _REWRITER_typedef_WYPerson
 typedef struct objc_object WYPerson;
 typedef struct {} _objc_exc_WYPerson;
 #endif

 extern "C" unsigned long OBJC_IVAR_$_WYPerson$_age;
 struct WYPerson_IMPL {
     struct NSObject_IMPL NSObject_IVARS;
     int _age;
 };
 
 
 
 */

// 缓存调用过的方法sel-imp
//ALWAYS_INLINE
//void cache_t::insert(Class cls, SEL sel, IMP imp, id receiver)
//{
//#if CONFIG_USE_CACHE_LOCK
//    cacheUpdateLock.assertLocked();
//#else
//    runtimeLock.assertLocked();
//#endif
//
//    ASSERT(sel != 0 && cls->isInitialized());
//
//    // Use the cache as-is if it is less than 3/4 full只有当缓存的使用小于等于3/4的时候直接使用
//    mask_t newOccupied = occupied() + 1;//这是一个临时变量，也就是用来看做如果添加成功后的换粗占用量
//    unsigned oldCapacity = capacity(), capacity = oldCapacity;//获取到当前缓存容量
//    if (slowpath(isConstantEmptyCache())) {
//        // Cache is read-only. Replace it.
//        if (!capacity) capacity = INIT_CACHE_SIZE;//初始容量设置为4
//        reallocate(oldCapacity, capacity, /* freeOld */false);//开启一个容量为4的空间，不会将旧空间删掉
//    }
//    else if (fastpath(newOccupied + CACHE_END_MARKER <= capacity / 4 * 3)) {
//        //occupied() + 1 + 1 <=3/4，也就是总数+2小于等于总容量的3/4就可以直接存入
//        // Cache is less than 3/4 full. Use it as-is.
//        //当缓存的使用量小于等于3/4的时候直接使用缓存
//    }
//    else {
//        capacity = capacity ? capacity * 2 : INIT_CACHE_SIZE;//扩容两倍
//        if (capacity > MAX_CACHE_SIZE) {//最大缓存值判断，不能超过2^16，不能无限扩大
//            capacity = MAX_CACHE_SIZE;
//        }
//        reallocate(oldCapacity, capacity, true);//开辟空间，删除旧空间
//    }
//
//    bucket_t *b = buckets();//取出第一个bucket，为了下面的循环遍历
//    mask_t m = capacity - 1;//这里可以看到mask就是capacity-1
//    mask_t begin = cache_hash(sel, m);//哈希算法，(mask_t)(uintptr_t)sel & mask
//    mask_t i = begin;
//
//    // Scan for the first unused slot and insert there.
//    // There is guaranteed to be an empty slot because the
//    // minimum size is 4 and we resized at 3/4 full.
//    //先查询该位置是否为空，如果不为空且存储的内容是其他sel，说明发生了冲突，就通过哈希冲突算法进行计算下标，并再次判断该坐标是否为空
//    do {
//        //如果该下标所在的位置是空的，就直接存储
//        if (fastpath(b[i].sel() == 0)) {
//            incrementOccupied();//occupied++，每次插入都要给occupied++，因此他记录的是缓存的方法的个数
//            b[i].set<Atomic, Encoded>(sel, imp, cls);//存储
//            return;
//        }
//        //其他线程已经添加过了，就直接退出
//        if (b[i].sel() == sel) {
//            // The entry was added to the cache by some other thread
//            // before we grabbed the cacheUpdateLock.
//            return;
//        }
//    } while (fastpath((i = cache_next(i, m)) != begin));//哈希冲突算法：i ? i-1 : mask;
//
//    cache_t::bad_cache(receiver, (SEL)sel, cls);
//}


// class_rw_t
/*
struct class_rw_t {
    // Be warned that Symbolication knows the layout of this structure.
    uint32_t flags;
    uint16_t witness;
#if SUPPORT_INDEXED_ISA
    uint16_t index;
#endif

    //属性 ro或rwe，这是一个结构体，包含ro和rwe
    explicit_atomic<uintptr_t> ro_or_rw_ext;

    Class firstSubclass;
    Class nextSiblingClass;

private:
    using ro_or_rw_ext_t = objc::PointerUnion<const class_ro_t *, class_rw_ext_t *>;

    const ro_or_rw_ext_t get_ro_or_rwe() const {
        return ro_or_rw_ext_t{ro_or_rw_ext};
    }

    void set_ro_or_rwe(const class_ro_t *ro) {
        ro_or_rw_ext_t{ro}.storeAt(ro_or_rw_ext, memory_order_relaxed);
    }

    void set_ro_or_rwe(class_rw_ext_t *rwe, const class_ro_t *ro) {
        // the release barrier is so that the class_rw_ext_t::ro initialization
        // is visible to lockless readers
        rwe->ro = ro;
        ro_or_rw_ext_t{rwe}.storeAt(ro_or_rw_ext, memory_order_release);
    }

    class_rw_ext_t *extAlloc(const class_ro_t *ro, bool deep = false);

public:
    void setFlags(uint32_t set)
    {
        __c11_atomic_fetch_or((_Atomic(uint32_t) *)&flags, set, __ATOMIC_RELAXED);
    }

    void clearFlags(uint32_t clear)
    {
        __c11_atomic_fetch_and((_Atomic(uint32_t) *)&flags, ~clear, __ATOMIC_RELAXED);
    }

    // set and clear must not overlap
    void changeFlags(uint32_t set, uint32_t clear)
    {
        ASSERT((set & clear) == 0);

        uint32_t oldf, newf;
        do {
            oldf = flags;
            newf = (oldf | set) & ~clear;
        } while (!OSAtomicCompareAndSwap32Barrier(oldf, newf, (volatile int32_t *)&flags));
    }

    //得到rwe
    class_rw_ext_t *ext() const {
        return get_ro_or_rwe().dyn_cast<class_rw_ext_t *>();
    }

    //开辟rwe的空间
    class_rw_ext_t *extAllocIfNeeded() {
        auto v = get_ro_or_rwe();
        if (fastpath(v.is<class_rw_ext_t *>())) {
            return v.get<class_rw_ext_t *>();
        } else {
            return extAlloc(v.get<const class_ro_t *>());
        }
    }

    class_rw_ext_t *deepCopy(const class_ro_t *ro) {
        return extAlloc(ro, true);
    }

    //获取ro
    const class_ro_t *ro() const {
        auto v = get_ro_or_rwe();
        //如果存在class_rw_ext_t,则从rwe中查找ro
        if (slowpath(v.is<class_rw_ext_t *>())) {
            return v.get<class_rw_ext_t *>()->ro;
        }
        //否则直接查找
        return v.get<const class_ro_t *>();
    }

    //第一次从内存中加载给rw设置数据的时候，需要设置ro
    void set_ro(const class_ro_t *ro) {
        auto v = get_ro_or_rwe();
        //为什么有可能会有class_rw_ext_t？？？？？
        if (v.is<class_rw_ext_t *>()) {
            v.get<class_rw_ext_t *>()->ro = ro;
        } else {
            set_ro_or_rwe(ro);
        }
    }

    //获取所有的方法列表的数组
    const method_array_t methods() const {
        auto v = get_ro_or_rwe();
        if (v.is<class_rw_ext_t *>()) {
            return v.get<class_rw_ext_t *>()->methods;
        } else {
            return method_array_t{v.get<const class_ro_t *>()->baseMethods()};
        }
    }

    //获取所有的属性列表的数组
    const property_array_t properties() const {
        auto v = get_ro_or_rwe();
        if (v.is<class_rw_ext_t *>()) {
            return v.get<class_rw_ext_t *>()->properties;
        } else {
            return property_array_t{v.get<const class_ro_t *>()->baseProperties};
        }
    }

    //获取所有的协议列表的数组
    const protocol_array_t protocols() const {
        auto v = get_ro_or_rwe();
        if (v.is<class_rw_ext_t *>()) {
            return v.get<class_rw_ext_t *>()->protocols;
        } else {
            return protocol_array_t{v.get<const class_ro_t *>()->baseProtocols};
        }
    }
};
*/

// class_ro_t
/*
 struct class_ro_t {
     uint32_t flags;
     uint32_t instanceStart;
     uint32_t instanceSize;
 #ifdef __LP64__
     uint32_t reserved;
 #endif

     //这个是干什么的
     const uint8_t * ivarLayout;
     
     const char * name;
     //方法、协议、属性
     method_list_t * baseMethodList;//基础方法列表
     protocol_list_t * baseProtocols;//基础协议列表
     const ivar_list_t * ivars;//成员变量列表，这里变量没有写base，也可以看出这个是不变的

     const uint8_t * weakIvarLayout;
     property_list_t *baseProperties;//基础属性列表

     // This field exists only when RO_HAS_SWIFT_INITIALIZER is set.
     _objc_swiftMetadataInitializer __ptrauth_objc_method_list_imp _swiftMetadataInitializer_NEVER_USE[0];

     _objc_swiftMetadataInitializer swiftMetadataInitializer() const {
         if (flags & RO_HAS_SWIFT_INITIALIZER) {
             return _swiftMetadataInitializer_NEVER_USE[0];
         } else {
             return nil;
         }
     }

     method_list_t *baseMethods() const {
         return baseMethodList;
     }

     class_ro_t *duplicate() const {
         if (flags & RO_HAS_SWIFT_INITIALIZER) {
             size_t size = sizeof(*this) + sizeof(_swiftMetadataInitializer_NEVER_USE[0]);
             class_ro_t *ro = (class_ro_t *)memdup(this, size);
             ro->_swiftMetadataInitializer_NEVER_USE[0] = this->_swiftMetadataInitializer_NEVER_USE[0];
             return ro;
         } else {
             size_t size = sizeof(*this);
             class_ro_t *ro = (class_ro_t *)memdup(this, size);
             return ro;
         }
     }
 };
 */


// class_rw_ext_t
/*
 这里包含了ro
 新增的只有方法、属性、协议，没有变量
 这里存放的是所有的，包含目标类的
 */
/*
 struct class_rw_ext_t {
     const class_ro_t *ro;
     method_array_t methods;
     property_array_t properties;
     protocol_array_t protocols;
     char *demangledName;
     uint32_t version;
 };
 */

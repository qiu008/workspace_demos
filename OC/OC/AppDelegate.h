//
//  AppDelegate.h
//  OC
//
//  Created by STL_ on 2020/8/21.
//  Copyright © 2020 STL_. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@end
/*
// class_data_bits_t 是一个指针大小的结构体，保存着类的方法、属性、遵循的协议等信息。
struct class_data_bits_t {
    // Values are the FAST_ flags above.
    uintptr_t bits;
    ...
    
    class_rw_t* data() {
        return (class_rw_t *)(bits & FAST_DATA_MASK);
    }
    
    const class_ro_t *safe_ro() const {
        class_rw_t *maybe_rw = data();
        if (maybe_rw->flags & RW_REALIZED) {
            // maybe_rw is rw
            return maybe_rw->ro();
        } else {
            // maybe_rw is actually ro
            return (class_ro_t *)maybe_rw;
        }
    }
}
 
 // iOS 14 以下
 template <typename Element, typename List, uint32_t FlagMask>
 struct entsize_list_tt {
     uint32_t entsizeAndFlags;
     uint32_t count;
     Element first;
       // other code
     uint32_t entsize() const {return entsizeAndFlags & ~FlagMask;}
 }

 struct method_list_t : entsize_list_tt<method_t, method_list_t, 0x3> {...};

 struct ivar_list_t : entsize_list_tt<ivar_t, ivar_list_t, 0> {...};

 struct property_list_t : entsize_list_tt<property_t, property_list_t, 0> {...};
 
 struct method_t {
     SEL name;
     const char *types;
     MethodListIMP imp;
   ...
 };
 
 // iOS 14
 template <typename Element, typename List, uint32_t FlagMask, typename PointerModifier = PointerModifierNop>
 struct entsize_list_tt {
     uint32_t entsizeAndFlags;
     uint32_t count;
     uint32_t entsize() const {return entsizeAndFlags & ~FlagMask;}
     uint32_t flags() const {return entsizeAndFlags & FlagMask;}
 };

 struct method_list_t : entsize_list_tt<method_t, method_list_t, 0xffff0003, method_t::pointer_modifier> {uint32_t indexOfMethod(const method_t *meth) const {
         uint32_t i =
             (uint32_t)(((uintptr_t)meth - (uintptr_t)this)/ entsize());
         ASSERT(i < count);
         return i;
     }

     bool isSmallList() const {return flags() & method_t::smallMethodListFlag;
     }
 };

 struct method_t {
     static const uint32_t smallMethodListFlag = 0x80000000;

     method_t(const method_t &other) = delete;

     // The representation of a "big" method. This is the traditional
     // representation of three pointers storing the selector, types
     // and implementation.
     struct big {
         SEL name;
         const char *types;
         MethodListIMP imp;
     };

 private:
     bool isSmall() const {return ((uintptr_t)this & 1)== 1;}

     // The representation of a "small" method. This stores three
     // relative offsets to the name, types, and implementation.
     struct small {
         // The name field either refers to a selector (in the shared
         // cache)or a selref (everywhere else).
         RelativePointer<const void *> name;
         RelativePointer<const char *> types;
         RelativePointer<IMP> imp;

         bool inSharedCache() const {
             return (CONFIG_SHARED_CACHE_RELATIVE_DIRECT_SELECTORS &&
                     objc::inSharedCache((uintptr_t)this));}
     };

     small &small() const {
         ASSERT(isSmall());
         return *(struct small *)((uintptr_t)this & ~(uintptr_t)1);
     }
 };
*/

// Describes an entry in the symbol table. It’s declared in /usr/include/mach-o/nlist.h.
struct nlist
{
    union {
#ifndef __LP64__
                char *n_name;   /* for use when in-core */
#endif
        long  n_strx;
    } n_un;
    unsigned char n_type;
    unsigned char n_sect;
    short n_desc;
    
#ifdef __LP32__
      /*32 位中 4byte*/
    unsigned long n_value;
#else
      /*64 位中 8byte*/
    unsigned long long n_value;
#endif
  
};

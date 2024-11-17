//: [Previous](@previous)

import Foundation

//var greeting = "Hello, playground"

//: [Next](@next)

//但是故事还没有最终结束。我们刚才编译的时候只做了模拟器的版本，如果你尝试一下在 app 项目中将目标切换为真机的话，会发现根本无法编译，这是由于模拟器和实际设备所使用的架构不同导致的。我们需要回到框架项目中，将编译目标切换为 iOS Device，然后再次使用 Shift + Cmd + I 进行编译。这时我们可以在 Release-iphoneos 文件夹下得到真实设备可以使用的框架。最后我们通过 lipo 命令将适用于多个架构的二进制文件进行合并，以得到可以在模拟器和实际设备上通用的二进制文件：

//lipo -create -output HelloKit \
//       Release-iphoneos/HelloKit.framework/HelloKit \
//       Release-iphonesimulator/HelloKit.framework/HelloKit

//然后将得到的包含各架构的新的 HelloKit 文件复制到刚才的模拟器版本的 HelloKit.framework 中 (没错其实它是个文件夹)，覆盖原来的版本。最后再将 Release-iphoneos 中的框架文件里的 /Modules/HelloKit.swiftmodule 下的 arm.swiftmodule 和 arm64.swiftmodule 两个文件复制到模拟器版本的对应的文件夹下 (这个文件夹下最终应该会有 i386，x86_64，arm 和 arm64 四个版本的 module 文件)。我们现在就得到了一个通吃模拟器和实际设备的框架了，用这个框架替换掉刚才我们复制到 app 项目中的那个，app 应该就可以同时在模拟器和设备上使用这个自制框架了。

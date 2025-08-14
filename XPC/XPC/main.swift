//
//  main.swift
//  XPC
//
//  Created by stl_ on 2025/6/30.
//

import Foundation

class ServiceDelegate: NSObject, NSXPCListenerDelegate {
    
    /// This method is where the NSXPCListener configures, accepts, and resumes a new incoming NSXPCConnection.
    func listener(_ listener: NSXPCListener, shouldAcceptNewConnection newConnection: NSXPCConnection) -> Bool {
        
        // Configure the connection.
        // First, set the interface that the exported object implements.
        newConnection.exportedInterface = NSXPCInterface(with: XPCProtocol.self)
        
        // Next, set the object that the connection exports. All messages sent on the connection to this service will be sent to the exported object to handle. The connection retains the exported object.
        let exportedObject = XPC()
        newConnection.exportedObject = exportedObject
        
        // Resuming the connection allows the system to deliver more incoming messages.
        newConnection.resume()
        
        // Returning true from this method tells the system that you have accepted this connection. If you want to reject the connection for some reason, call invalidate() on the connection and return false.
        return true
    }
}

// Create the delegate for the service.
let delegate = ServiceDelegate()

// Set up the one NSXPCListener for this service. It will handle all incoming connections.
let listener = NSXPCListener.service()
listener.delegate = delegate

// Resuming the serviceListener starts this service. This method does not return.
listener.resume()

// 客户端进程
//let connection = NSXPCConnection(serviceName: "com.example.xpc-service")
//connection.remoteObjectInterface = NSXPCInterface(with: XPCServiceProtocol.self)
//connection.resume()

// 调用远程进程的方法
//guard let service = connection.remoteObjectProxy as? XPCServiceProtocol else { return }
//service.doTasks { result in
//    print("Received result: (result)")
//}
//service.processData("Hello from App") { response in
//    print("Received response: (response)")
//}

// 写入进程
let fileURL = URL(fileURLWithPath: "/path/to/shared/file.txt")
let coordinator = NSFileCoordinator()
coordinator.coordinate(writingItemAt: fileURL, options: .forReplacing, error: nil) { newURL in
    try? "Data from Process A".write(to: newURL, atomically: true, encoding: .utf8)
}

// 读取进程
coordinator.coordinate(readingItemAt: fileURL, options: .withoutChanges, error: nil) { newURL in
    if let content = try? String(contentsOf: newURL, encoding: .utf8) {
        print("Received: (content)")
    }
}

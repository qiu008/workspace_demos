//
//  Photo.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2023/9/12.
//

import Photos
import Foundation
import AVFoundation

private let sessionQueue = DispatchQueue(label: "sessionQueue", qos: .userInteractive)
private let session: AVCaptureSession = AVCaptureSession()
private let photoOutput: AVCapturePhotoOutput = AVCapturePhotoOutput()

private func configureCameraView() {
//    contentView.videoPreviewLayer.session = session
//    contentView.videoPreviewLayer.videoGravity = .resizeAspectFill
//    contentView.videoPreviewLayer.connection?.videoOrientation = .portrait

    sessionQueue.async {
//        self.session.beginConfiguration()
//        self.session.sessionPreset = .photo
//        self.addInputVideo()
//        self.addPhotoOutput()
//        self.session.commitConfiguration()
//        // 启动相机
//        self.startRunning()
    }
}

private func addInputVideo() {
    if let backCamera = defaultCameraDevice() {
        try? backCamera.lockForConfiguration()
        if backCamera.isLowLightBoostEnabled,
           !backCamera.automaticallyEnablesLowLightBoostWhenAvailable {
            backCamera.automaticallyEnablesLowLightBoostWhenAvailable = true
        }

        if backCamera.isSmoothAutoFocusSupported {
            backCamera.isSmoothAutoFocusEnabled = true
        }
        if backCamera.isFocusModeSupported(.continuousAutoFocus) {
            backCamera.focusMode = .continuousAutoFocus
        }
        backCamera.unlockForConfiguration()

        guard let videoInput = try? AVCaptureDeviceInput(device: backCamera),
              session.canAddInput(videoInput),
              !self.session.inputs.contains(videoInput) else { return }
        session.addInput(videoInput)
    }
}

private func addPhotoOutput() {
    photoOutput.maxPhotoQualityPrioritization = .quality
    photoOutput.isHighResolutionCaptureEnabled = true

    if #available(iOS 17.0, *) {
        // 开启延迟处理
        if photoOutput.isAutoDeferredPhotoDeliverySupported {
            photoOutput.isAutoDeferredPhotoDeliveryEnabled = true
        }
    } else { }
    guard !session.outputs.contains(photoOutput),
          session.canAddOutput(photoOutput) else { return }
    session.addOutput(photoOutput)
}

private func defaultCameraDevice() -> AVCaptureDevice? {
    if let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back) {
        return device // 0.5 - 0.6s，默认广角
    }
    return nil
}

@available(iOS 17.0, *)
func photoOutput(_ output: AVCapturePhotoOutput, didFinishCapturingDeferredPhotoProxy deferredPhotoProxy: AVCaptureDeferredPhotoProxy?, error: Error?) {
    if let error {
        print("deferredPhotoProxy error: \(error)")
        return
    }
    guard let data = deferredPhotoProxy?.fileDataRepresentation() else { return }

    let library = PHPhotoLibrary.shared()
    library.performChanges {
        let request = PHAssetCreationRequest.forAsset()
        request.addResource(with: .photoProxy, data: data, options: nil)
    } completionHandler: { _, error in
        if let error {
            print("PHAssetCreationRequest error: \(error)")
        } else {
            print("save success")
        }
    }
}

func requestAndHandleImageRepresentations(asset: PHAsset,
                                          targetSize: CGSize,
                                          contentMode: PHImageContentMode) -> PHImageRequestID {
    let imageManager = PHImageManager.default()
    let option = PHImageRequestOptions()
    if #available(iOS 17, *) {
        option.allowSecondaryDegradedImage = true
    } else { }
    let requestID = imageManager.requestImage(for: asset, targetSize: targetSize, contentMode: contentMode, options: option) { _, info in
        if let info,
           let intValue = info[PHImageResultIsDegradedKey] as? Int,
           intValue == 1 {
            // 回调两次，一次 Initial 小图
            // 一次 Secondary 照片
        } else {
            // 回调一次
            // image 为 final 图，真实高质量大图
        }
    }
    return requestID
}

class CameraViewController: NSObject {}

@available(iOS 17.0, *)
extension CameraViewController: AVCapturePhotoOutputReadinessCoordinatorDelegate {

    func readinessCoordinator(_ coordinator: AVCapturePhotoOutputReadinessCoordinator, captureReadinessDidChange captureReadiness: AVCapturePhotoOutput.CaptureReadiness) {
        // 根据 captureReadiness 值更新拍摄按钮的状态
        
        
        
        
        if #available(iOS 17.0, *) {
            let readinessCoordination = AVCapturePhotoOutputReadinessCoordinator(photoOutput: photoOutput)
            readinessCoordination.delegate = self
            
            let photoSettings = AVCapturePhotoSettings()
            // 开启追踪
            readinessCoordination.startTrackingCaptureRequest(using: photoSettings)
            photoOutput.capturePhoto(with: photoSettings, delegate: self)
        }
    }
}

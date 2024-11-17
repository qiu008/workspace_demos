//
//  PageViewController.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2021/1/7.
//

import UIKit
//import Photos
import PhotosUI
import _PhotosUI_SwiftUI

class PageViewController: UIPageViewController {

    let array: [UIColor] = [.red, .orange, .yellow, .green, .cyan, .blue, .purple]
    
    var vcs = [UIViewController]()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.delegate = self
        self.dataSource = self
        
        array.forEach {
            let vc = UIViewController()
            vc.view.backgroundColor = $0
            vcs.append(vc)
        }
//        setViewControllers(vcs, direction: .forward, animated: true)
        setViewControllers([vcs.first!], direction: .forward, animated: true)
        
        let btn = UIButton(configuration: .filled())
        
        // UIKit
        let vc = PHPickerViewController(configuration: .init(photoLibrary: PHPhotoLibrary()))
//        PHPickerResult
        // SwiftUI
//        let pp = PhotosPicker(selection: <#T##Binding<PhotosPickerItem?>#>, matching: <#T##PHPickerFilter?#>, preferredItemEncoding: <#T##PhotosPickerItem.EncodingDisambiguationPolicy#>, photoLibrary: <#T##PHPhotoLibrary#>, label: <#T##() -> Label#>)
//        PhotosPickerItem
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

class UIKitVersionViewController: UIViewController {
//    @ObservedObject var viewModel = ViewModel()
    let emptyView = UIImageView()
    lazy var compositionalLayout = makeCompositionalLayout()
    lazy var collectionView = UICollectionView(frame: .zero, collectionViewLayout: compositionalLayout)
//    lazy var dataSource = makeDataSource()
    let button = UIButton(configuration: .filled())

}
extension UIKitVersionViewController {

    func makeCompositionalLayout() -> UICollectionViewCompositionalLayout {
        .list(using: .init(appearance: .insetGrouped))
    }

//    func makeDataSource() -> UICollectionViewDiffableDataSource<String, ImageAttachment> {
//        let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, ImageAttachment> { cell, _, itemIdentifier in
//            var contentConfiguration = ImageAttachmentView.ContentConfiguration()
//            contentConfiguration.imageAttachment = itemIdentifier
//            cell.contentConfiguration = contentConfiguration
//        }
//        let dataSource = UICollectionViewDiffableDataSource<String, ImageAttachment>(collectionView: collectionView) { collectionView, indexPath, itemIdentifier in
//            let cell = collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: itemIdentifier)
//            return cell
//        }
//        return dataSource
//    }

//    func applySnapshot() {
//        var snapshot = NSDiffableDataSourceSnapshot<String, ImageAttachment>()
//        snapshot.appendSections([Constants.List.sectionIdentifier])
//        snapshot.appendItems(viewModel.itemViewModels, toSection: Constants.List.sectionIdentifier)
//        dataSource.apply(snapshot)
//        emptyView.isHidden = !viewModel.itemViewModels.isEmpty
//    }
}

protocol LoadTransferableProviding {

//    func loadTransferable<T: Transferable & NSItemProviderReading>(type: T.Type) async throws -> T?
}
extension PhotosPickerItem: LoadTransferableProviding {}

extension NSItemProvider {

//    func loadTransferable<T: Transferable & NSItemProviderReading>(type: T.Type) async throws -> T? {
//        guard _canLoadObject(ofClass: type) else { return nil }
//        let received = try await withCheckedThrowingContinuation { continuation in
//            _ = loadTransferable(type: type) { continuation.resume(with: $0) }
//        }
//        return received
//    }

    private func _canLoadObject(ofClass aClass: NSItemProviderReading.Type) -> Bool {
        if aClass is PHLivePhoto.Type { return canLoadObject(ofClass: aClass) }
        if aClass is AVURLAsset.Type { return hasItemConformingToTypeIdentifier(UTType.movie.identifier) }
        if aClass is UIImage.Type { return canLoadObject(ofClass: aClass) }
        assertionFailure()
        return false
    }
}
// MARK: 不要在生产环境这么写
//extension UIImage: Transferable {
//
//    public static var transferRepresentation: some TransferRepresentation {
//        DataRepresentation(importedContentType: .image) { data in
//            guard let image = UIImage(data: data) else { throw ImageLoadingError.contentTypeNotSupported }
//            return image
//        }
//    }
//}
//
//extension AVURLAsset: Transferable {
//
//    public static var transferRepresentation: some TransferRepresentation {
//        FileRepresentation(importedContentType: .movie) { receivedFile in
//            let fileManager = FileManager.default
//            let fileName = receivedFile.file.lastPathComponent
//            let copingFile = fileManager.temporaryDirectory.appendingPathComponent(fileName)
//            if fileManager.fileExists(atPath: copingFile.path()) { try fileManager.removeItem(at: copingFile) }
//            try fileManager.copyItem(at: receivedFile.file, to: copingFile)
//            let asset = AVURLAsset(url: copingFile)
//            return asset
//        }
//    }
//}

extension PageViewController: PHPickerViewControllerDelegate {

    func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
        let first = results.first
//        first?.itemProvider.loadTransferable(type: <#T##Transferable.Protocol#>, completionHandler: <#T##(Result<Transferable, Error>) -> Void#>)
        
        
    }
}

extension PageViewController: UIPageViewControllerDelegate, UIPageViewControllerDataSource {
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        let index = (vcs.firstIndex(of: viewController) ?? 1) - 1
        if index < 0 {
            return nil
        }
        return vcs[index]
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        let index = (vcs.firstIndex(of: viewController) ?? 0) + 1
        if index >= vcs.count {
            return nil
        }
        return vcs[index]
        var config = UIContentUnavailableConfiguration.loading()
        config.image = UIImage(systemName: "star.fill")
        config.text = "No"
        config.secondaryText = "Your favorite translations will appear here."
        
        let locale = Locale (languageCode: .japanese)
    }
}

//#Preview("PageViewController") {
//    var config = UIContentUnavailableConfiguration.search()
////    config.image = UIImage(systemName: "star.fill")
////    config.text = "No"
////    config.secondaryText = "Your favorite translations will appear here."
//    let viewController = PageViewController()
//    // setting contentUnavailableConfiguration
//    viewController.contentUnavailableConfiguration = config
//    return viewController
//}

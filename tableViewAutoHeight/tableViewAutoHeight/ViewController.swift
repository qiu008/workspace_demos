//
//  ViewController.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit
import SnapKit

//#Preview("ViewController") {
//    ViewController()
//}

class ViewController: UIViewController {
    lazy var imageView: UIImageView = {
        let imgV = UIImageView(frame: CGRect(x: 0, y: 0, width: view.bounds.size.width, height: 188))
        imgV.backgroundColor = .red
        imgV.setSymbolImage(UIImage(), contentTransition: .replace.offUp)
        return imgV
    }()
    
    lazy var tableView: UITableView = {
        let table = UITableView(frame: view.bounds, style: .plain)
        table.contentInsetAdjustmentBehavior = .never
        table.backgroundColor = .orange
        table.tableHeaderView = imageView
        table.register(EventProcessSectionHeaderView.self, forHeaderFooterViewReuseIdentifier: "EventProcessSectionHeaderView")
        table.separatorColor = .gray //.dili
        table.separatorInset = UIEdgeInsets(top: 0, left: 20, bottom: 0, right: 20)
        table.register(EventProcessAboutTVCell.self, forCellReuseIdentifier: "EventProcessAboutTVCell")
        table.register(EventProcessQuestionAnswerTVCell.self, forCellReuseIdentifier: "EventProcessQuestionAnswerTVCell")
        table.register(EventProcessSummaryFooterView.self, forHeaderFooterViewReuseIdentifier: "EventProcessSummaryFooterView")
        table.register(EventProcessSectionFooterView.self, forHeaderFooterViewReuseIdentifier: "EventProcessSectionFooterView")
        table.register(EventProcessShowMoreFooterView.self, forHeaderFooterViewReuseIdentifier: "EventProcessShowMoreFooterView")
        table.register(EventProcessRightsFooterView.self, forHeaderFooterViewReuseIdentifier: "EventProcessRightsFooterView")
        table.register(UITableViewCell.self, forCellReuseIdentifier: UITableViewCell.description())
        table.tableFooterView = UIView()
        table.dataSource = self
        table.delegate = self
        if #available(iOS 15.0, *) {
            table.sectionHeaderTopPadding = 0
//            table.fillerRowHeight = 0
        }
        return table
    }()
    
    lazy var testView: UIView = {
        let vi = UIView()
        return vi
    }()
    
    /// 第二个section查看更多
    lazy var showSectionTwoMore = false
    /// 第四个section查看更多
    lazy var showSectionFourMore = false
    
//    let array: [UIColor] = [.red, .orange, .yellow, .green, .cyan, .blue, .purple]
    
//    var vcs = [UIViewController]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(tableView)
        view.addSubview(testView)
        testView.snp.makeConstraints { make in
            make.edges.equalToSuperview()
        }
    }
    
//    override func viewWillAppear(_ animated: Bool) {
//        super.viewWillAppear(animated)
//        print("viewWillAppear", testView.frame, testView.layer.frame)
//    }
    
//    override func viewIsAppearing(_ animated: Bool) {
//        super.viewIsAppearing(animated) // 挺鸡肋的，应该搞一个 viewIsReadyAppear，辣鸡。
//        print("viewIsAppearing", testView.frame, testView.layer.frame)
//    }
    
//    override func viewDidAppear(_ animated: Bool) {
//        super.viewDidAppear(animated)
//        print("viewDidAppear", testView.frame, testView.layer.frame)
//    }
}

extension ViewController: UIPageViewControllerDelegate, UIPageViewControllerDataSource {
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        return nil
//        let index = (vcs.firstIndex(of: viewController) ?? 1) - 1
//        return vcs[index]
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        return nil
//        let index = (vcs.firstIndex(of: viewController) ?? 0) + 1
//        return vcs[index]
    }
}

extension ViewController: UITableViewDelegate, UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return .leastNormalMagnitude
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return nil
        let view = tableView.dequeueReusableHeaderFooterView(withIdentifier: "EventProcessSectionHeaderView") as? EventProcessSectionHeaderView
        switch section {
        case 0:
            view?.label.text = "专题摘要"
        case 1:
            view?.label.text = "事件进程"
        case 2:
            view?.label.text = "USGFX联准国际澳洲破产进程实时更新|权威发布"
        case 3:
            view?.label.text = "维权专区"
        case 4:
            view?.label.text = "问答专区"
        default:
            break
        }
        return view
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch section {
//        case 2:
//            return showSectionTwoMore ? 8 : 4
//        case 4:
//            return showSectionFourMore ? 8 : 4
        default:
            return 3
        }
    }
    
//    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
//        switch indexPath.section {
//        case 2:
//            return 105.5
//        case 4:
//            return UITableView.automaticDimension
//        default:
//            return 0
//        }
//    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.section {
        case 0:
            let cell = tableView.dequeueReusableCell(withIdentifier: "EventProcessAboutTVCell", for: indexPath) as? EventProcessAboutTVCell
            return cell ?? UITableViewCell(style: .default, reuseIdentifier: "UITableViewCell")
        case 1:
            let cell = tableView.dequeueReusableCell(withIdentifier: "EventProcessQuestionAnswerTVCell", for: indexPath) as? EventProcessQuestionAnswerTVCell
            return cell ?? UITableViewCell(style: .default, reuseIdentifier: "UITableViewCell")
        default:
            let cell = tableView.dequeueReusableCell(withIdentifier: UITableViewCell.description(), for: indexPath)
//            let cc = UIListContentConfiguration.cell()
//            cell.contentConfiguration = UIListContentConfiguration.cell()
            return cell
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
//        let nav = UINavigationController(rootViewController: PageViewController(transitionStyle: .scroll, navigationOrientation: .horizontal))
//        present(nav, animated: true)
//        if vcs.isEmpty {
//            array.forEach { (color) in
//                let vc = UIViewController()
//                vc.view.backgroundColor = color
//                vcs.append(vc)
//            }
//        }
        let pvc = PageViewController(transitionStyle: .scroll, navigationOrientation: .horizontal)
//        pvc.setViewControllers(vcs, direction: .forward, animated: true)
//        pvc.delegate = self
//        pvc.dataSource = self
        present(pvc, animated: true)
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return .leastNormalMagnitude
        switch section {
        case 1:
            return 205.5
        case 2:
            return showSectionTwoMore ? 0 : 50
        case 3:
            return 321
        case 4:
            return showSectionFourMore ? 0 : 50
        default:
            return UITableView.automaticDimension
        }
    }
    
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
        switch section {
        case 0:
            let view = tableView.dequeueReusableHeaderFooterView(withIdentifier: "EventProcessSummaryFooterView") as? EventProcessSummaryFooterView
            return view
        case 1:
            let view = tableView.dequeueReusableHeaderFooterView(withIdentifier: "EventProcessSectionFooterView") as? EventProcessSectionFooterView
            return view
        case 2:
            if showSectionTwoMore {
                return nil
            }
            let view = tableView.dequeueReusableHeaderFooterView(withIdentifier: "EventProcessShowMoreFooterView") as? EventProcessShowMoreFooterView
            view?.button.tag = section
            view?.btnClickClosure = { [weak self] (tag, isSelected) in
                if tag == section {
                    self?.showSectionTwoMore = isSelected
                    tableView.reloadData()
                }
            }
            return view
        case 3:
            let view = tableView.dequeueReusableHeaderFooterView(withIdentifier: "EventProcessRightsFooterView") as? EventProcessRightsFooterView
            return view
        case 4:
            if showSectionFourMore {
                return nil
            }
            let view = tableView.dequeueReusableHeaderFooterView(withIdentifier: "EventProcessShowMoreFooterView") as? EventProcessShowMoreFooterView
            view?.button.tag = section
            view?.btnClickClosure = { [weak self] (tag, isSelected) in
                if tag == section {
                    self?.showSectionFourMore = isSelected
                    tableView.reloadData()
                }
            }
            return view
        default:
            return UITableViewHeaderFooterView()
        }
    }
    
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let editAction = UIContextualAction(style: .destructive, title: "编辑", handler: { [weak self] (_, _, _) in
            tableView.setEditing(false, animated: true)
        })
        
        let inviteAdmin = UIContextualAction(style: .normal, title: "邀请管理", handler: { [weak self] (_, _, _) in
            tableView.setEditing(false, animated: true)
        })
        
        let config = UISwipeActionsConfiguration(actions: [editAction, inviteAdmin])
        config.performsFirstActionWithFullSwipe = false
        return config
    }
    
    func tableView(_ tableView: UITableView, willBeginEditingRowAt indexPath: IndexPath) {
        // 只是为了修改 邀请管理 文案的颜色，沙雕苹果怎么不开放修改
        for subview in tableView.subviews where type(of: subview).description().contains("_UITableViewCellSwipeContainerView") {// iOS13之后?
            let sSubviews = subview.subviews
            for sSubview in sSubviews where type(of: sSubview).description().contains("UISwipeActionPullView") {
                let ssSubviews = sSubview.subviews
                if ssSubviews.count > 1, let btn = ssSubviews.first as? UIButton {
                    btn.setTitleColor(.red, for: .normal)
                }
            }
        }
//        for subview in tableView.subviews where type(of: subview).description().contains("UISwipeActionPullView") {// iOS11之后?
//            let sSubviews = subview.subviews
//            if sSubviews.count > 1, let btn = sSubviews.first as? UIButton {
//                btn.setTitleColor(.Common.S1, for: .normal)
//            }
//        }
    }
    
}

//#Preview("ViewController") {
//    ViewController()
//}

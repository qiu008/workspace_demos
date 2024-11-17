//
//  EventProcessShowMoreFooterView.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit

class EventProcessShowMoreFooterView: UITableViewHeaderFooterView {

    var btnClickClosure: ((Int, Bool) -> ())?
    
    lazy var button: UIButton = {
        let btn = UIButton(type: .custom)
        btn.setTitle("查看更多", for: .normal)
        btn.setTitleColor(.cyan, for: .normal) //#themeC2
        btn.titleLabel?.font = .systemFont(ofSize: 12) //PingFangSC-Regular 12
        btn.addTarget(self, action: #selector(onBtnClick(_:)), for: .touchUpInside)
        return btn
    }()
    
    @objc fileprivate func onBtnClick(_ sender: UIButton) {
        sender.isSelected = !sender.isSelected
        btnClickClosure?(sender.tag, sender.isSelected)
    }
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        contentView.backgroundColor = .white
        contentView.addSubview(button)
        button.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */

}

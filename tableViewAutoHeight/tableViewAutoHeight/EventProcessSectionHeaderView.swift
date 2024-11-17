//
//  EventProcessSectionHeaderView.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit
import SnapKit

class EventProcessSectionHeaderView: UITableViewHeaderFooterView {

    lazy var label: UILabel = {
        let lab = UILabel()
        lab.font = .boldSystemFont(ofSize: 20) //PingFangSC-Semibold 20
        lab.textColor = .label //#systemMainC1
        lab.numberOfLines = 0
        return lab
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        tintColor = .white
        
        contentView.addSubview(label)
        label.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(8)
            make.left.equalToSuperview().offset(19.5)
            make.bottom.equalToSuperview().offset(-5.5)
            make.right.equalToSuperview().offset(-20)
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

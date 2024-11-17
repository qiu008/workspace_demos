//
//  EventProcessSummaryFooterView.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit

class EventProcessSummaryFooterView: UITableViewHeaderFooterView {

    lazy var label: UILabel = {
        let lab = UILabel()
        lab.font = .systemFont(ofSize: 16) //PingFangSC-Regular 16
        lab.textColor = .label //#systemMainC1
        lab.numberOfLines = 0
        lab.text = "2020年7月8日，USGFX联准国际澳洲宣布进入自愿管理程序，7月13日，破产托管公司BRI Ferrier介入清偿。"
        return lab
    }()
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        contentView.backgroundColor = .white
        contentView.addSubview(label)
        label.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(8)
            make.left.equalToSuperview().offset(19.5)
            make.bottom.equalToSuperview().offset(-20)
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

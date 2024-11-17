//
//  EventProcessRightsFooterView.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit

class EventProcessRightsFooterView: UITableViewHeaderFooterView {

    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        contentView.backgroundColor = .white
//        contentView.addSubview(button)
//        button.snp.makeConstraints { (make) in
//            make.edges.equalToSuperview()
//        }
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

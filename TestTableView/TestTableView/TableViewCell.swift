//
//  TableViewCell.swift
//  TestTableView
//
//  Created by STL_QYH on 2021/11/25.
//

import UIKit

class TableViewCell: UITableViewCell {

    init(style: UITableViewCell.CellStyle, reuseIdentifier: String, isVideo: Bool) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        print("isVideo")
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}

//
//  DynamicTableViewCell.swift
//  CollectionViewTest
//
//  Created by STL_QYH on 2021/2/20.
//

import UIKit

class DynamicTableViewCell: UITableViewCell {

    
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        
        switch reuseIdentifier?.last {
        case "3":
            break
        case "4":
            break
        case "5":
            break
        default:
            break
        }
        
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

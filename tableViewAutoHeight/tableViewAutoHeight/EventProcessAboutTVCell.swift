//
//  EventProcessAboutTVCell.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit

class EventProcessAboutTVCell: UITableViewCell {

    lazy var imgView: UIImageView = {
        let imgV = UIImageView()
        return imgV
    }()
    
    lazy var labelTitle: UILabel = {
        let label = UILabel()
        label.font = .boldSystemFont(ofSize: 16) //.bold(of: 16)
        label.textColor = .label//.mainC1
        label.numberOfLines = 2
        label.text = "你关注的黄金隔夜利息来袭，点击查看哪家最实惠"
        return label
    }()
    
    lazy var labelTime: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 12)//.f1
        label.textColor = .label//.mainC3
        label.text = "1小时前"
        return label
    }()
    
    lazy var labelViews: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 12)//.f1
        label.textColor = .label//.mainC3
        label.text = "1,287 浏览"
        return label
    }()
    
//    lazy var line: UIView = {
//        let view = UIView()
//        view.backgroundColor = .grayDivider
//        return view
//    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        selectionStyle = .none
        
        contentView.addSubview(imgView)
        contentView.addSubview(labelTitle)
        contentView.addSubview(labelTime)
        contentView.addSubview(labelViews)
//        contentView.addSubview(line)
        
        imgView.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(12)
            make.left.equalToSuperview().offset(20)
            make.bottom.equalToSuperview().inset(11.5)
            make.width.equalTo(123)
            make.height.equalTo(80)
        }
        labelTitle.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(12)
            make.left.equalTo(imgView.snp.right).offset(12)
            make.right.equalToSuperview().inset(20)
        }
        labelTime.snp.makeConstraints { (make) in
            make.top.equalTo(labelTitle.snp.bottom).offset(14)
            make.left.equalTo(labelTitle)
        }
        labelViews.snp.makeConstraints { (make) in
            make.top.equalTo(labelTitle.snp.bottom).offset(14)
            make.right.equalTo(labelTitle)
        }
//        line.snp.makeConstraints { (make) in
//            make.left.equalToSuperview().offset(20)
//            make.bottom.equalToSuperview()
//            make.right.equalToSuperview().offset(-20)
//            make.height.equalTo(0.5)
//        }
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

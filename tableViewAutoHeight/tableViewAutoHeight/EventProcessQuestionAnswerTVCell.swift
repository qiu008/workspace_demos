//
//  EventProcessQuestionAnswerTVCell.swift
//  tableViewAutoHeight
//
//  Created by STL_QYH on 2020/12/31.
//

import UIKit

class EventProcessQuestionAnswerTVCell: UITableViewCell {

    lazy var labelTitle: UILabel = {
        let label = UILabel()
        label.font = .boldSystemFont(ofSize: 16) //.bold(of: 16)
        label.textColor = .label//.mainC1
        label.numberOfLines = 0
        label.text = "1、我的资金安全吗？"
        return label
    }()
    
    lazy var labelContent: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14)//.f1
        label.textColor = .label//.mainC1
        label.numberOfLines = 0
        label.text = """
        如果您有此项索赔需求，我们需要您提供相关的文件细节，包括:
        1）与USG进行交易的协议副本；
        2）交易产品披露声明;
        3）与您索赔或债务相关的往来函件副本;
        4）银行汇款证据;
        5）其他相关文件。
        请将以上信息发送至usg@brifnsw.com.au。
        """
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
        
        contentView.addSubview(labelTitle)
        contentView.addSubview(labelContent)
//        contentView.addSubview(line)
        
        labelTitle.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(12)
            make.left.equalToSuperview().offset(20)
            make.right.equalToSuperview().offset(-20)
        }
        labelContent.snp.makeConstraints { (make) in
            make.top.equalTo(labelTitle.snp.bottom).offset(8)
            make.left.right.equalTo(labelTitle)
            make.bottom.equalToSuperview().offset(-12)
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

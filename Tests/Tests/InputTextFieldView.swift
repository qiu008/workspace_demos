//
//  InputTextFieldView.swift
//  Module_Account
//
//  Created by muhlenXi on 2019/7/5.
//  Copyright © 2019 muhlenXi. All rights reserved.
//

import UIKit

class InputTextField: UITextField {
    /// 是否可以选中编辑
    var canSelectEdit: Bool? = nil
    
    override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
        if let can = canSelectEdit {
            return can
        } else {
            return super.canPerformAction(action, withSender: sender)
        }
    }
}


// MARK: - InputTextWarningView

class InputTextWarningView: UIView {
    var title: String? = "" {
        didSet {
            titleLabel.text = title
        }
    }
    
    private lazy var bgView: UIImageView = {
        let imageView = UIImageView()
//        imageView.image = R.image.input_warning_bg()
        return imageView
    }()
    
    private lazy var titleLabel: UILabel = {
        let label = UILabel()
//        label.font = UIFont.AdaptiveRegularFont(size: 16)
        label.text = ""
        label.textColor = UIColor.white
        label.textAlignment = .left
        label.numberOfLines = 2
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setupSubviews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.setupSubviews()
    }
    
    // MARK: Private method
    func setupSubviews() {
        self.addSubview(bgView)
        self.addSubview(titleLabel)
//        bgView.snp.makeConstraints { (maker) in
//            maker.edges.equalToSuperview()
//        }
//        titleLabel.snp.makeConstraints { (maker) in
//            maker.leading.equalTo(12).priority(999)
//            maker.trailing.equalTo(-12)
//            maker.centerY.equalToSuperview().offset(5)
//        }
    }
}


// MARK: - InputTextFieldView

class InputTextFieldView: UIView {
    
    static let kWarningViewHeight: CGFloat = 70.0
    
    /// 最大允许输入字符个数
    var maxInputCount: Int = 50
    var maxInputWarningTitle: String? = nil
    private var isHiddenAreaCodeBtn: Bool = false
    /// 是否能输入表情
    var isCanInputEmoji: Bool = false
    /// 禁止输入的字符集合
    var forbiddenInputCharactersList: [String]?
    
    var isHiddenLine: Bool = false{
        didSet {
            underLine.isHidden = isHiddenLine
        }
    }
    
    var leftButtonIsHidden: Bool = false {
        didSet {
            leftButton?.isHidden = leftButtonIsHidden
        }
    }
    var leftButtonIsEnable: Bool = false {
        didSet {
            leftButton?.isEnabled = leftButtonIsEnable
            let alpha: CGFloat = leftButtonIsEnable ? 1.0 : 0.6
//            leftButton?.backgroundColor = UIColor.globalBlue.withAlphaComponent(alpha)
        }
    }
    var leftButtonTitle: String = "" {
        didSet {
            leftButton?.setTitle(leftButtonTitle, for: .normal)
        }
    }
    var leftButtonTitleColor: UIColor = UIColor.white {
        didSet {
            leftButton?.setTitleColor(leftButtonTitleColor, for: .normal)
        }
    }
    var leftButtonWidth: CGFloat = 78 {
        didSet {
            leftButton?.frame = CGRect(x: 32, y: 8, width: leftButtonWidth, height: 32)
        }
    }
    
    var rightButtonIsEnable: Bool = false {
        didSet {
            rightButton?.isEnabled = rightButtonIsEnable
            let alpha: CGFloat = rightButtonIsEnable ? 1.0 : 0.6
//            rightButton?.backgroundColor = UIColor.globalBlue.withAlphaComponent(alpha)
        }
    }
    var rightButtonTitle: String = "FA.commom.next.rawValue.localized()" {
        didSet {
            rightButton?.setTitle(rightButtonTitle, for: .normal)
        }
    }
    var rightButtonWidth: CGFloat = 78 {
        didSet {
            rightButton?.frame = CGRect(x: UIScreen.main.bounds.size.width-32-rightButtonWidth, y: 8, width: rightButtonWidth, height: 32)
        }
    }
    
    var areaCode: String? {
        didSet {
            if let code = areaCode {
//                let title = code.replaceRegionCode()
//                let width = String.caculateWidth(content: title, maxHeight: 64, font: UIFont.AdaptiveRegularFont(size: 16)!)
//                areaCodeBtn.snp.updateConstraints { (make) in
//                    make.width.equalTo(width + buttonImageWidth)
//                }
                
//                areaCodeBtn.setTitle(title, for: .normal)
//                self.layoutIfNeeded()
            }
        }
    }
    
    private var buttonImageWidth: CGFloat = 16
    
    lazy var inputTF: InputTextField = {
        let tf = InputTextField()
//        tf.font = UIFont.AdaptiveRegularFont(size: 20)
//        tf.textColor = UIColor(hex: 0x333333, alpha: 1)
        tf.delegate = self
        tf.clearButtonMode = .whileEditing
        return tf
    }()
    
    private lazy var underLine: UIView = {
        let view = UIView()
//        view.backgroundColor = UIColor(hex: 0xdddddd)
        return view
    }()
    
    /// 区号选择
//    lazy var areaCodeBtn: FAPhotoTitleButton = {
//        let button = FAPhotoTitleButton()
//        button.setTitle("+86".localized(), for: .normal)
//        button.setImage(R.image.areaCode_selected(), for: .normal)
//        button.setTitleColor(UIColor.blackTextColor, for: .normal)
//        button.titleLabel?.font = UIFont.AdaptiveRegularFont(size: 16)
//        button.addTarget(self, action: #selector(onClickEreaCodeButton(_:)), for: .touchUpInside)
//        return button
//    }()
    
    var isShowingWarningView: Bool = false
    
    private lazy var warningView: InputTextWarningView = {
        let view = InputTextWarningView()
        return view
    }()
    
    var rightButton: UIButton?
    var rightButtonHanler: (() -> Void)?
    var leftButton: UIButton?
    var leftButtonHanler: (() -> Void)?
    var textChangedHandler: (() -> Void)?
    var warningViewChangedHandler: ((Bool) -> Void)?
    var onClickAreaCodeBtn: (() -> ())?
    var willBeginEditedHandler: (() -> ())?
    
    
    var text: String {
        return (inputTF.text ?? "").trimmingCharacters(in: .whitespaces)
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
//        self.setupSubviews()
    }
    
    convenience init(isHiddenAreaCodeBtn: Bool = false) {
        self.init()
        self.isHiddenAreaCodeBtn = isHiddenAreaCodeBtn
        self.setupSubviews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.setupSubviews()
    }
    
    // MARK: Private method
    func setupSubviews() {
        self.addSubview(inputTF)
        self.addSubview(warningView)
        self.addSubview(underLine)
        if !isHiddenAreaCodeBtn {
//            self.addSubview(areaCodeBtn)
//            let width = String.caculateWidth(content: areaCodeBtn.titleLabel?.text ?? "", maxHeight: 64, font: UIFont.AdaptiveRegularFont(size: 16)!)
//            areaCodeBtn.setContentHuggingPriority(.defaultHigh, for: .horizontal)
//            areaCodeBtn.snp.makeConstraints { (maker) in
//                maker.top.equalToSuperview()
//                maker.left.equalToSuperview()
//                maker.height.equalTo(64)
//                maker.width.equalTo(width + buttonImageWidth)
//            }
        }
        
//        inputTF.snp.makeConstraints { (maker) in
//            if isHiddenAreaCodeBtn {
//                maker.left.equalToSuperview()
//            } else {
//                maker.left.equalTo(areaCodeBtn.snp.right).offset(10)
//            }
//            maker.trailing.equalTo(0)
//            maker.top.equalToSuperview()
//            maker.height.equalTo(64)
//        }
//
//        underLine.snp.makeConstraints { (maker) in
//            maker.leading.bottom.trailing.equalToSuperview()
//            maker.height.equalTo(0.5)
//        }
//        warningView.snp.makeConstraints { (maker) in
//            maker.top.equalTo(inputTF.snp.bottom).offset(0)
//            maker.leading.trailing.equalToSuperview()
//            maker.height.equalTo(0)
//        }
        
        self.addTextChangedObserver()
    }
    
    func setupShowWarningView(isShow: Bool, title: String?) {
        warningView.title = title
        guard isShow != self.isShowingWarningView else {
            return
        }
        self.isShowingWarningView = isShow
        self.warningViewChangedHandler?(self.isShowingWarningView)
        let height: CGFloat = isShow ? InputTextFieldView.kWarningViewHeight : 0
//        warningView.snp.updateConstraints { (maker) in
//            maker.height.equalTo(height)
//        }
        self.needsUpdateConstraints()
        UIView.animate(withDuration: 0.24) {
            self.layoutIfNeeded()
        }
    }
    
    func addTextChangedObserver() {
        inputTF.addTarget(self, action: #selector(self.inputTextFieldValueChanged(_:)), for: .editingChanged)
    }
    
    func setupTextFieldNextToolBar() {
        let toolbar = UIToolbar(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.size.width, height: 48))
        toolbar.barStyle = .default
        toolbar.barTintColor = UIColor.white
        let spaceItem = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
        let leftButton = UIButton(frame: CGRect(x: 32, y: 8, width: 78, height: 32))
        leftButton.setTitle("", for: .normal)
//        leftButton.backgroundColor = UIColor.globalBlue.withAlphaComponent(0.6)
        leftButton.layer.cornerRadius = 4
        leftButton.clipsToBounds = true
//        leftButton.titleLabel?.font = UIFont.AdaptiveBoldFont(size: 14)
        leftButton.setTitleColor(UIColor.white.withAlphaComponent(0.6), for: .disabled)
        leftButton.setTitleColor(UIColor.white, for: .normal)
        leftButton.isEnabled = false
        leftButton.addTarget(self, action: #selector(self.onClickLeftButton(_:)), for: .touchUpInside)
        leftButton.isHidden = true
        self.leftButton = leftButton
        let rightButton = UIButton(frame: CGRect(x: UIScreen.main.bounds.size.width-110, y: 8, width: 78, height: 32))
//        rightButton.setTitle(FA.commom.next.rawValue.localized(), for: .normal)
//        rightButton.backgroundColor = UIColor.globalBlue.withAlphaComponent(0.6)
        rightButton.layer.cornerRadius = 4
        rightButton.clipsToBounds = true
//        rightButton.titleLabel?.font = UIFont.AdaptiveBoldFont(size: 14)
        rightButton.setTitleColor(UIColor.white.withAlphaComponent(0.6), for: .disabled)
        rightButton.setTitleColor(UIColor.white, for: .normal)
        rightButton.isEnabled = false
        rightButton.addTarget(self, action: #selector(self.onClickNextButton(_:)), for: .touchUpInside)
        self.rightButton = rightButton
        let leftItem = UIBarButtonItem(customView: leftButton)
        let nextItem = UIBarButtonItem(customView: rightButton)
        toolbar.items = [leftItem, spaceItem, nextItem]
        
        inputTF.inputAccessoryView = toolbar
        inputTF.autocorrectionType = .no
    }
    
    @objc func onClickNextButton(_ sender: UIButton) {
        self.rightButtonHanler?()
    }
    
    @objc func onClickLeftButton(_ sender: UIButton) {
        self.leftButtonHanler?()
    }
    
    
    @objc func onClickEreaCodeButton(_ sender: UIButton) {
        if let block = onClickAreaCodeBtn {
            block()
        }
    }
    
    @objc func inputTextFieldValueChanged(_ textField: UITextField) {
        if self.isShowingWarningView {
            setupShowWarningView(isShow: false, title: nil)
        }
        self.textChangedHandler?()
    }
    
    private func replaceRegionCode(regionCode: String) -> String {
        var result = regionCode
        
        if result.hasPrefix("00") {
            let startIndex = result.index(result.startIndex, offsetBy: 0)
            let endIndex = result.index(result.startIndex, offsetBy: 1)
            let range = startIndex...endIndex
            result.replaceSubrange(range, with: "+")
        }
        
        return result
    }
    
}

extension InputTextFieldView: UITextFieldDelegate {
    
    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        if let handle = willBeginEditedHandler {
            handle()
        }
        return true
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        if self.isShowingWarningView {
            setupShowWarningView(isShow: false, title: nil)
        }
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let text = textField.text ?? ""
        if text.count == 0 && string == " " {
            return false
        }
        
        /// 判断是否是九宫格是否是九宫格输入法
//        if string.isNineKeyBoard() {
//            return true
//        }
        
        let total = (text as NSString).replacingCharacters(in: range, with: string)
        // 判断是否包含表情、是否可以输入表情
//        if string.isEmoji() && !isCanInputEmoji {
//            return false
//        }
        
        if total.count > maxInputCount {
            return false
        } else {
            if let title = maxInputWarningTitle, self.isShowingWarningView == true {
                setupShowWarningView(isShow: false, title: title)
            }
            if let forbiddenInputCharactersList = self.forbiddenInputCharactersList,
                forbiddenInputCharactersList.count > 0, forbiddenInputCharactersList.contains(string) {
                return false
            }
            
            return true
        }
    }
}

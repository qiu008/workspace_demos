//
//  HuanView.h
//  OC
//
//  Created by STL_QYH on 2023/7/27.
//  Copyright © 2023 STL_. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HuanView : UIView
/**
 *进度条的角的类型
 */
@property (nonatomic,copy) CAShapeLayerLineCap lineCap;

/**
 *进度条显示的文字
 */
@property (nonatomic,copy) NSString *progressLabelText;

/**
 *进度条显示的文字的颜色
 */
@property (nonatomic,copy) UIColor *progressLabelTextColor;

/**
 *进度条宽度
 */
@property (nonatomic,assign) CGFloat progressLineWidth;
/**
 * 背景线条宽度
 */
@property (nonatomic,assign) CGFloat backgroundLineWidth;
/**
 * 进度百分比
 */
@property (nonatomic,assign) CGFloat percentage;
/**
 * 背景填充颜色
 */
@property (nonatomic,strong) UIColor *backgroundStrokeColor;
/**
 * 进度条填充颜色
 */
@property (nonatomic,strong) UIColor *progressStrokeColor;
/**
 * 距离边框边距偏移量
 */
@property (nonatomic,assign) CGFloat offset;

- (void)setProgress:(CGFloat)percentage animated:(BOOL)animated;
@end

NS_ASSUME_NONNULL_END

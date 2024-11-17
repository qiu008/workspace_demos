//
//  HuanView.m
//  OC
//
//  Created by STL_QYH on 2023/7/27.
//  Copyright © 2023 STL_. All rights reserved.
//

#import "HuanView.h"

#define kDuration 1.0
#define kDefaultLineWidth 10

@interface HuanView()

@property (nonatomic,strong) CAShapeLayer *backgroundLayer;
@property (nonatomic,strong) CAShapeLayer *progressLayer;
@property (nonatomic,strong) UILabel *progressLabel;
@property (nonatomic,strong) NSTimer *timer;
@property (nonatomic,assign) CGFloat startAngle; // M_PI*2
@property (nonatomic,assign) CGFloat endAngle;

@end


@implementation HuanView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self setBackgroundColor:[UIColor clearColor]];
        [self createSubViews];
        //init default variable
        self.backgroundLineWidth = kDefaultLineWidth;
        self.progressLineWidth = kDefaultLineWidth;
        self.percentage = 0;
        self.offset = 0;
//        self.startAngle = -M_PI_2;
//        self.endAngle = 0;
        self.startAngle = -M_PI_2;
        self.endAngle = -M_PI_2-2*M_PI;
    }
    return self;
}

- (void)createSubViews {
    //self.progressLabel.text = @"0%";
    self.progressLabel.textAlignment = NSTextAlignmentCenter;
    //  self.progressLabel.font = FONTBOLD(12);
    [self addSubview:self.progressLabel];
    
    _backgroundLayer = [CAShapeLayer layer];
    _backgroundLayer.frame = self.bounds;
    _backgroundLayer.fillColor = nil;
    _backgroundLayer.strokeColor = [UIColor lightGrayColor].CGColor;
    
    _progressLayer = [CAShapeLayer layer];
    _progressLayer.frame = self.bounds;
    _progressLayer.fillColor = nil;
    _progressLayer.strokeColor = [UIColor redColor].CGColor;
    
    [self.layer addSublayer:_backgroundLayer];
    [self.layer addSublayer:_progressLayer];
}

-(void)setProgressLabelText:(NSString *)progressLabelText{
    _progressLabelText = progressLabelText;
    self.progressLabel.text = progressLabelText;
}

-(void)setProgressLabelTextColor:(UIColor *)progressLabelTextColor{
    _progressLabelTextColor = progressLabelTextColor;
    self.progressLabel.textColor = progressLabelTextColor;
}


#pragma mark - Draw CircleLine
- (void)setBackgroundCircleLine {
    UIBezierPath *path = [UIBezierPath bezierPath];
    path = [UIBezierPath bezierPathWithArcCenter:CGPointMake(self.center.x - self.frame.origin.x, self.center.y - self.frame.origin.y)
                                          radius:(self.frame.size.width - _backgroundLineWidth)/2 - _offset
                                      startAngle:self.startAngle
                                        endAngle:self.endAngle
                                       clockwise:NO];
    _backgroundLayer.path = path.CGPath;
}

- (void)setProgressCircleLine {
    UIBezierPath *path = [UIBezierPath bezierPath];
    path = [UIBezierPath bezierPathWithArcCenter:CGPointMake(self.center.x - self.frame.origin.x, self.center.y - self.frame.origin.y)
                                          radius:(self.frame.size.width - _progressLineWidth)/2 - _offset
                                      startAngle:self.startAngle
                                        endAngle:self.endAngle
                                       clockwise:NO];
    _progressLayer.path = path.CGPath;
}

#pragma mark - Lazy Load
- (UILabel *)progressLabel {
    if (!_progressLabel) {
        _progressLabel = [[UILabel alloc]initWithFrame:CGRectMake((self.bounds.size.width -100)/2, (self.bounds.size.height - 100)/2, 100, 100)];
    }
    return _progressLabel;
}

- (void)setBackgroundLineWidth:(CGFloat)backgroundLineWidth {
    _backgroundLineWidth = backgroundLineWidth;
    _backgroundLayer.lineWidth = _backgroundLineWidth;
    [self setBackgroundCircleLine];
}

-(void)setLineCap:(CAShapeLayerLineCap)lineCap{
    _progressLayer.lineCap = lineCap;
    [self setProgressCircleLine];
}

- (void)setProgressLineWidth:(CGFloat)progressLineWidth
{
    _progressLineWidth = progressLineWidth;
    _progressLayer.lineWidth = _progressLineWidth;
    [self setProgressCircleLine];
}

- (void)setPercentage:(CGFloat)percentage {
    _percentage = percentage;
}

- (void)setBackgroundStrokeColor:(UIColor *)backgroundStrokeColor {
    _backgroundStrokeColor = backgroundStrokeColor;
    _backgroundLayer.strokeColor = _backgroundStrokeColor.CGColor;
}

- (void)setProgressStrokeColor:(UIColor *)progressStrokeColor {
    _progressStrokeColor = progressStrokeColor;
    _progressLayer.strokeColor = _progressStrokeColor.CGColor;
}

#pragma mark - progress animated YES or NO
- (void)setProgress:(CGFloat)percentage animated:(BOOL)animated {
    self.percentage = percentage;
    _progressLayer.strokeEnd = _percentage;
    if (animated) {
        CABasicAnimation *animation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
        animation.fromValue = [NSNumber numberWithFloat:0.0];
        animation.toValue = [NSNumber numberWithFloat:_percentage];
        animation.duration = kDuration;
        [_progressLayer addAnimation:animation forKey:@"strokeEndAnimation"];
    }else{
        [CATransaction begin];
        [CATransaction setDisableActions:YES];
        _progressLabel.text = [NSString stringWithFormat:@"%.0f%%",_percentage*100];
        [CATransaction commit];
    }
}

@end

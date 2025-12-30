import React from 'react';

interface AnimatedAntProps {
  /** 图片资源路径 */
  imageSrc: string;
  /** SVG 宽度 */
  width: number;
  /** SVG 高度 */
  height: number;
  /** 动画持续时间（秒） */
  duration?: number;
  /** X 轴动画值 */
  xValues: string;
  /** Y 轴动画值 */
  yValues: string;
  /** 动画关键时间点 */
  keyTimes: string;
  /** 动画缓动函数 */
  keySplines: string;
  /** 类名 */
  className?: string;
}

/**
 * 动画蚂蚁组件
 */
const AnimatedAnt: React.FC<AnimatedAntProps> = ({
  imageSrc,
  width,
  height,
  duration = 8,
  xValues,
  yValues,
  keyTimes,
  keySplines,
  className = '',
}) => {
  return (
    <div className={`login_bg_ant ${className}`}>
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <image width={width} height={height} href={imageSrc}>
          <animate
            attributeName="x"
            dur={`${duration}s`}
            values={xValues}
            keyTimes={keyTimes}
            calcMode="spline"
            keySplines={keySplines}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            dur={`${duration}s`}
            values={yValues}
            keyTimes={keyTimes}
            calcMode="spline"
            keySplines={keySplines}
            repeatCount="indefinite"
          />
        </image>
      </svg>
    </div>
  );
};

export default AnimatedAnt;


import React from 'react'
import styles from '../index.module.css'

interface AnimatedAntProps {
  /** 图片资源路径 */
  imageSrc: string
  /** SVG 宽度 */
  width: number
  /** SVG 高度 */
  height: number
  /** 动画持续时间（秒�?*/
  duration?: number
  /** X 轴动画�?*/
  xValues: string
  /** Y 轴动画�?*/
  yValues: string
  /** 动画关键时间�?*/
  keyTimes: string
  /** 动画缓动函数 */
  keySplines: string
  /** 额外类名（ant1 | ant2�?*/
  variant: 'ant1' | 'ant2'
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
  variant,
}) => {
  const variantClass = variant === 'ant1' ? styles.loginBgAnt1 : styles.loginBgAnt2

  return (
    <div className={`${styles.loginBgAnt} ${variantClass}`}>
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
  )
}

export default AnimatedAnt

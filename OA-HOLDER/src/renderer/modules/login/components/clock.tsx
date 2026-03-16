import React, { useState, useEffect } from 'react'
import styles from '../index.module.css'

interface ClockAngles {
  hourAngle: number
  minAngle: number
}

/**
 * 根据当前时间计算时钟指针角度
 */
function getTimeRotate(): ClockAngles {
  const now = new Date()
  const hours = now.getHours() % 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const minAngle = minutes * 6 + seconds * 0.1
  const hourAngle = hours * 30 + minutes * 0.5

  return { hourAngle, minAngle }
}

/**
 * 时钟组件
 */
const Clock: React.FC = () => {
  const [angles, setAngles] = useState<ClockAngles>(getTimeRotate())

  useEffect(() => {
    const timer = setInterval(() => {
      setAngles(getTimeRotate())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.watchBox}>
      <span
        className={styles.hourHand}
        style={{ transform: `rotate(${angles.hourAngle}deg)` }}
      />
      <span
        className={styles.minuteHand}
        style={{ transform: `rotate(${angles.minAngle}deg)` }}
      />
      <span className={styles.circleDot} />
    </div>
  )
}

export default Clock

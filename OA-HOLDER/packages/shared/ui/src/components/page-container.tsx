import React from 'react'
import { Spin } from 'antd'
import styles from './page-container.module.css'

interface IPageContainerProps {
  title?: string
  subtitle?: string
  extra?: React.ReactNode
  loading?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const PageContainer: React.FC<IPageContainerProps> = ({
  title,
  subtitle,
  extra,
  loading = false,
  children,
  className,
  style,
}) => {
  return (
    <div className={`${styles.container}${className ? ` ${className}` : ''}`} style={style}>
      {(title || subtitle || extra) && (
        <div className={styles.header}>
          <div>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <Spin spinning={loading}>{children}</Spin>
    </div>
  )
}

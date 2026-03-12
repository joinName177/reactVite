import React from 'react'
import { Spin } from 'antd'

interface PageContainerProps {
  title?: string
  subtitle?: string
  extra?: React.ReactNode
  loading?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  extra,
  loading = false,
  children,
  className,
  style,
}) => {
  return (
    <div className={className} style={{ padding: 24, ...style }}>
      {(title || subtitle || extra) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <div>
            {title && (
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{title}</h2>
            )}
            {subtitle && (
              <p style={{ margin: '4px 0 0', color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>
                {subtitle}
              </p>
            )}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <Spin spinning={loading}>{children}</Spin>
    </div>
  )
}

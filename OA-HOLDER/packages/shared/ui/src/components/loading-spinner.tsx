import React from 'react'
import { Spin } from 'antd'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large'
  tip?: string
  fullscreen?: boolean
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'default',
  tip,
  fullscreen = false,
}) => {
  const sizeMap = { small: 16, default: 24, large: 32 }
  const iconSize = sizeMap[size]

  const spinner = (
    <Spin
      indicator={
        <Loader2
          size={iconSize}
          style={{ animation: 'spin 1s linear infinite' }}
        />
      }
      tip={tip}
    />
  )

  if (fullscreen) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        {spinner}
      </div>
    )
  }

  return spinner
}

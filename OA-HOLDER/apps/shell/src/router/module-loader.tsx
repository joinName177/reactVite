import React, { useState } from 'react'
import { LoadingSpinner } from '@holder/ui'
import { resolveModuleUrl } from '../config/modules'

interface IModuleLoaderProps {
  /** 模块 ID，对应 MODULE_REGISTRY 中的 key */
  moduleId: string
}

/**
 * 独立子模块加载容器，通过 iframe 实现模块隔离。
 * - 开发环境：指向该模块的 Vite dev server（如 localhost:5174）
 * - 生产环境：指向 dist/modules/<id>/index.html
 */
export const ModuleLoader: React.FC<IModuleLoaderProps> = ({ moduleId }) => {
  const [loaded, setLoaded] = useState(false)
  const src = resolveModuleUrl(moduleId)

  if (!src) {
    return (
      <div style={{ padding: 24, color: '#999' }}>
        模块 <code>{moduleId}</code> 未在注册表中找到，请检查 <code>src/config/modules.ts</code>。
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {!loaded && (
        <div style={loadingOverlayStyle}>
          <LoadingSpinner tip="模块加载中..." />
        </div>
      )}
      <iframe
        src={src}
        title={moduleId}
        style={{ ...iframeStyle, opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

/** 撑满 Content 区域（抵消外层 24px padding） */
const containerStyle: React.CSSProperties = {
  position: 'relative',
  margin: -24,
  height: 'calc(100vh - 64px)',
}

const iframeStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
  display: 'block',
  transition: 'opacity 0.2s',
}

const loadingOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f5f6fa',
  zIndex: 1,
}

import React, { Suspense } from 'react'
import { LoadingSpinner } from '@holder/ui'

interface ModuleLoaderProps {
  moduleId: string
  fallback?: React.ReactNode
}

export const ModuleLoader: React.FC<ModuleLoaderProps> = ({
  moduleId,
  fallback,
}) => {
  return (
    <Suspense fallback={fallback || <LoadingSpinner fullscreen tip="加载中..." />}>
      <div data-module-id={moduleId}>
        {/* Module content will be loaded here via dynamic import or iframe */}
        <p>Module: {moduleId} (pending implementation)</p>
      </div>
    </Suspense>
  )
}

import React, { Suspense } from 'react'
import { LoadingSpinner } from '@holder/ui'
import { useI18n } from '@holder/i18n'
import { routerLocale } from './locale'

interface IModuleLoaderProps {
  moduleId: string
  fallback?: React.ReactNode
}

export const ModuleLoader: React.FC<IModuleLoaderProps> = ({
  moduleId,
  fallback,
}) => {
  const { chooseLanguage } = useI18n()
  const loadingTip = chooseLanguage({ tmpl: routerLocale.loading })

  return (
    <Suspense fallback={fallback || <LoadingSpinner fullscreen tip={loadingTip} />}>
      <div data-module-id={moduleId}>
        {/* Module content will be loaded here via dynamic import or iframe */}
        <p>Module: {moduleId} (pending implementation)</p>
      </div>
    </Suspense>
  )
}

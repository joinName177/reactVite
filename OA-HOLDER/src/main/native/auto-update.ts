import { autoUpdater } from 'electron'
import { getAppConfig } from '../core/config'

export function initAutoUpdate(): void {
  const config = getAppConfig()

  if (config.isDev) {
    console.log('[AutoUpdate] Skipping in development mode')
    return
  }

  // TODO: Configure auto update server URL
  // autoUpdater.setFeedURL({ url: 'https://update.example.com' })

  autoUpdater.on('update-available', () => {
    console.log('[AutoUpdate] Update available')
  })

  autoUpdater.on('update-downloaded', () => {
    console.log('[AutoUpdate] Update downloaded, will install on quit')
  })

  autoUpdater.on('error', (error) => {
    console.error('[AutoUpdate] Error:', error)
  })
}

import { Tray, Menu, nativeImage, app } from 'electron'
import * as path from 'path'
import { windowManager } from '../windows/window-manager'

let tray: Tray | null = null
let blinkInterval: ReturnType<typeof setInterval> | null = null
let isBlinking = false
let messages: unknown[] = []

function getIconPath(): string {
  const basePath = path.join(__dirname, '../../../build')
  return process.platform === 'win32'
    ? path.join(basePath, 'icon.ico')
    : path.join(basePath, 'icon.png')
}

export function createTray(): void {
  if (tray) return

  const iconPath = getIconPath()
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon.resize({ width: 16, height: 16 }))

  tray.setToolTip('Holder 工作台')
  updateTrayMenu()

  tray.on('click', () => {
    const mainWindow = windowManager.getWindow('main')
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isVisible()) {
        mainWindow.focus()
      } else {
        mainWindow.show()
        mainWindow.focus()
      }
    }
  })
}

export function destroyTray(): void {
  stopBlinking()
  if (tray) {
    tray.destroy()
    tray = null
  }
}

export function updateTrayMessages(newMessages: unknown[]): void {
  messages = newMessages
  updateTrayMenu()
}

export function setTrayBlinking(blinking: boolean): void {
  if (blinking === isBlinking) return
  isBlinking = blinking

  if (blinking) {
    startBlinking()
  } else {
    stopBlinking()
  }
}

function updateTrayMenu(): void {
  if (!tray) return

  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: '显示主窗口',
      click: () => {
        const mainWindow = windowManager.getWindow('main')
        mainWindow?.show()
        mainWindow?.focus()
      },
    },
    { type: 'separator' },
    {
      label: `消息 (${messages.length})`,
      enabled: false,
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        windowManager.setQuitting(true)
        app.quit()
      },
    },
  ]

  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
}

function startBlinking(): void {
  if (blinkInterval || !tray) return

  const iconPath = getIconPath()
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
  const emptyIcon = nativeImage.createEmpty()
  let showIcon = true

  blinkInterval = setInterval(() => {
    if (tray) {
      tray.setImage(showIcon ? icon : emptyIcon)
      showIcon = !showIcon
    }
  }, 500)
}

function stopBlinking(): void {
  if (blinkInterval) {
    clearInterval(blinkInterval)
    blinkInterval = null
  }

  if (tray) {
    const iconPath = getIconPath()
    const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
    tray.setImage(icon)
  }
}

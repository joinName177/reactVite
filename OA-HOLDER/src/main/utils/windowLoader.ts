import { BrowserWindow, app } from 'electron'
import * as path from 'path'

// 环境判断
const isDev = process.env.NODE_ENV === 'development'

/**
 * 获取应用路径（开发环境和生产环境）
 */
function getAppPath(): string {
  if (isDev) {
    // 开发环境：返回项目根目录
    return path.resolve(__dirname, '../..')
  } else {
    // 生产环境：使用 app.getAppPath() 获取打包后的应用路径
    // 打包后路径：resources/app.asar 或 resources/app
    return app.getAppPath()
  }
}

/**
 * 加载窗口 URL 的通用函数
 * @param window 窗口实例
 * @param route 路由路径
 * @param openDevTools 是否打开开发者工具
 */
export function loadWindowURL(
  window: BrowserWindow,
  route: string = '',
  openDevTools: boolean = false
): void {
  if (isDev) {
    const url = `http://localhost:5173${route ? `#${route}` : ''}`
    window.loadURL(url).catch(err => {
      console.error('Failed to load URL:', err)
      setTimeout(() => loadWindowURL(window, route, openDevTools), 1000)
    })
    if (openDevTools) {
      window.webContents.openDevTools()
    }
  } else {
    // 生产环境：使用正确的应用路径
    const appPath = getAppPath()
    const filePath = path.join(appPath, 'dist', 'renderer', 'index.html')

    console.log(`[WindowLoader] 加载文件路径: ${filePath}`)
    console.log(`[WindowLoader] app.getAppPath(): ${app.getAppPath()}`)
    console.log(`[WindowLoader] __dirname: ${__dirname}`)

    window
      .loadFile(filePath)
      .then(() => {
        console.log(`[WindowLoader] ✓ 文件加载成功`)
        // 加载完成后设置 hash 路由
        if (route) {
          window.webContents.executeJavaScript(`window.location.hash = '${route}'`)
        }
      })
      .catch(err => {
        console.error('[WindowLoader] ❌ 文件加载失败:', err)
        console.error('[WindowLoader] 尝试的路径:', filePath)
      })
  }
}

/**
 * 设置窗口标题并阻止 HTML 文档覆盖
 * @param window 窗口实例
 * @param title 窗口标题
 */
export function setupWindowTitle(window: BrowserWindow, title: string): void {
  // 立即设置标题
  window.setTitle(title)

  // 阻止 HTML 文档的 title 覆盖窗口标题
  window.webContents.on('page-title-updated', (event: Electron.Event) => {
    event.preventDefault()
    window.setTitle(title)
  })

  // 监听 DOM 加载完成，确保标题正确
  window.webContents.once('did-finish-load', () => {
    window.setTitle(title)
  })

  // 窗口加载完成后再次确保标题正确
  window.once('ready-to-show', () => {
    window.setTitle(title)
  })
}

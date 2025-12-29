import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  // 加载环境变量
  // 对于 re 环境，需要先尝试加载 .env.re，然后 fallback 到 .env.production
  let env: Record<string, string> = {}
  
  if (mode === 're') {
    // 尝试加载 .env.re 文件
    try {
      env = loadEnv('re', process.cwd(), '')
    } catch {
      // 如果失败，使用 production 模式
      env = loadEnv('production', process.cwd(), '')
    }
    // 强制设置环境为 re
    env.VITE_APP_ENV = 're'
  } else {
    env = loadEnv(mode, process.cwd(), '')
  }

  return {
    root: path.resolve(__dirname, './src/renderer'),
    plugins: [react()],
    base: './',
    mode: mode === 're' ? 'production' : mode,
    // 自定义环境变量文件加载
    envPrefix: 'VITE_',
    build: {
      outDir: path.resolve(__dirname, 'dist/renderer'),
      emptyOutDir: true,
      // 根据环境设置 sourcemap
      sourcemap: mode === 'development',
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/renderer')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // 可以在这里添加全局 less 变量文件
          // additionalData: `@import "@/styles/variables.less";`
        }
      }
    },
    define: {
      // 确保环境变量在构建时可用
      'import.meta.env.VITE_APP_ENV': JSON.stringify(env.VITE_APP_ENV || mode),
    }
  }
})


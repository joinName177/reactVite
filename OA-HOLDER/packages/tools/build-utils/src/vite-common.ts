import type { UserConfig } from 'vite'
import path from 'path'

/**
 * 获取 Holder 模块通用的 Vite 构建配置
 */
export function getHolderViteBaseConfig(packageDir: string): Partial<UserConfig> {
  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(packageDir, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      emptyOutDir: true,
      sourcemap: false,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons'],
          },
        },
      },
    },
  }
}

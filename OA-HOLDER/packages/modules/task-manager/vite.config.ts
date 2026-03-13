import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const sharedUiSrc = path.resolve(__dirname, '../../../packages/shared/ui/src')

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  base: './',
  server: {
    port: 5174,
    strictPort: true,
  },
  build: {
    outDir: path.resolve(__dirname, '../../../dist/modules/task-manager'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      // 直接读 @holder/ui 源码，避免 tsc 构建时 CSS Module 未拷贝到 dist 的问题
      '@holder/ui/theme': path.resolve(sharedUiSrc, 'theme/index.ts'),
      '@holder/ui/icons': path.resolve(sharedUiSrc, 'icons/index.ts'),
      '@holder/ui/hooks': path.resolve(sharedUiSrc, 'hooks/index.ts'),
      '@holder/ui': path.resolve(sharedUiSrc, 'index.ts'),
    },
  },
})

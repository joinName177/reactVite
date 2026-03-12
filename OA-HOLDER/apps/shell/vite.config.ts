import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  let env: Record<string, string> = {}

  if (mode === 're') {
    try {
      env = loadEnv('re', path.resolve(__dirname, '../..'), '')
    } catch {
      env = loadEnv('production', path.resolve(__dirname, '../..'), '')
    }
    env.VITE_APP_ENV = 're'
  } else {
    env = loadEnv(mode, path.resolve(__dirname, '../..'), '')
  }

  return {
    root: __dirname,
    plugins: [react()],
    base: './',
    mode: mode === 're' ? 'production' : mode,
    envDir: path.resolve(__dirname, '../..'),
    envPrefix: 'VITE_',
    build: {
      outDir: path.resolve(__dirname, '../../dist/renderer'),
      emptyOutDir: true,
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons'],
            'state-vendor': ['zustand']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    define: {
      'import.meta.env.VITE_APP_ENV': JSON.stringify(env.VITE_APP_ENV || mode)
    }
  }
})

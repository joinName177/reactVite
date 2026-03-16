import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  let env: Record<string, string> = {}

  if (mode === 're') {
    try {
      env = loadEnv('re', __dirname, '')
    } catch {
      env = loadEnv('production', __dirname, '')
    }
    env.VITE_APP_ENV = 're'
  } else {
    env = loadEnv(mode, __dirname, '')
  }

  const sharedPath = path.resolve(__dirname, 'src/shared')

  return {
    root: path.resolve(__dirname, 'src/renderer'),
    plugins: [react()],
    base: './',
    mode: mode === 're' ? 'production' : mode,
    envDir: __dirname,
    envPrefix: 'VITE_',
    build: {
      outDir: path.resolve(__dirname, 'dist/renderer'),
      emptyOutDir: true,
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons', 'dayjs'],
            'state-vendor': ['zustand']
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      },
      chunkSizeWarningLimit: 800,
      reportCompressedSize: true,
      target: 'es2020',
      cssCodeSplit: true
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer'),
        '~': path.resolve(__dirname, 'src/renderer'),
        '@shared': sharedPath,
        '@shared/types': path.join(sharedPath, 'types'),
        '@shared/api': path.join(sharedPath, 'api'),
        '@shared/ui': path.join(sharedPath, 'ui'),
        '@shared/ui/theme': path.join(sharedPath, 'ui/theme/index.ts'),
        '@shared/ui/icons': path.join(sharedPath, 'ui/icons/index.ts'),
        '@shared/ui/hooks': path.join(sharedPath, 'ui/hooks/index.ts'),
        '@shared/i18n': path.join(sharedPath, 'i18n'),
        '@shared/ipc-bridge': path.join(sharedPath, 'ipc-bridge'),
        '@shared/ipc-bridge/renderer': path.join(sharedPath, 'ipc-bridge/renderer/index.ts')
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

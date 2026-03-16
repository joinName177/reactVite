#!/usr/bin/env node
/**
 * 在 dist/main 及 dist/main/preload 下创建 package.json，
 * 声明 "type": "commonjs"，使主进程和 preload 脚本在根 package.json 为 "type": "module" 时仍按 CJS 加载
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rootDir = path.join(__dirname, '..')
const distMain = path.join(rootDir, 'dist', 'main')
const distPreload = path.join(distMain, 'preload')

const pkgMain = { type: 'commonjs' }
const pkgPreload = { type: 'commonjs' }

if (!fs.existsSync(distMain)) {
  console.warn('[prepare-electron-main] dist/main 不存在，跳过')
  process.exit(0)
}

fs.mkdirSync(distPreload, { recursive: true })
fs.writeFileSync(path.join(distMain, 'package.json'), JSON.stringify(pkgMain, null, 2))
fs.writeFileSync(path.join(distPreload, 'package.json'), JSON.stringify(pkgPreload, null, 2))
console.log('[prepare-electron-main] 已写入 dist/main/package.json 和 dist/main/preload/package.json')

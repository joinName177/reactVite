#!/usr/bin/env node

/**
 * 根据版本号创建打包输出目录的脚本
 * 读取 package.json 中的版本号，并传递给 electron-builder
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 读取 package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
const version = packageJson.version

if (!version) {
  console.error('❌ 无法读取版本号，请检查 package.json')
  process.exit(1)
}

// 构建输出目录路径
const outputDir = `release/v${version}`

console.log(`📦 开始打包，版本号: ${version}`)
console.log(`📁 输出目录: ${outputDir}`)

// 清理当前版本的输出目录（如果存在）
const outputDirPath = path.join(__dirname, '..', outputDir)
if (fs.existsSync(outputDirPath)) {
  console.log(`🧹 清理已存在的输出目录: ${outputDir}`)
  try {
    fs.rmSync(outputDirPath, { recursive: true, force: true })
    console.log(`✅ 清理完成`)
  } catch (error) {
    console.warn(`⚠️  清理目录失败: ${error.message}`)
  }
}

// 获取传递给脚本的其他参数（electron-builder 的参数）
const electronBuilderArgs = process.argv.slice(2)

// 读取主配置文件（package.json 中的 build 配置）
const mainConfig = packageJson.build || {}

// 创建临时配置文件，继承主配置并覆盖输出目录
const tempConfigPath = path.join(__dirname, '..', 'electron-builder.temp.json')
const tempConfig = {
  ...mainConfig,
  directories: {
    ...mainConfig.directories,
    output: outputDir
  }
}

// 写入临时配置文件
fs.writeFileSync(tempConfigPath, JSON.stringify(tempConfig, null, 2), 'utf-8')

// 构建完整的命令
// 使用 --config 参数指定配置文件
const command = `electron-builder --config ${tempConfigPath} ${electronBuilderArgs.join(' ')}`

console.log(`🚀 执行命令: ${command}\n`)

try {
  execSync(command, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    shell: true
  })

  // 清理临时配置文件
  try {
    fs.unlinkSync(tempConfigPath)
  } catch (e) {
    // 忽略删除失败的错误
  }

  console.log(`\n✅ 打包完成！文件已输出到: ${outputDir}`)
} catch (error) {
  // 清理临时配置文件
  try {
    fs.unlinkSync(tempConfigPath)
  } catch (e) {
    // 忽略删除失败的错误
  }

  console.error('\n❌ 打包失败:', error.message)
  process.exit(1)
}

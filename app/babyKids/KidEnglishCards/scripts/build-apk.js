#!/usr/bin/env node
/**
 * 在独立目录中构建 APK，避免 monorepo 下 EAS 包含整个父仓库（6.7GB → <2GB）
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查 Node 版本（Expo 55 需要 Node >= 20）
const nodeVersion = process.version.replace('v', '').split('.')[0];
if (parseInt(nodeVersion, 10) < 20) {
  console.error('\n❌ Node.js 版本过低！');
  console.error(`   当前: ${process.version}`);
  console.error('   需要: Node.js >= 20.19.4 (建议安装 LTS 版本)');
  console.error('\n   下载: https://nodejs.org/');
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, '..');
const buildDir = path.join(projectRoot, '.eas-build-temp');

const IGNORE = ['node_modules', '.git', '.expo', 'dist', 'web-build', '.eas-build-temp', 'android', 'ios'];

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('创建独立构建目录...');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true });
}
copyDir(projectRoot, buildDir);

console.log('安装依赖...');
execSync('npm install', { stdio: 'inherit', cwd: buildDir });

// 上传 node_modules，避免 EAS 服务器 npm install 失败导致 prebuild 报 "expo is not installed"
const easignorePath = path.join(buildDir, '.easignore');
const easignoreContent = `# 保留 node_modules 上传，确保 prebuild 能找到 expo
.git/
.expo/
dist/
web-build/
*.tsbuildinfo
.metro-health-check*
npm-debug.*
yarn-debug.*
yarn-error.*
.DS_Store
*.pem
.env*.local
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
`;
fs.writeFileSync(easignorePath, easignoreContent);

console.log('初始化 git（EAS 需要）...');
execSync('git init', { stdio: 'inherit', cwd: buildDir });
execSync('git config user.email "build@local"', { stdio: 'pipe', cwd: buildDir });
execSync('git config user.name "build"', { stdio: 'pipe', cwd: buildDir });
execSync('git add .', { stdio: 'inherit', cwd: buildDir });
execSync('git commit -m "build" --allow-empty', { stdio: 'inherit', cwd: buildDir });

console.log('开始 EAS 构建...');
try {
  execSync('npx eas-cli build -p android --profile preview', {
    stdio: 'inherit',
    cwd: buildDir,
  });
} finally {
  console.log('清理临时目录...');
  fs.rmSync(buildDir, { recursive: true, force: true });
}

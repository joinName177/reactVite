/**
 * 机器ID获取工具
 * 基于系统硬件信息生成唯一设备标识
 */

import * as os from 'os'
import * as crypto from 'crypto'

/**
 * 获取机器唯一标识
 * 基于系统硬件信息生成，确保同一台机器每次获取的值相同
 *
 * @returns Promise<string> 机器唯一标识
 */
export async function getMachineId(): Promise<string> {
  try {
    // 收集系统硬件信息
    const systemInfo = {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().map(cpu => ({
        model: cpu.model,
        speed: cpu.speed
      })),
      networkInterfaces: getNetworkInterfaces(),
      totalmem: os.totalmem()
    }

    // 将系统信息转换为字符串
    const infoString = JSON.stringify(systemInfo)

    // 使用 SHA-256 哈希生成唯一标识
    const hash = crypto.createHash('sha256').update(infoString).digest('hex')

    return hash
  } catch (error) {
    console.error('获取机器ID失败:', error)
    // 如果获取失败，返回基于 hostname 的简单哈希
    const fallback = crypto
      .createHash('sha256')
      .update(os.hostname() + os.platform())
      .digest('hex')
    return fallback
  }
}

/**
 * 获取网络接口信息（仅 MAC 地址）
 * MAC 地址是硬件唯一标识，适合用于生成设备ID
 */
function getNetworkInterfaces(): string[] {
  const interfaces = os.networkInterfaces()
  const macAddresses: string[] = []

  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name]
    if (nets) {
      for (const net of nets) {
        // 只收集非内部接口的 MAC 地址
        if (!net.internal && net.mac && net.mac !== '00:00:00:00:00:00') {
          macAddresses.push(net.mac)
        }
      }
    }
  }

  return macAddresses
}

/**
 * 获取简化的机器ID（32位）
 * 用于需要较短ID的场景
 */
export async function getShortMachineId(): Promise<string> {
  const fullId = await getMachineId()
  return fullId.substring(0, 32)
}

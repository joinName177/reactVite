/**
 * 设备唯一标识工具
 * 根据操作系统类型处理设备唯一标识的获取和存储
 */

import * as fs from 'fs'
import * as path from 'path'
import { uuid } from './math'

// 响应结果类型定义
export interface DeviceNumberResult {
  code: 0 | 1 // 状态码：1成功，0失败
  deviceNumber?: string // 设备唯一标识
  msg: string // 操作结果信息
}

// 函数参数类型定义
export interface WriteDeviceNumberParams {
  isMac: boolean
}

/**
 * 获取或生成设备唯一标识
 *
 * 该函数根据操作系统类型处理设备唯一标识：
 * - 对于Mac系统，直接获取机器ID作为设备标识
 * - 对于非Mac系统（Windows/Linux），将设备标识存储在本地文件中
 *
 * @param params 参数对象
 * @param params.isMac 是否为Mac系统
 * @returns 返回Promise对象，resolve时返回包含设备标识信息的对象
 *
 * @example
 * // Mac系统
 * const result = await writeDeviceNumber({ isMac: true })
 *
 * @example
 * // Windows/Linux系统
 * const result = await writeDeviceNumber({ isMac: false })
 */
export const writeDeviceNumber = async ({
  isMac
}: WriteDeviceNumberParams): Promise<DeviceNumberResult> => {
  // 处理Mac系统的设备标识获取
  const handleMac = async (): Promise<DeviceNumberResult> => {
    try {
      // 通过 Electron IPC 从主进程获取机器ID
      if (typeof window !== 'undefined' && window.electronAPI) {
        const result = await window.electronAPI.getMachineId()

        if (result.success && result.machineId) {
          return {
            code: 1,
            deviceNumber: result.machineId,
            msg: '获取deviceNumber成功！'
          }
        } else {
          throw new Error(result.error || '获取机器ID失败')
        }
      } else {
        // 如果不在 Electron 环境中，使用 UUID 作为后备方案
        const deviceNumber = uuid()
        return {
          code: 1,
          deviceNumber,
          msg: '获取deviceNumber成功（使用UUID后备方案）！'
        }
      }
    } catch (error) {
      console.error('获取Mac设备ID失败:', error)
      // 失败时使用 UUID 作为后备方案
      try {
        const deviceNumber = uuid()
        return {
          code: 1,
          deviceNumber,
          msg: '获取设备ID失败，已使用UUID作为后备方案！'
        }
      } catch (uuidError) {
        return {
          code: 0,
          msg: `获取设备ID失败：${
            error instanceof Error ? error.message : '未知错误'
          }`
        }
      }
    }
  }

  // 处理非Mac系统的设备标识存储与读取
  const handleNonMac = async (): Promise<DeviceNumberResult> => {
    try {
      // 根据操作系统确定存储路径
      const parentPath =
        process.platform === 'linux'
          ? '/tmp/oa'
          : path.join(process.env.APPDATA || 'C:\\oa', 'oa')

      const filePath = path.join(parentPath, 'deviceNumber.bar')

      // 确保存储目录存在
      const ensureDirectoryExists = async (): Promise<void> => {
        try {
          await fs.promises.access(parentPath, fs.constants.F_OK)
        } catch {
          await fs.promises.mkdir(parentPath, { recursive: true })
        }
      }

      // 处理文件写入操作
      const handleFileWrite = async (): Promise<DeviceNumberResult> => {
        // 生成UUID作为设备标识
        const deviceNumber = uuid()
        try {
          // 使用 'w' 模式（写入模式）而不是 'a'（追加模式）
          // 确保每次写入都是新文件，避免重复追加
          await fs.promises.writeFile(filePath, deviceNumber, {
            encoding: 'utf-8',
            flag: 'w'
          })
          return {
            code: 1,
            deviceNumber,
            msg: '写入deviceNumber成功！'
          }
        } catch (err) {
          console.error('写入deviceNumber失败', err)
          return {
            code: 0,
            msg: `写入文件失败：${
              err instanceof Error ? err.message : '未知错误'
            }`
          }
        }
      }

      // 处理文件读取操作
      const handleFileRead = async (): Promise<DeviceNumberResult> => {
        try {
          const data = await fs.promises.readFile(filePath, {
            encoding: 'utf-8'
          })
          const deviceNumber = data.trim() // 去除可能的换行符和空格

          // 验证读取到的数据是否有效
          if (!deviceNumber) {
            console.warn('读取到的deviceNumber为空，重新生成')
            return await handleFileWrite()
          }

          return {
            code: 1,
            deviceNumber,
            msg: '读取deviceNumber成功！'
          }
        } catch (err) {
          console.error('读取deviceNumber失败', err)
          // 如果读取失败，尝试重新写入
          return await handleFileWrite()
        }
      }

      // 确保目录存在
      await ensureDirectoryExists()

      // 检查文件是否存在
      try {
        await fs.promises.access(filePath, fs.constants.F_OK)
        // 文件存在，读取
        return await handleFileRead()
      } catch {
        // 文件不存在，写入新文件
        return await handleFileWrite()
      }
    } catch (error) {
      console.error('处理非Mac设备标识失败:', error)
      return {
        code: 0,
        msg: `处理设备标识失败：${
          error instanceof Error ? error.message : '未知错误'
        }`
      }
    }
  }

  // 根据系统类型调用相应处理方法
  try {
    return isMac ? await handleMac() : await handleNonMac()
  } catch (error) {
    console.error('writeDeviceNumber 执行失败:', error)
    return {
      code: 0,
      msg: `执行失败：${error instanceof Error ? error.message : '未知错误'}`
    }
  }
}

/**
 * UUID 生成工具
 * 支持两种模式：
 * 1. 自定义长度：生成指定长度的随机字符串
 * 2. RFC4122 v4 格式：生成标准 UUID（36 字符，包含连字符）
 */

// 字符集：数字 + 大写字母 + 小写字母
const CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

/**
 * 生成 UUID 或随机字符串
 * @param len 可选，指定长度。如果不提供，则生成 RFC4122 v4 格式的 UUID
 * @param radix 可选，进制数（默认使用完整字符集长度）
 * @returns UUID 字符串或指定长度的随机字符串
 *
 * @example
 * // 生成标准 UUID
 * uuid() // '550e8400-e29b-41d4-a716-446655440000'
 *
 * @example
 * // 生成 8 位随机字符串
 * uuid(8) // 'a3B9k2Lm'
 *
 * @example
 * // 生成 16 进制随机字符串
 * uuid(8, 16) // 'a3b9c2d1'
 */
export const uuid = (len?: number, radix?: number): string => {
  const chars = CHARS
  const baseRadix = radix ?? chars.length
  const result: string[] = []

  if (len && len > 0) {
    // 紧凑格式：生成指定长度的随机字符串
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * baseRadix)
      result[i] = chars[randomIndex]
    }
  } else {
    // RFC4122 v4 格式：标准 UUID（36 字符）
    // 格式：xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    // y 必须是 8、9、a 或 b 之一

    // 设置固定位置的连字符
    result[8] = result[13] = result[18] = result[23] = '-'
    // 设置版本号（第 14 位固定为 '4'）
    result[14] = '4'

    // 填充随机数据
    for (let i = 0; i < 36; i++) {
      if (!result[i]) {
        const randomValue = Math.floor(Math.random() * 16)
        if (i === 19) {
          // 第 19 位（y）：必须是 8、9、a 或 b 之一
          // (randomValue & 0x3) | 0x8 确保值为 8-11（即 8、9、a、b）
          result[i] = chars[(randomValue & 0x3) | 0x8]
        } else {
          result[i] = chars[randomValue]
        }
      }
    }
  }

  return result.join('')
}

/**
 * 数学工具对象
 * 用于全局暴露数学相关工具函数
 */
export const Maths = {
  uuid
}

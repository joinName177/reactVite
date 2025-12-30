/**
 * 通用工具函数
 */

/**
 * 时钟指针角度接口
 */
export interface ClockAngles {
  /** 时针角度（度） */
  hourAngle: number;
  /** 分针角度（度） */
  minAngle: number;
  /** 秒针角度（度） */
  secAngle: number;
}

/**
 * 获取时钟指针的旋转角度
 * @param date 日期对象，默认为当前时间
 * @returns 包含时针、分针、秒针角度的对象
 *
 * @example
 * const angles = getTimeRotate();
 * // { hourAngle: 45, minAngle: 90, secAngle: 180 }
 *
 * const customAngles = getTimeRotate(new Date(2024, 0, 1, 12, 30, 45));
 */
export function getTimeRotate(date: Date = new Date()): ClockAngles {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours() % 12; // 转换为12小时制

  // 角度计算说明：
  // - 360度 / 60秒 = 6度/秒
  // - 360度 / 60分 = 6度/分
  // - 360度 / 12小时 = 30度/小时
  // - 减去90度是因为CSS的transform-origin默认从顶部开始（12点方向）

  // 秒针：每秒6度，加上分针的微小影响（可选）
  const secAngle = seconds * 6 - 90;

  // 分针：每分钟6度，加上秒针的影响（秒针每走1秒，分针走0.1度）
  const minAngle = minutes * 6 + seconds * 0.1 - 90;

  // 时针：每小时30度，加上分钟的影响（每分钟时针走0.5度）
  const hourAngle = hours * 30 + minutes * 0.5 - 90;

  return {
    hourAngle,
    minAngle,
    secAngle
  };
}

/**
 * 工具函数集合
 * 导出所有工具函数，用于全局挂载
 */
export const tools = {
  getTimeRotate,
  // 在这里添加更多工具函数...
} as const;
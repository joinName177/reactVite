/**
 * 全局类型声明
 */

import type { ClockAngles } from '@/utils/tools';

declare global {
  /**
   * 全局工具函数对象
   * 可以在任何地方直接使用，无需 import
   * 
   * @example
   * // 直接使用，无需 import
   * const angles = window.$tools.getTimeRotate();
   */
  interface Window {
    /**
     * 全局工具函数
     */
    $tools: {
      /**
       * 获取时钟指针的旋转角度
       * @param date 日期对象，默认为当前时间
       * @returns 包含时针、分针、秒针角度的对象
       */
      getTimeRotate: (date?: Date) => ClockAngles;
    };
  }

  /**
   * 全局工具函数的简写
   * 可以直接使用 $tools 而不需要 window.$tools
   */
  const $tools: Window['$tools'];
}

export {};


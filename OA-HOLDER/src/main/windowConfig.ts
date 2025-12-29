import { BrowserWindow, screen } from "electron";

// 窗口类型键
export type WindowKey = "main" | "approval" | "meeting";

// 窗口尺寸配置
export interface WindowSize {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

// 窗口配置接口
export interface WindowConfig {
  key: WindowKey;
  width: number;
  height: number;
  title: string;
  route?: string;
  parent?: BrowserWindow | null;
  openDevTools?: boolean;
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  skipTaskbar?: boolean; // 是否在任务栏显示
  hideOnClose?: boolean; // 关闭时是否隐藏到托盘（而不是真正关闭）
  minWidth?: number; // 最小宽度
  minHeight?: number; // 最小高度
  maxWidth?: number; // 最大宽度
  maxHeight?: number; // 最大高度
}

// 环境判断
const isDev = process.env.NODE_ENV === "development";

/**
 * 根据屏幕尺寸动态计算窗口宽高配置
 * @param options 配置选项
 * @param options.defaultWidth 默认宽度（当屏幕尺寸较大时使用）
 * @param options.defaultHeight 默认高度（当屏幕尺寸较大时使用）
 * @param options.smallScreenWidth 小屏幕时的宽度（屏幕宽度 < 1440 时使用）
 * @param options.smallScreenHeight 小屏幕时的高度（如果为 undefined，则根据屏幕高度计算）
 * @param options.minHeightThreshold 最小高度阈值（默认 840）
 * @param options.heightOffset 高度偏移量（默认 80，用于任务栏等）
 * @param options.screenWidthThreshold 屏幕宽度阈值（默认 1440）
 * @returns 窗口尺寸配置对象
 */
export function calculateWindowSize(options: {
  defaultWidth?: number;
  defaultHeight?: number;
  smallScreenWidth?: number;
  smallScreenHeight?: number;
  minHeightThreshold?: number;
  heightOffset?: number;
  screenWidthThreshold?: number;
} = {}): WindowSize {
  const {
    defaultWidth = 1440,
    defaultHeight = 900,
    smallScreenWidth = 1334,
    smallScreenHeight,
    minHeightThreshold = 840,
    heightOffset = 80,
    screenWidthThreshold = 1440,
  } = options;

  // 获取主显示器尺寸
  const primaryDisplay = screen.getPrimaryDisplay();
  const screenWidth = primaryDisplay.size.width;
  const screenHeight = primaryDisplay.size.height;

  let width: number;
  let height: number;
  let minWidth: number;
  let minHeight: number;

  if (screenWidth < screenWidthThreshold) {
    // 小屏幕配置
    width = smallScreenWidth;
    minWidth = smallScreenWidth;

    // 计算高度
    if (smallScreenHeight !== undefined) {
      height = smallScreenHeight;
      minHeight = smallScreenHeight;
    } else {
      // 根据屏幕高度动态计算
      const calculatedHeight = screenHeight < minHeightThreshold + heightOffset
        ? screenHeight - heightOffset
        : minHeightThreshold;
      height = Math.max(calculatedHeight, 600); // 确保最小高度不小于 600
      minHeight = height;
    }
  } else {
    // 大屏幕配置
    width = defaultWidth;
    height = defaultHeight;
    minWidth = defaultWidth;
    minHeight = defaultHeight;
  }

  return {
    width,
    height,
    minWidth,
    minHeight,
  };
}

/**
 * 默认窗口配置（公共配置）
 */
const defaultWindowConfig: Partial<Omit<WindowConfig, "key" | "parent" | "title" | "route" | "width" | "height">> = {
  skipTaskbar: false, // 在任务栏显示
  resizable: true, // 可调整大小
  minimizable: true, // 可最小化
  maximizable: true, // 可最大化
};

/**
 * 窗口尺寸配置选项
 */
interface WindowSizeOptions {
  defaultWidth?: number;
  defaultHeight?: number;
  smallScreenWidth?: number;
  smallScreenHeight?: number;
  minHeightThreshold?: number;
  heightOffset?: number;
  screenWidthThreshold?: number;
}

/**
 * 窗口特定配置
 */
interface WindowSpecificConfig {
  title: string;
  route: string;
  openDevTools?: boolean;
  hideOnClose?: boolean;
}

/**
 * 窗口配置定义（延迟计算）
 */
interface WindowConfigDefinition {
  sizeOptions: WindowSizeOptions;
  specificConfig: WindowSpecificConfig;
}

/**
 * 创建窗口配置的辅助函数
 * @param sizeConfig 窗口尺寸配置
 * @param specificConfig 特定窗口配置（会覆盖默认配置）
 * @returns 完整的窗口配置
 */
function createWindowConfig(
  sizeConfig: WindowSize,
  specificConfig: Partial<Omit<WindowConfig, "key" | "parent" | "width" | "height" | "minWidth" | "minHeight" | "maxWidth" | "maxHeight">>
): Omit<WindowConfig, "key" | "parent"> {
  return {
    ...defaultWindowConfig,
    ...sizeConfig,
    ...specificConfig,
  } as Omit<WindowConfig, "key" | "parent">;
}

/**
 * 窗口配置定义映射（不包含尺寸计算，延迟到调用时计算）
 */
const windowConfigDefinitions: Record<WindowKey, WindowConfigDefinition> = {
  // 主窗口配置
  main: {
    sizeOptions: {
      defaultWidth: 1440,
      defaultHeight: 900,
      smallScreenWidth: 1334,
    },
    specificConfig: {
      title: "holder-工作台",
      route: "",
      openDevTools: isDev, // 开发环境自动打开开发者工具
      hideOnClose: true, // 关闭时隐藏到托盘（而不是真正关闭）
    },
  },

  // 审批窗口配置
  approval: {
    sizeOptions: {
      defaultWidth: 1440,
      defaultHeight: 900,
      smallScreenWidth: 1334,
      smallScreenHeight: 700,
    },
    specificConfig: {
      title: "审批管理",
      route: "/approval",
      hideOnClose: false, // 关闭时真正关闭窗口
    },
  },

  // 会议窗口配置
  meeting: {
    sizeOptions: {
      defaultWidth: 1440,
      defaultHeight: 900,
      smallScreenWidth: 1334,
      smallScreenHeight: 700,
    },
    specificConfig: {
      title: "会议管理",
      route: "/meeting",
      hideOnClose: false, // 关闭时真正关闭窗口
    },
  },
};

/**
 * 获取窗口配置（延迟计算尺寸，确保在 app ready 后调用）
 * @param key 窗口键
 * @param parent 父窗口
 * @returns 完整的窗口配置
 */
export function getWindowConfig(key: WindowKey, parent?: BrowserWindow | null): WindowConfig {
  const definition = windowConfigDefinitions[key];
  
  // 延迟计算窗口尺寸（此时应用应该已经 ready）
  const sizeConfig = calculateWindowSize(definition.sizeOptions);
  
  // 合并配置
  const config = createWindowConfig(sizeConfig, definition.specificConfig);
  
  return {
    key,
    ...config,
    parent: parent || undefined,
  };
}

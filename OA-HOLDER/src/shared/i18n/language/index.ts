/**
 * 语言类型
 */
export enum LanguageType {
  ZhCn = "zh-CN", // 简体中文
  EnGb = "en-GB" // 英文
}

export const LanguageTypeMapping = [
  { label: "简体中文", value: LanguageType.ZhCn },
  { label: "English", value: LanguageType.EnGb }
];

/**
 * 语言检测器
 * 优先级：localStorage > 浏览器语言 > 默认
 */
export class LanguageDetector {
  public static readonly DEFAULT_LANGUAGE = LanguageType.ZhCn;

  /**
   * 检测当前语言
   * 优先级：localStorage > 浏览器语言 > 默认
   * @returns 当前语言
   */
  public static detect(): LanguageType {
    const browserLanguage = this.getBrowserLanguage();
    if (browserLanguage) {
      return browserLanguage;
    }
    return this.DEFAULT_LANGUAGE;
  }

  /**
   * 获取浏览器语言
   * 优先使用 navigator.languages 其次 navigator.language
   * @returns 匹配的语言或 null
   */
  public static getBrowserLanguage(): LanguageType | null {
    if (typeof window === "undefined" || !navigator) {
      return null;
    }

    const languages =
      navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language || (navigator as { userLanguage?: string }).userLanguage].filter(Boolean);

    for (const lang of languages) {
      if (typeof lang !== "string") continue;
      const matched = this.findMatchingLanguage(lang);
      if (matched) return matched;
    }

    return null;
  }

  /**
   * 获取语言显示标签
   * @param language 语言类型
   * @returns 标签文本
   */
  public static getLanguageLabel(language: LanguageType): string {
    const found = LanguageTypeMapping.find((item) => item.value === language);
    return found ? found.label : "Unknown";
  }

  /**
   * 根据语言代码匹配支持的语言
   * @param langCode 语言代码
   * @returns 匹配的语言或 null
   */
  private static findMatchingLanguage(langCode: string): LanguageType | null {
    if (Object.values(LanguageType).includes(langCode as LanguageType)) {
      return langCode as LanguageType;
    }

    // 支持 'zh' 或 'zh-CN' 匹配 zh-CN
    const langPrefix = langCode.split("-")[0].toLowerCase();
    for (const lang of Object.values(LanguageType)) {
      if (lang.toLowerCase().startsWith(langPrefix)) {
        return lang as LanguageType;
      }
    }

    return null;
  }
}

/**
 * 语言类型
 */
export enum LanguageType {
    ZhCn = 'zh-CN',  // 简体中文
    EnGb = 'en-GB',  // 英语
}

export const LanguageTypeMapping = [
    { label: '简体中文', value: LanguageType.ZhCn },
    { label: 'English', value: LanguageType.EnGb },
];


/**
 * 语言检测器
 * 只负责检测浏览器语言设置，不处理存储功能
 */
export class LanguageDetector {
    public static readonly DEFAULT_LANGUAGE = LanguageType.ZhCn;

    /**
     * 检测用户的首选语言
     * 优先级：浏览器语言 > 默认语言
     * @returns 检测到的语言类型
     */
    public static detect(): LanguageType {
        const browserLanguage = this.getBrowserLanguage();
        if (browserLanguage) {
            return browserLanguage;
        }
        return this.DEFAULT_LANGUAGE;
    }

    /**
     * 获取浏览器的语言设置
     * @returns 浏览器语言设置或null
     */
    public static getBrowserLanguage(): LanguageType | null {
        if (typeof window === 'undefined' || !navigator) {
            return null;
        }

        const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage;
        if (!browserLang) {
            return null;
        }

        return this.findMatchingLanguage(browserLang);
    }

    /**
     * 获取语言的显示名称
     * @param language 语言类型
     * @returns 语言的显示名称
     */
    public static getLanguageLabel(language: LanguageType): string {
        const found = LanguageTypeMapping.find(item => item.value === language);
        return found ? found.label : 'Unknown';
    }

    /**
     * 查找与给定语言代码最匹配的语言类型
     * @param langCode 语言代码
     * @returns 匹配的语言类型或null
     */
    private static findMatchingLanguage(langCode: string): LanguageType | null {
        if (Object.values(LanguageType).includes(langCode as LanguageType)) {
            return langCode as LanguageType;
        }

        // 尝试匹配语言代码前缀（如 'zh' 匹配 'zh-CN'）
        const langPrefix = langCode.split('-')[0].toLowerCase();
        for (const lang of Object.values(LanguageType)) {
            if (lang.toLowerCase().startsWith(langPrefix)) {
                return lang as LanguageType;
            }
        }

        return null;
    }
}

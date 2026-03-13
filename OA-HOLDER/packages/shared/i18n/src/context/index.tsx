import * as React from 'react';
import { LanguageDetector, LanguageType } from '../language';

export { LanguageType };

/**
 * 将 name 对象转换为 I18n 格式
 *
 * @param name - 包含中英文名称的对象
 * @returns I18n 格式的名称对象
 *
 * @example
 * ```typescript
 * const tmpl = getNameTmpl({ en: 'Hello', zh: '你好' });
 * // { [LanguageType.ZhCn]: '你好', [LanguageType.EnGb]: 'Hello' }
 * ```
 */
export const getNameTmpl = (name: { en: string; zh: string }) => ({
    [LanguageType.ZhCn]: name.zh,
    [LanguageType.EnGb]: name.en,
});

/**
 * 获取本地化名称
 *
 * 根据当前语言返回对应的名称（中文或英文）
 *
 * @param name - 包含中英文名称的对象
 * @param language - 当前语言类型
 * @returns 本地化后的名称字符串
 *
 * @example
 * ```typescript
 * const name = getLocalizedName({ en: 'Hello', zh: '你好' }, LanguageType.ZhCn);
 * // '你好'
 * ```
 */
export const getLocalizedName = (
    name: { en?: string; zh?: string } | undefined,
    language: LanguageType,
): string => {
    return language === LanguageType.ZhCn ? (name?.zh ?? '') : (name?.en ?? '');
};

/**
 * I18n 上下文定义
 * - language: 当前语言
 * - setLanguage: 修改语言并触发持久化
 * - formatDate/formatNumber: 统一封装 Intl 接口
 * - chooseLanguage: 根据语言返回对应模板
 */
interface II18nContextType {
    language: LanguageType;
    setLanguage: (lang: LanguageType) => void;
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
    formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
    chooseLanguage: (options: {
        tmpl: Record<LanguageType, string>;
        param?: Record<string, unknown>;
    }) => string;
}

const I18nContext = React.createContext<II18nContextType>({
    language: LanguageType.ZhCn,
    setLanguage: () => {},
    formatDate: () => '',
    formatNumber: () => '',
    chooseLanguage: () => '',
});

const LANGUAGE_STORAGE_KEY = 'global:language';

/**
 * I18nProvider
 * - 负责检测、存储语言
 * - 对外提供格式化和模板选择能力
 */
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getStoredLanguage = React.useCallback((): LanguageType | null => {
        if (typeof window === 'undefined' || !localStorage) {
            return null;
        }

        try {
            const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
            if (storedLanguage && Object.values(LanguageType).includes(storedLanguage as LanguageType)) {
                return storedLanguage as LanguageType;
            }
        } catch (error) {
            console.warn('Failed to get language from localStorage:', error);
        }

        return null;
    }, []);

    const storedLanguage = getStoredLanguage();
    const currentLanguage: LanguageType = storedLanguage || LanguageDetector.detect();

    const [language, setLanguage] = React.useState<LanguageType>(() => currentLanguage);

    const handleSetLanguage = React.useCallback(
        (lang: LanguageType) => {
            setLanguage(lang);

            if (typeof window !== 'undefined' && localStorage) {
                try {
                    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
                } catch (error) {
                    console.warn('Failed to store language to localStorage:', error);
                }
            }
        },
        [],
    );

    const formatDate = React.useCallback(
        (date: Date, options?: Intl.DateTimeFormatOptions) => {
            return new Intl.DateTimeFormat(language, options).format(date);
        },
        [language],
    );

    const formatNumber = React.useCallback(
        (num: number, options?: Intl.NumberFormatOptions) => {
            return new Intl.NumberFormat(language, options).format(num);
        },
        [language],
    );

    /**
     * 根据当前语言从模板对象中选择对应文本，支持参数插值
     *
     * @example
     * // 基础用法
     * chooseLanguage({ tmpl: { [LanguageType.ZhCn]: '你好', [LanguageType.EnGb]: 'Hello' } })
     *
     * // 带参数插值
     * chooseLanguage({
     *   tmpl: { [LanguageType.ZhCn]: '共有 {count} 人', [LanguageType.EnGb]: 'Total {count} people' },
     *   param: { count: 5 }
     * })
     */
    const chooseLanguage = React.useCallback(
        (options: {
            tmpl: Record<LanguageType, string>;
            param?: Record<string, unknown>;
        }): string => {
            let text = options.tmpl[language] || '';
            const param = options.param;
            if (param) {
                for (const key of Object.keys(param)) {
                    const value = String(param[key as keyof typeof param] ?? '');
                    text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
                }
            }
            return text;
        },
        [language],
    );

    const contextValue = React.useMemo(
        () => ({
            language,
            formatDate,
            formatNumber,
            chooseLanguage,
            setLanguage: handleSetLanguage,
        }),
        [language, formatDate, formatNumber, chooseLanguage, handleSetLanguage],
    );

    return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

/**
 * useI18n Hook，消费 I18nContext
 */
export const useI18n = () => React.useContext(I18nContext);

import * as React from 'react';
import { LanguageDetector, LanguageType } from './language';

export { LanguageType };

/**
 * 将 name 转为 I18n 模板
 *
 * @param name - 含 en/zh 的对象
 * @returns I18n 模板对象
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
 * 根据当前语言获取本地化名称
 *
 * 用于后端返回的 { en, zh } 结构
 *
 * @param name - 含 en/zh 的对象
 * @param language - 当前语言
 * @returns 对应语言的文案
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
 * I18n 上下文类型
 * - language: 当前语言
 * - setLanguage: 设置语言
 * - formatDate/formatNumber: 基于 Intl API
 * - chooseLanguage: 根据语言选择文案
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
 * - 提供语言上下文
 * - 持久化到 localStorage
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
     * 根据当前语言选择文案，支持 {变量} 占位符替换
     *
     * @example
     * // 简单文案
     * chooseLanguage({ tmpl: { [LanguageType.ZhCn]: '你好', [LanguageType.EnGb]: 'Hello' } })
     *
     * // 带参数
     * chooseLanguage({
     *   tmpl: { [LanguageType.ZhCn]: '共 {count} 人', [LanguageType.EnGb]: 'Total {count} people' },
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
 * useI18n Hook，获取 I18nContext
 */
export const useI18n = () => React.useContext(I18nContext);

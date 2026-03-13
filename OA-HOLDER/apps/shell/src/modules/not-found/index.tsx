import React, { useCallback } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useI18n, LanguageType } from '@holder/i18n'

const notFoundLocale: Record<'title' | 'subTitle' | 'backHome', Record<LanguageType, string>> = {
  title: {
    [LanguageType.ZhCn]: '404',
    [LanguageType.EnGb]: '404',
  },
  subTitle: {
    [LanguageType.ZhCn]: '抱歉，您访问的页面不存在',
    [LanguageType.EnGb]: 'Sorry, the page you visited does not exist.',
  },
  backHome: {
    [LanguageType.ZhCn]: '返回首页',
    [LanguageType.EnGb]: 'Back to Home',
  },
}

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const { chooseLanguage } = useI18n()

  const t = useCallback(
    (key: keyof typeof notFoundLocale) => chooseLanguage({ tmpl: notFoundLocale[key] }),
    [chooseLanguage],
  )

  return (
    <Result
      status="404"
      title={t('title')}
      subTitle={t('subTitle')}
      extra={
        <Button type="primary" onClick={() => navigate('/', { replace: true })}>
          {t('backHome')}
        </Button>
      }
    />
  )
}

export default NotFound

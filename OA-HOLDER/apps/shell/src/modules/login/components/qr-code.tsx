import React, { useCallback } from 'react'
import { Typography } from 'antd'
import { useI18n } from '@holder/i18n'
import styles from '../index.module.css'
import { loginLocale } from '../locale'

const { Text, Paragraph } = Typography

const QrCode: React.FC = () => {
  const { chooseLanguage } = useI18n()
  const t = useCallback(
    (key: keyof typeof loginLocale) => chooseLanguage({ tmpl: loginLocale[key] }),
    [chooseLanguage],
  )

  return (
    <div className={styles.qrCodeContainer}>
      <Text className={styles.loginPageTitle} type="secondary">
        {t('qrCodeTitle')}
      </Text>
      <div className={styles.qrCodePlaceholder} />
      <Paragraph type="secondary" className={styles.qrCodeDesc}>
        {t('qrCodeDesc')}
      </Paragraph>
    </div>
  )
}

export default QrCode

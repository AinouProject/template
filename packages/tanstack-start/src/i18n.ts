import { createInstance, type i18n as i18nType } from 'i18next'
import commonEn from './locales/en/common.json'
import commonZhCN from './locales/zh_CN/common.json'

export async function createI18n(): Promise<i18nType> {
  const i18n = createInstance()
  await i18n.init({
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    resources: {
      en: {
        common: commonEn,
      },
      zh_CN: {
        common: commonZhCN,
      },
    },
  })

  if (import.meta.hot) {
    const handleAccept = (language: string, namespace: string) => (resource: any) => {
      i18n.addResourceBundle(language, namespace, resource.default, true, true)
      if (i18n.language === language) {
        void i18n.changeLanguage(language)
      }
    }

    import.meta.hot.accept('./locales/en/common.json', handleAccept('en', 'common'))
    import.meta.hot.accept('./locales/zh_CN/common.json', handleAccept('zh_CN', 'common'))
  }

  if (typeof window !== 'undefined') {
    ;(window as any).i18n = i18n
  }

  return i18n
}

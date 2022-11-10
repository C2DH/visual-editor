import i18n from 'i18next'
import { DateTime } from 'luxon'
import { initReactI18next, useTranslation } from 'react-i18next'
// import { matchPath } from 'react-router'
import { useParams } from 'react-router-dom'
import translations from '../translations'
import {
  Languages,
  LanguageCodes,
  DefaultLanguage,
  DefaultLanguageCode,
  LanguagePathRegExp,
  LanguageRootPathRegExp,
} from '../constants'

const getLanguage = () => {
  let languageCode = ''
  // Match against language code. LanguageCodes = ['en', 'fr', 'de']
  let pathLanguage = window.location.pathname.match(LanguagePathRegExp)
  if (!pathLanguage) {
    pathLanguage = window.location.pathname.match(LanguageRootPathRegExp)
  }
  if (pathLanguage) {
    languageCode = pathLanguage[1]
  } else {
    // get default short language from browser
    const browserLangsShort = window.navigator?.languages ?? []
    console.info('browser languages detected:', browserLangsShort)
    const availablesLangsShort = browserLangsShort
      .map((d) => d.split('-').shift().toLowerCase())
      .filter((d) => LanguageCodes.includes(d))
    languageCode =
      availablesLangsShort.length > 0
        ? availablesLangsShort[0]
        : DefaultLanguageCode
  }

  console.debug('[getLanguage] languageCode:', languageCode, LanguageCodes)
  return {
    languageCode,
    language: Languages.find((l) => l.indexOf(languageCode) === 0),
  }
}

export const initializeI18next = () => {
  const { languageCode, language } = getLanguage()
  console.info(
    '[i18n] initializeI18next \n - languageCode:',
    languageCode,
    '\n - language:',
    language,
    '\n - DefaultLanguageCode:',
    DefaultLanguageCode
  )
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: translations,
      lng: languageCode,
      fallbackLng: [DefaultLanguageCode],
      interpolation: {
        escapeValue: false, // react already safes from xss
        format: function (value, format, lng) {
          if (value instanceof Date) {
            return DateTime.fromJSDate(value).toFormat(format)
          } else if (typeof value === 'number') {
            // adapt number
            return new Intl.NumberFormat(lng, {
              maximumFractionDigits: format,
            }).format(value)
          }
          return value
        },
      },
    })
  return { languageCode, language }
}

export const lang2Field = (l) => {
  const idx = LanguageCodes.indexOf(l)
  return idx === -1
    ? l?.split('-').join('_')
    : Languages[idx].split('-').join('_')
}

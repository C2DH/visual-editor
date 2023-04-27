import { useTranslation } from 'react-i18next'
import { lang2Field } from '../logic/i18n'

export const useAvailableLanguage = ({ translatable = {}, debug = false }) => {
  const { i18n } = useTranslation()
  const requestedLanguage = lang2Field(i18n.language.split('-').join('_'))

  const availableLanguages = Object.keys(translatable || {}).filter(
    (d) => typeof translatable[d] === 'string',
  )
  const isTranslatable = typeof translatable === 'object' && availableLanguages.length > 0
  if (!availableLanguages.length) {
    if (debug) {
      console.error(
        '[useAvailableLanguage] No language available...',
        '\n - translatable :',
        translatable,
      )
    }
    return {
      requestedLanguage,
      isTranslatable,
      availableLanguage: null,
      availableLanguages: [],
    }
  }
  const availableLanguage =
    typeof translatable[requestedLanguage] !== 'string' ? availableLanguages[0] : requestedLanguage
  console.debug(
    '[useAvailableLanguage]',
    '\n - availableLanguage:',
    availableLanguage,
    '\n - requestedLanguage:',
    requestedLanguage,
    '\n - translatable:',
    translatable,
  )
  return {
    availableLanguages,
    isTranslatable,
    availableLanguage,
    requestedLanguage,
  }
}

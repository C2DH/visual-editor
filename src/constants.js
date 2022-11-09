export const HomeRoute = { to: '/pages/home', label: 'navigationHome' }
export const AboutRoute = { to: '/pages/about', label: 'navigationAbout' }
export const LoginRoute = {
  to: '/login',
  path: 'login',
  label: 'navigationLogin',
}
export const SettingsRoute = {
  to: '/settings',
  path: 'settings',
  label: 'navigationSettings',
}
export const StoriesRoute = {
  to: '/stories',
  path: 'stories',
  label: 'navigationStories',
}
export const DocumentsRoute = {
  to: '/docs',
  path: 'docs',
  label: 'navigationDocuments',
}
export const NotFoundRoute = {
  to: '/pages/not-found',
  label: 'navigationNotFound',
}

export const AllRoutes = [HomeRoute, AboutRoute, SettingsRoute]

export const Languages = (
  process.env.REACT_APP_LANGUAGES ?? 'en-GB,fr-FR,de-DE'
).split(',')
export const MillerLanguages = Languages.map((l) => l.split('-').join('_'))
export const LanguageCodes = Languages.map((l) => l.split('-')[0])
export const LanguageRoutePattern = `/:lang(${LanguageCodes.join('|')})`
export const LanguagePathRegExp = new RegExp(`/(${LanguageCodes.join('|')})/`)
export const LanguageRootPathRegExp = new RegExp(
  `^/(${LanguageCodes.join('|')})/?$`
)
export const DefaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ?? 'en-GB'
export const DefaultLanguageCode = DefaultLanguage.split('-')[0]
export const MillerAPI = process.env.REACT_APP_MILLER_API ?? '/api'

export const BootstrapColumnLayout = Object.freeze({
  md: { span: 10, offset: 0 },
})

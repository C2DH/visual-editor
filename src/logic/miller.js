import React from 'react'
import { useTranslation } from 'react-i18next'
import { Miller } from '@c2dh/react-miller'
import { QueryClient } from 'react-query'
import { Languages, MillerAPI } from '../constants'
import { useSettingsStore } from '../store'

const lang2Field = (l) => l?.split('-').join('_')

const client = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      staleTime: Infinity,
      retry: false,
      suspense: false,
      keepPreviousData: true,
    },
  },
})

export const WithMiller = ({ children }) => {
  const { i18n } = useTranslation()
  const [millerApiUrl, millerAuthToken] = useSettingsStore((state) => [
    state.millerApiUrl,
    state.millerAuthToken,
  ])

  console.debug('[WithMiller] \n - millerApiUrl:', millerApiUrl)
  const headers = {
    'X-MILLER-TEST': 'Hello Miller :)',
  }
  if (millerAuthToken) {
    headers.Authentication =
      '${millerAuthToken.token_type}: ${millerAuthToken.access_token'
  }
  return (
    <Miller
      client={client}
      apiUrl={millerApiUrl}
      langs={Languages.map(lang2Field)}
      lang={lang2Field(i18n.language)}
      disableTranslate={true}
      headers={headers}
    >
      {children}
    </Miller>
  )
}

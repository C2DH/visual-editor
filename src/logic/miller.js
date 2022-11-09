import React from 'react'
import { Miller } from '@c2dh/react-miller'
import { QueryClient } from 'react-query'
import { useSettingsStore } from '../store'

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

export const lang2Field = (l) => l?.split('-').join('_')

export const WithMiller = ({ children }) => {
  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)
  const headers = {
    'X-MILLER': 'Hello Miller :)',
  }
  if (millerAuthToken) {
    headers.Authorization = `${millerAuthToken.token_type} ${millerAuthToken.access_token}`
  }
  return (
    <Miller
      client={client}
      apiUrl={millerApiUrl}
      disableTranslate={true}
      headers={headers}
    >
      {children}
    </Miller>
  )
}

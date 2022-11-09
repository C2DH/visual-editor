import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create((set) => ({
  routeLabel: '',
  setRouteLabel: (routeLabel) => set({ routeLabel }),
  user: null,
  setUser: (user) => set({ user }),
}))

const EnvVariables = {
  mapboxStyleUrl: process.env.REACT_APP_MAPBOX_STYLE_URL,
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  millerClientId: process.env.REACT_APP_MILLER_CLIENT_ID || '',
  basename: process.env.REACT_APP_BASENAME || '/editor',
  proxy: process.env.REACT_APP_PROXY || 'http://localhost',
  millerApiUrl: process.env.REACT_APP_MILLER_API_URL || '/api',
  millerOAuthUrl: process.env.REACT_APP_MILLER_OAUTH_URL || '/o/auth',
}
console.debug(EnvVariables)
export const useSettingsStore = create(
  persist(
    (set) => ({
      ...EnvVariables,
      millerAuthToken: null,
      resetFromEnv: () => set(EnvVariables),
      setMillerApiUrl: (millerApiUrl) => set({ millerApiUrl }),
      setMillerOAuthUrl: (millerOAuthUrl) => set({ millerOAuthUrl }),
      setMillerClientId: (millerClientId) => set({ millerClientId }),
      setMillerAuthToken: (millerAuthToken) => set({ millerAuthToken }),
      setMapbox: ({ mapboxStyleUrl, mapboxAccessToken }) =>
        set({
          mapboxStyleUrl,
          mapboxAccessToken,
        }),
    }),
    { name: 'visual-editor-settings' },
  ),
)
import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create((set) => ({
  routeLabel: '',
  user: null,
  modalCreateDocOpen: false,
  setRouteLabel: (routeLabel) => set({ routeLabel }),
  setUser: (user) => set({ user }),
  setModalCreateDocOpen: (isOpen) => set({ modalCreateDocOpen: isOpen }),
}))

const EnvVariables = {
  mapboxStyleUrl: process.env.REACT_APP_MAPBOX_STYLE_URL,
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  millerClientId: process.env.REACT_APP_MILLER_CLIENT_ID || '',
  basename: process.env.REACT_APP_BASENAME || '/editor',
  proxy: process.env.REACT_APP_PROXY || 'http://localhost',
  millerApiUrl: process.env.REACT_APP_MILLER_API_URL || '/api',
  millerOAuthUrl: process.env.REACT_APP_MILLER_OAUTH_URL || '/o/token/',
  // the folder where payload is. this is related to host (or proxy)
  millerDocumentSchemaRootUrl:
    process.env.REACT_APP_MILLER_DOCUMENT_SCHEMA_ROOT_URL || '/miller-assets/schema/document',
}

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
      setMapboxStyleUrl: (mapboxStyleUrl) => set({ mapboxStyleUrl }),
      setMapboxAccessToken: (mapboxAccessToken) => set({ mapboxAccessToken }),
      setMillerDocumentSchemaRootUrl: (millerDocumentSchemaRootUrl) =>
        set({ millerDocumentSchemaRootUrl }),
    }),
    { name: 'visual-editor-settings' },
  ),
)

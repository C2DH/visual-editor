import React, { lazy } from 'react'
import { isMobile } from 'react-device-detect'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { WithMiller } from './logic/miller'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import LanguageRouter from './components/LanguageRouter'
import { useCurrentWindowDimensions } from './hooks/viewport'
import { useSettingsStore } from './store'
import {
  LoginRoute,
  SettingsRoute,
  StoriesRoute,
  DocsRoute,
  AuthorsRoute,
  AuthorRoute,
} from './constants'
import RequireAuth from './components/RequireAuth'

import Menu from './components/Menu'
import CreateDoc from './components/CreateDoc'

const NotFound = lazy(() => import('./pages/NotFound'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Settings = lazy(() => import('./pages/Settings'))
const Stories = lazy(() => import('./pages/Stories'))
const Doc = lazy(() => import('./pages/Doc'))
const Docs = lazy(() => import('./pages/Docs'))
const Story = lazy(() => import('./pages/Story'))
const Authors = lazy(() => import('./pages/Authors'))
const Author = lazy(() => import('./pages/Author'))

function App({ languageCode, asideWidth = 250 }) {
  const basename = useSettingsStore((state) => state.basename)
  const { width: windowWidth, height: windowHeight } = useCurrentWindowDimensions(isMobile)
  return (
    <BrowserRouter basename={basename}>
      <WithMiller>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <LanguageRouter />
          <div className="App">
            <CreateDoc />
            <Menu
              className="position-fixed top-0 p-5"
              languageCode={languageCode}
              style={{
                minHeight: windowHeight,
              }}
            >
              <p>
                <label className="d-block">languageCode</label>
                <b>{languageCode}</b>
              </p>
              <p>
                <label className="d-block">basename </label>
                <b>{basename}</b>
              </p>
            </Menu>
            <div
              className="py-5 flex-grow-1"
              style={{
                width: windowWidth - asideWidth,
                marginLeft: asideWidth,
              }}
            >
              <Routes>
                <Route path="/" element={<Navigate to={languageCode} replace />} />
                <Route path={languageCode}>
                  <Route
                    path=""
                    element={
                      <React.Suspense fallback={<div className="h-75" />}>
                        <Home isMobile={isMobile} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path={SettingsRoute.path}
                    element={
                      <React.Suspense fallback={<div className="h-75" />}>
                        <Settings isMobile={isMobile} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path={LoginRoute.path}
                    element={
                      <React.Suspense fallback={<div className="h-75" />}>
                        <Login isMobile={isMobile} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path={DocsRoute.path}
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<div className="h-75" />}>
                          <Docs isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="doc/:docId"
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<>...</>}>
                          <Doc isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={StoriesRoute.path}
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<div className="h-75" />}>
                          <Stories isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="story/:storyId"
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<>...</>}>
                          <Story isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={AuthorsRoute.path}
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<>...</>}>
                          <Authors isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  ></Route>
                  <Route
                    path={AuthorRoute.path}
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<>...</>}>
                          <Author isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  ></Route>
                  <Route
                    path="*"
                    element={
                      <React.Suspense fallback={<>...</>}>
                        <NotFound />
                      </React.Suspense>
                    }
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </QueryParamProvider>
      </WithMiller>
    </BrowserRouter>
  )
}

export default App

import React, { lazy } from 'react'
import { isMobile } from 'react-device-detect'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { WithMiller } from './logic/miller'
import RouteAdapter from './components/RouteAdapter'
import { QueryParamProvider } from 'use-query-params'
import LanguageRouter from './components/LanguageRouter'

import { useSettingsStore } from './store'
import { LoginRoute, SettingsRoute, StoriesRoute } from './constants'
import RequireAuth from './components/RequireAuth'

import Menu from './components/Menu'

const NotFound = lazy(() => import('./pages/NotFound'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Settings = lazy(() => import('./pages/Settings'))
const Stories = lazy(() => import('./pages/Stories'))
const Story = lazy(() => import('./pages/Story'))

function App({ languageCode }) {
  const basename = useSettingsStore((state) => state.basename)
  return (
    <BrowserRouter basename={basename}>
      <WithMiller>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <LanguageRouter />
          <div className='App d-flex'>
            <Menu className='flex-shrink-1 p-5' languageCode={languageCode}>
              <p>
                <label className='d-block'>languageCode</label>
                <b>{languageCode}</b>
              </p>
              <p>
                <label className='d-block'>basename </label>
                <b>{basename}</b>
              </p>
            </Menu>
            <div className='py-5 flex-grow-1'>
              <Routes>
                <Route
                  path='/'
                  element={<Navigate to={languageCode} replace />}
                />
                <Route path={languageCode}>
                  <Route
                    path=''
                    element={
                      <React.Suspense fallback={<div className='h-75' />}>
                        <Home isMobile={isMobile} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path={SettingsRoute.path}
                    element={
                      <React.Suspense fallback={<div className='h-75' />}>
                        <Settings isMobile={isMobile} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path={LoginRoute.path}
                    element={
                      <React.Suspense fallback={<div className='h-75' />}>
                        <Login isMobile={isMobile} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path={StoriesRoute.path}
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<div className='h-75' />}>
                          <Stories isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={StoriesRoute.path}
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<div className='h-75' />}>
                          <Stories isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='story/:storyId'
                    element={
                      <RequireAuth languageCode={languageCode}>
                        <React.Suspense fallback={<>...</>}>
                          <Story isMobile={isMobile} />
                        </React.Suspense>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='*'
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

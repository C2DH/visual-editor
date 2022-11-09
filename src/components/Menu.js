import React from 'react'
import User from './User'
import LangLink from './LangLink'
import { Github } from 'lucide-react'

import { LoginRoute, SettingsRoute, StoriesRoute } from '../constants'
import { useTranslation } from 'react-i18next'

const Menu = ({ className = '', children }) => {
  const { t } = useTranslation()
  return (
    <aside className={`Menu ${className}`}>
      <h1>
        visual
        <br />
        editor
      </h1>

      <LangLink to={SettingsRoute.to}>{t(SettingsRoute.label)}</LangLink>
      <br />
      <LangLink to={StoriesRoute.to}>{t(StoriesRoute.label)}</LangLink>
      <section className='mt-3'>
        <User></User>
      </section>
      <section className='mt-3'>
        <a
          href={`https://github.com/C2DH/visual-editor/commit/${process.env.REACT_APP_GIT_REVISION}`}
        >
          <Github size={18} /> {process.env.REACT_APP_GIT_REVISION}
        </a>
      </section>
      <section>{children}</section>
    </aside>
  )
}

export default Menu

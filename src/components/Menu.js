import React from 'react'
import User from './User'
import LangLink from './LangLink'
import { Github } from 'lucide-react'

import { DocsRoute, PagesRoute, SettingsRoute, StoriesRoute } from '../constants'
import { useTranslation } from 'react-i18next'

const Menu = ({ className = '', children, style }) => {
  const { t } = useTranslation()
  return (
    <aside className={`Menu ${className}`} style={style}>
      <h1>
        visual
        <br />
        editor
      </h1>

      <LangLink to={StoriesRoute.to}>{t(StoriesRoute.label)}</LangLink>
      <br />
      <LangLink to={DocsRoute.to}>{t(DocsRoute.label)}</LangLink>
      <br />
      <br />
      <LangLink to={SettingsRoute.to}>{t(SettingsRoute.label)}</LangLink>
      <br />

      <LangLink to={PagesRoute.to}>{t(PagesRoute.label)}</LangLink>
      <br />
      <section className="mt-3">
        <User></User>
      </section>
      <section className="mt-3">
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

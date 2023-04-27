import React from 'react'
import User from './User'
import LangLink from './LangLink'
import { Github } from 'lucide-react'

import { AuthorsRoute, DocsRoute, PagesRoute, SettingsRoute, StoriesRoute } from '../constants'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import './Menu.css'

const Menu = ({ className = '', children, style }) => {
  const { t } = useTranslation()
  const setModalCreateDocOpen = useStore((state) => state.setModalCreateDocOpen)
  return (
    <aside className={`Menu ${className}`} style={style}>
      <h1>
        <del>visual</del>
        <br />
        editor
      </h1>
      <ul>
        <li>
          <LangLink to={StoriesRoute.to}>{t(StoriesRoute.label)}</LangLink>
        </li>
        <li>
          └─&nbsp;
          <a href="#" onClick={() => setModalCreateDocOpen(true)}>
            new story
          </a>
        </li>
        <li>
          <LangLink to={DocsRoute.to}>{t(DocsRoute.label)}</LangLink>
        </li>
        <li>
          └─&nbsp;
          <a href="#" onClick={() => setModalCreateDocOpen(true)}>
            new document
          </a>
        </li>
        <li>
          <LangLink to={AuthorsRoute.to}>{t(AuthorsRoute.label)}</LangLink>
        </li>
        <li>
          └─&nbsp;
          <a href="#" onClick={() => setModalCreateDocOpen(true)}>
            new author
          </a>
        </li>

        <li>
          <LangLink to={PagesRoute.to}>{t(PagesRoute.label)}</LangLink>
        </li>
        <li>
          └─&nbsp;
          <a href="#" onClick={() => setModalCreateDocOpen(true)}>
            new static page
          </a>
        </li>
        <li>&nbsp;</li>

        <li>
          <LangLink to={SettingsRoute.to}>{t(SettingsRoute.label)}</LangLink>
        </li>
      </ul>
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

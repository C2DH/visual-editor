import React from 'react'
import Covers from '../Covers'
import LangLink from '../LangLink'
import AvailableLanguages from '../AvailableLanguages'
import { useAvailableLanguage } from '../../hooks/i18n'
import '../../styles/components/Doc/DocItem.css'
import downsize from 'downsize'

const DocItem = ({ doc, reduced = false, className = '', onSelect }) => {
  const { availableLanguage, availableLanguages } = useAvailableLanguage({
    translatable: typeof doc.data.title === 'string' ? undefined : doc.data.title,
  })
  let title =
    availableLanguage === null
      ? doc.data.title || doc.title || doc.slug
      : doc.data.title[availableLanguage]
  if (reduced) {
    title = downsize(title, { characters: 50, append: '&hellip;' })
  }
  console.info('[DocItem]', '\n - title:', title, '\n - availableLanguages:', availableLanguages)
  return (
    <div className={`DocItem d-flex align-items-center ${className}`}>
      {doc.covers?.length ? <Covers covers={doc.covers} /> : null}
      <div className={doc.covers?.length ? 'ms-3' : ''}>
        <div className="mb-1">
          <button
            className="btn btn-outline-dark btn-xs"
            onClick={() => onSelect({ type: [doc.type] })}
          >
            {doc.type}
          </button>
          <button
            className="ms-1 btn btn-outline-dark btn-xs"
            onClick={() => onSelect({ data__type: [doc.data.type] })}
          >
            {doc.data.type}
          </button>
        </div>
        <div className="badge badge-info">
          slug:<b>{doc.slug}</b>
        </div>
        <LangLink className="DocItem_title" to={`/doc/${doc.id}`}>
          <h4
            className="m-0 "
            dangerouslySetInnerHTML={{
              __html: title
                .split(/[[\]]/)
                .join('')
                .split(/\{[^}]+\}/)
                .join(''),
            }}
          />
        </LangLink>
        <AvailableLanguages
          className="DocItem_languages"
          languages={availableLanguages}
          language={availableLanguage}
        />
      </div>
    </div>
  )
}

export default DocItem

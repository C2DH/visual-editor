import React from 'react'
import Covers from '../Covers'
import LangLink from '../LangLink'
import AvailableLanguages from '../AvailableLanguages'
import StoryAuthors from './StoryAuthors'
import { useAvailableLanguage } from '../../hooks/i18n'
import '../../styles/components/Story/StoryItem.css'
import downsize from 'downsize'
import { useTranslation } from 'react-i18next'

const StoryItem = ({ story, reduced = false, className = '' }) => {
  const { t } = useTranslation()
  const { availableLanguage, availableLanguages } = useAvailableLanguage({
    translatable: story.data.title,
  })
  let title =
    availableLanguage === null
      ? story.data.title || story.title || story.slug
      : story.data.title[availableLanguage]
  if (reduced) {
    title = downsize(title, { characters: 50, append: '&hellip;' })
  }
  console.info('[StoryItem]', '\n - title:', title, '\n - availableLanguages:', availableLanguages)
  return (
    <div className={`StoryItem d-flex align-items-center ${className}`}>
      {story.covers.length ? <Covers covers={story.covers} /> : null}
      <div className={story.covers.length ? 'ms-3' : ''}>
        <div className="badge badge-info">
          status: <b>{story.status}</b>
        </div>
        <div className="badge badge-info">
          slug: <b>{story.slug}</b>
        </div>
        <div className="badge badge-info">
          last modified: <b>{t('datetime', { date: new Date(story.date_last_modified) })}</b>
        </div>
        <div className="badge badge-info">
          created: <b>{t('datetime', { date: new Date(story.date_created) })}</b>
        </div>
        <LangLink className="StoryItem_title" to={`/story/${story.slug}`}>
          <h4
            className="my-3 "
            dangerouslySetInnerHTML={{
              __html: title
                .split(/[[\]]/)
                .join('')
                .split(/\{[^}]+\}/)
                .join(''),
            }}
          />
        </LangLink>
        <StoryAuthors className="StoryItem_authors" authors={story.authors} />
        <AvailableLanguages
          className="StoryItem_languages"
          languages={availableLanguages}
          language={availableLanguage}
        />
      </div>
    </div>
  )
}

export default StoryItem

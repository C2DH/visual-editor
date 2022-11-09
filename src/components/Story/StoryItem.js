import React from 'react'
import Covers from '../Covers'
import LangLink from '../LangLink'
import AvailableLanguages from '../AvailableLanguages'
import StoryAuthors from './StoryAuthors'
import { useAvailableLanguage } from '../../hooks/i18n'
import '../../styles/components/Story/StoryItem.css'
import downsize from 'downsize'

const StoryItem = ({ story, reduced = false, className = '' }) => {
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
  console.info(
    '[StoryItem]',
    '\n - title:',
    title,
    '\n - availableLanguages:',
    availableLanguages
  )
  return (
    <div className={`StoryItem d-flex align-items-center ${className}`}>
      {story.covers.length ? <Covers covers={story.covers} /> : null}
      <div className={story.covers.length ? 'ms-3' : ''}>
        <div className='badge badge-info'>status: {story.status}</div>
        <div className='badge badge-info'>slug: {story.slug}</div>
        <LangLink className='StoryItem_title' to={`/story/${story.slug}`}>
          <h4
            className='m-0 '
            dangerouslySetInnerHTML={{
              __html: title
                .split(/[\[\]]/)
                .join('')
                .split(/\{[^}]+\}/)
                .join(''),
            }}
          />
        </LangLink>
        <StoryAuthors className='StoryItem_authors' authors={story.authors} />
        <AvailableLanguages
          className='StoryItem_languages'
          languages={availableLanguages}
          language={availableLanguage}
        />
      </div>
    </div>
  )
}

export default StoryItem

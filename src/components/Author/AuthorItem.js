import React from 'react'
import LangLink from '../LangLink'

const AuthorItem = ({ author, className }) => (
  <LangLink to={`/author/${author.id || author.slug}`} className={`AuthorItem ${className}`}>
    {author.fullname}
  </LangLink>
)

export default AuthorItem

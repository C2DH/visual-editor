import React from 'react'
import { pure } from 'recompose'

export default pure(function Subtitles({ subtitles }) {
  return (
    <div className='subtitles'>
      {subtitles.map((sub, index) => (
        <div key={index}>{sub}</div>
      ))}
    </div>
  )
})

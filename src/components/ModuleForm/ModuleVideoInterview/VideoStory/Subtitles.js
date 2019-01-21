import React from 'react'

export default function Subtitles({ subtitles }) {
  return (
    <div className='subtitles'>
      {subtitles.map((sub, index) => (
        <div key={index}>{sub}</div>
      ))}
    </div>
  )
}

import React from 'react'

export default function Speaker({ doc }) {
  return (
    <div className='speaker'>
      {doc && <div>
        <h5>{doc.title}</h5>
        <h1>{doc.title}</h1>
      </div>}
    </div>
  )
}

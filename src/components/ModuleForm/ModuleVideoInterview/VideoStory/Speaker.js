import React from 'react'

export default function Speaker({ doc }) {
  return (
    <div className='speaker'>
      {doc && <div>
        <h5>{doc.title}</h5>
      </div>}
    </div>
  )
}

import React from 'react'
import { pure } from 'recompose'

export default pure(function Speaker({ doc }) {
  return (
    <div className='speaker'>
      {doc && <div>
        <h5>{doc.title}</h5>
      </div>}
    </div>
  )
})

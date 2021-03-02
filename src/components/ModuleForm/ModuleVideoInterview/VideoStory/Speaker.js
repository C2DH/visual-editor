import React, { memo } from 'react'

export default memo(function Speaker({ doc }) {
  return (
    <div className='speaker'>
      {doc && <div>
        <h5>{doc.title}</h5>
      </div>}
    </div>
  )
})

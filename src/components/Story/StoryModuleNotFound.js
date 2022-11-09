import React from 'react'

const StoryModuleNotFound = ({ type, ...rest }) => {
  return (
    <div>
      Visual Module not found: {type}
      <pre>{JSON.stringify(rest, null, true)}</pre>
    </div>
  )
}
export default StoryModuleNotFound

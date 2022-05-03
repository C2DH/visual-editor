import React from 'react'

const ModulePreviewObject = (props) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

export default ModulePreviewObject

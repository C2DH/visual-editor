import React from 'react'

const ModulePreviewDebugger = (props) => {
  return <pre className="ModulePreviewDebugger">{JSON.stringify(props, null, 2)}</pre>
}

export default ModulePreviewDebugger

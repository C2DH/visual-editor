import React, { lazy, useState } from 'react'
import StoryModuleTypeSwitch from './StoryModuleTypeSwitch'

export const Text = 'text'
export const TextObject = 'text+object'
const AvailableModuleTypes = [Text, TextObject]

const StoryModuleNotFound = lazy(() => import('./StoryModuleNotFound'))
const StoryModuleText = lazy(() => import('./StoryModuleText'))
const StoryModuleTextObject = lazy(() => import('./StoryModuleTextObject'))

const StoryModule = ({ type = '', ...rest }) => {
  const [currentType, setType] = useState(type)

  return (
    <div className='StoryModule'>
      <StoryModuleTypeSwitch
        className='mb-3'
        type={currentType}
        availableTypes={AvailableModuleTypes}
        onChange={(t) => setType(t)}
      ></StoryModuleTypeSwitch>
      {currentType === Text && <StoryModuleText {...rest} />}
      {currentType === TextObject && <StoryModuleTextObject {...rest} />}
      {AvailableModuleTypes.includes(currentType) === false && (
        <StoryModuleNotFound type={currentType} {...rest} />
      )}
    </div>
  )
}

export default StoryModule

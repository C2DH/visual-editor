import React, { memo } from 'react'
import SlideshowGallery from '../SlideshowGallery'
import GridGallery from '../GridGallery'

const Gallery = ({ layout, ...props }) => {
  if (layout === 'grid') {
      return <GridGallery {...props} />
  } else if (layout === 'slideshow') {
    return <SlideshowGallery {...props} />
  }
  return null
}

export default memo(Gallery)

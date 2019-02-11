import React from 'react'
import { pure } from 'recompose'
import { UncontrolledTooltip } from 'reactstrap'
import moment from 'moment'

export default pure(function TopControls({
  durationSeconds,
  playedSeconds,
  played,
  sideDocs,
  renderTitle,
  playing,
  togglePlaying,
  onSeek,
  volume,
  setVolume,
}) {
  const playedMinutes = moment.utc(parseInt(playedSeconds, 10) * 1000).format('mm:ss')
  const durationMinutes = moment.utc(parseInt(durationSeconds, 10) * 1000).format('mm:ss')
  return (
    <div className='video-story-top' id='video-story-23'>
      <button type='button' className="control-button" onClick={togglePlaying}>
        { playing ? <span>&#9632;</span> : <span>&#9654;</span> }
      </button>
      <div className="track-container">
        <div className="video-meta">
          <div className="d-flex h-100 align-items-center">
            <div className="mx-2">{renderTitle()}</div>
            <div>{playedMinutes}/{durationMinutes}</div>
          </div>
          <div
            onClick={() => setVolume(volume === 0 ? 1 : 0)}
            style={{ textDecoration: volume === 0 ? 'line-through' : undefined, cursor: 'pointer' }}>{'♪'}</div>
        </div>
        <div className="track" onClick={e => {
          const rect = e.target.getBoundingClientRect()
          const clickX = e.clientX - rect.x
          const percentOffset = clickX / rect.width
          onSeek(percentOffset)
        }}>

          <div className="progress" style={{width: `${played*100}%`}}></div>
          {sideDocs && sideDocs.length > 0 && sideDocs
            .filter(sideDoc => sideDoc.secondsFrom !== null && sideDoc.secondsTo !== null)
            .map((sideDoc, i) => (
              <div key={i}>
                <div
                  onClick={e => {
                    e.stopPropagation()
                    onSeek(sideDoc.secondsFrom/durationSeconds)
                  }}
                  id={`side-doc-${i}`}
                  className="side-doc" style={{left: `${sideDoc.secondsFrom/durationSeconds*100}%`}}
                />
                <UncontrolledTooltip placement="bottom" target={`side-doc-${i}`} className="side-doc-tooltip">
                  {sideDoc.id.title}
                </UncontrolledTooltip>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
})

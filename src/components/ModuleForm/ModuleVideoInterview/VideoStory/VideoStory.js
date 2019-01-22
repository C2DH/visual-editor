import React, { PureComponent } from 'react'
import ReactPlayer from 'react-player'
import TopControls from './TopControls'
import Speaker from './Speaker'
// import LangSwitcher from './LangSwitcher'
import Subtitles from './Subtitles'
import SideDocument from './SideDocument'
import './VideoStory.css'

const MIN_SIDE_WIDTH = 250

export default class VideoStory extends PureComponent {
  state = {
    durationSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    playedSeconds: 0,
    played: 0,
    volume: 0,
    sideWidth: 300,
    playing: true,
    subtitles: [],
  }

  onPlayerReady = () => {
    const video = this.player.getInternalPlayer()
    if (video) {
      const track = video.textTracks[0]
      if (track) {
        track.addEventListener('cuechange', this.setSubtitles)
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.subtitlesFile !== prevProps.subtitlesFile) {
      this.setState({
        subtitles: [],
      })
    }
  }

  componentWillUnmount() {
    const video = this.player.getInternalPlayer()
    if (video) {
      const track = video.textTracks[0]
      if (track) {
        track.removeEventListener('cuechange', this.setSubtitles)
      }
    }
  }

  setSubtitles = (e) => {
    const subtitles = Array.from(e.target.activeCues).map(cue => cue.text)
    this.setState({ subtitles })
  }

  onProgress = (progressState) => {
    this.setState(progressState)
  }

  onDuration = (durationSeconds) => {
    this.setState({ durationSeconds })
  }

  onSeek = (percent) => {
    this.player.seekTo(percent)
    // this.setState({played: percent})
  }

  handleSideDocDrag = (e, data) => {
    return this.setState(prevState => ({
      sideWidth: Math.max(prevState.sideWidth + (-data.x), MIN_SIDE_WIDTH),
    }))
  }

  setVolume = volume => this.setState({ volume })

  togglePlaying = () => this.setState({playing: !this.state.playing})

  render() {
    const { url, title, getSpeakerAt, getSideDocAt, sideDocs, subtitlesFile, renderTitle } = this.props
    const { durationSeconds, playedSeconds, played, sideWidth, playing, subtitles, volume } = this.state
    const speaker = getSpeakerAt(playedSeconds)
    const sideDoc = getSideDocAt(playedSeconds)
    const tracks = []
    tracks.push({
      kind: 'metadata',
      src: subtitlesFile,
      default: true
    })
    // XXX HACK XXX
    // Super workaround
    // On firefox when the track src change the subtitles won't change
    // so setting key to ReactPlayer cause mount/unmount of node
    const playerKey = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1
      ? subtitlesFile
      : undefined

    return (
      <div className='video-story'>

        <TopControls
          durationSeconds={durationSeconds}
          playedSeconds={playedSeconds}
          played={played}
          sideDocs={sideDocs}
          renderTitle={renderTitle}
          title={title}
          playing={playing}
          togglePlaying={this.togglePlaying}
          onSeek={this.onSeek}
          volume={volume}
          setVolume={this.setVolume}
        />

        <div className='video-story-video'>
          <div className='video-container'>
            <ReactPlayer
              key={playerKey}
              ref={r => this.player = r}
              onClick={this.togglePlaying}
              // controls
              onReady={this.onPlayerReady}
              onDuration={this.onDuration}
              onProgress={this.onProgress}
              playing={playing}
              volume={volume}
              width='100%'
              height='100%'
              progressInterval={500}
              url={url}
              config={{
                file: { tracks }
              }}
            />
          </div>
          <SideDocument
            doc={sideDoc}
            onDrag={this.handleSideDocDrag}
            width={sideWidth}
          />
        </div>

        <div className='video-story-bottom'>
          <Speaker doc={speaker} />
          <Subtitles subtitles={subtitles} />
        </div>

      </div>
    )
  }
}

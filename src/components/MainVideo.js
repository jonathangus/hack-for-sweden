import React from 'react'
import isMobile from 'ismobilejs'
import Hls from 'hls.js'
import styled from 'styled-components'
import Hemlet from 'react-helmet'
import get from 'lodash/get'

const Video = styled.video`
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  width: 100%;
  position: relative;
  z-index: 5;
`

const hlsSource =
  'https://player.vimeo.com/external/298729647.m3u8?s=f376aa1e99e20e0b84de5145d57b8cd3949a26a1'
const mp4Source =
  'https://player.vimeo.com/external/322283448.sd.mp4?s=85a8d254a0021aa5a37bd5e9b4f49acee9b935cc&profile_id=165'
// const mp4Source =
//   'https://player.vimeo.com/external/298729647.hd.mp4?s=ab5a737dad548764dd4cae6e3ebbbfb296bb2d6f&profile_id=174'

class MainVideo extends React.Component {
  video = React.createRef()

  render() {
    const { posterImage } = this.props
    const poster = get(posterImage, 'fluid.src')

    return (
      <React.Fragment>
        <Video
          poster={poster}
          preload="true"
          ref={this.video}
          autoPlay
          loop
          playsInline
          muted
        >
          <source src={mp4Source} type="video/mp4" />
        </Video>
      </React.Fragment>
    )
  }
}

export default MainVideo

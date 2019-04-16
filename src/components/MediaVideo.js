import React from 'react'
import styled from 'styled-components'
import Grid from './Grid'
import YouTubePlayer from 'youtube-player'
import Rellax from 'rellax'
import { findDOMNode } from 'react-dom'
import { cleanShadow, gutter, sectionSpace, baseTransition } from '../vars'
import BgImage from './BgImage'
import Play from '../icons/Play'
import Close from '../icons/Close'
import Tilt from 'vanilla-tilt'
import VideoYoutube from './media/VideoYoutube'
import VideoVimeo from './media/VideoVimeo'
import MediaVideoModal from './media/MediaVideoModal'

const Section = styled.section`
  margin: ${p => (p.withMargin ? sectionSpace : 0)} 0;
`

const Video = styled.div`
  cursor: pointer;
  height: 100%;
  transform-style: preserve-3d;

  &:before {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    content: '';
    z-index: 5;
  }

  @media (min-width: 1140px) {
    height: ${p => (p.small ? 'auto' : 'calc(1140px * 0.5625)')};
  }
`
const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  padding: 20px;
  text-align: center;
  max-width: 70%;
  z-index: 10;
  transform: translateZ(50px) translateY(-50%) translateX(-50%);

  @media (max-width: 1100px) {
    max-width: 100%;
  }
  svg {
    width: 70px;
    height: auto;

    @media (max-width: 800px) {
      width: 50px;
    }

    @media (max-width: 500px) {
      width: 30px;
    }

    path {
      fill: white;
    }
  }
`
const Title = styled.h2`
  ${p =>
    p.small &&
    `
    font-size: 24px;
  `} @media (max-width: 800px) {
    font-size: 20px;
  }
`
const Other = styled.div`
  height: 100%;
`
const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, ${p => (p.show ? 0.85 : 0)});
  z-index: ${p => (p.show ? 1000 : -1)};
  pointer-events: ${p => (p.show ? 'auto' : 'none')};
  transition: background-color ${baseTransition};
  transform: translateZ(51px);
`
const Popup = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(100vw - ${gutter * 2}px);
  height: calc((100vw - ${gutter * 2}px) * 0.5625);
  opacity: ${p => (p.show ? 1 : 0)};
  transform: translateZ(50px) translate(-50%, -50%)
    scale(${p => (p.show ? 1 : 0.6)});
  transition: opacity ${baseTransition}, transform ${baseTransition};
  transition-delay: 0.2s;
  background: #000;
  z-index: 300;

  iframe {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 1140px) {
    width: 1140px;
    height: calc(1140px * 0.5625);
  }
`

class MediaVideo extends React.Component {
  video = React.createRef()

  state = {
    videoShow: undefined,
  }

  componentDidMount() {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (isSafari) return
    Tilt.init(this.video.current, {
      max: 7,
      scale: 1.02,
    })
  }

  show = () => {
    this.setState({ videoShow: true })
  }

  close = () => {
    this.setState({ videoShow: false })
  }

  componentWillUnmount() {
    this.video.current.vanillaTilt && this.video.current.vanillaTilt.destroy()
  }

  render() {
    const {
      small,
      inGrid = false,
      data: { title, image, vimeoId, youtubeId },
    } = this.props
    const { videoShow } = this.state
    const Outer = inGrid ? Other : Grid

    return (
      <Section withMargin={!inGrid}>
        {videoShow && (
          <MediaVideoModal
            onClose={this.close}
            youtubeId={youtubeId}
            vimeoId={vimeoId}
          />
        )}
        <Outer>
          <Video small={small} onClick={this.show} ref={this.video}>
            <BgImage {...image} />
            <Content>
              <Title small={small}>{title}</Title>
              <Play small={small} />
            </Content>
          </Video>
        </Outer>
      </Section>
    )
  }
}

export default MediaVideo

import React from 'react'
import styled from 'styled-components'
import {
  sectionSpace,
  bgColor,
  gutter,
  scrollOffset,
  baseTransition,
  cleanShadow,
} from '../vars'
import Grid from './Grid'
import { Link } from 'gatsby'
import { renderBody } from '../render'
import get from 'lodash/get'
import Image from 'gatsby-image'
import Close from '../icons/Close'
import uiEmitter, { events } from '../uiEmitter'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 400;
  pointer-events: ${p => (p.show ? 'all' : 'none')};
  background: rgba(0, 0, 0, ${p => (p.show ? '0.75' : 0)});
  transition: transform ${baseTransition}, opacity ${baseTransition};
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`

const Wrapper = styled.div`
  position: relative;

  width: 100%;
  max-width: 840px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 410;
  pointer-events: none;
  z-index: 3;
  border-radius: 4px;

  @media (min-width: 840px) {
    padding: 10vh 0;
  }
`
const CloseArea = styled.div`
  span {
    display: none;
  }
  @media (max-width: 840px) {
    position: sticky;
    top: 0;
    left: 0;
    background: ${bgColor};
    height: 64px;
    display: flex;
    align-items: center;
    color: white;
    z-index: 500;
    span {
      display: block;
      color: white;
    }
  }

  #close {
    @media (max-width: 840px) {
      z-index: 123123123;
      right: 15px;
      top: 0px;
      position: fixed;
      background: ${bgColor};
      position: sticky;
      &:after,
      &:before {
        width: 80%;
      }
    }
  }
`

const Inner = styled.div`
  background: #fff;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: scale(${p => (p.show ? 1 : 0.98)});
  transition: transform ${baseTransition}, opacity ${baseTransition};
  color: #222;
  pointer-events: ${p => (p.show ? 'all' : 'none')};
  box-shadow: ${cleanShadow};

  @media (max-width: 840px) {
    min-height: 100vh;
  }
`

const ImageWrapper = styled.div``

const Title = styled.h2`
  color: #222;
`
const Body = styled.div`
  color: #222;
  margin-bottom: ${gutter * 2}px;

  p {
    font-size: 18px;
    margin-bottom: ${gutter}px;
  }
`
const Content = styled.div`
  padding: ${gutter * 2}px;
`
const IframeWrap = styled.div`
  margin-top: ${gutter}px;

  iframe {
    width: 100%;

    @media (min-width: 1140px) {
      height: calc(792px * 0.5625);
    }
  }
`

class Modal extends React.Component {
  inner = React.createRef()
  wrapper = React.createRef()
  state = { data: null }

  componentDidMount() {
    this.body = document.querySelector('body')
  }

  keyPress = event => {
    if (event.keyCode === 27) {
      this.hide()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.show()
        this.setState({
          data: this.props.data,
        })
      } else {
        this.hide()
        setTimeout(() => {
          this.setState({
            data: null,
          })
        }, 400)
      }
    }
  }

  show = () => {
    document.addEventListener('keydown', this.keyPress, false)
    this.body.style.overflow = 'hidden'
    // disableBodyScroll(this.wrapper.current)
    uiEmitter.emit(events.hideBurger)
  }

  componentWillUnmount() {
    this.hide()
    // clearAllBodyScrollLocks()
  }

  hide = e => {
    const target = get(e, 'target')

    if (target && this.inner.current.contains(target)) {
      return
    }

    // enableBodyScroll(this.wrapper.current)
    document.removeEventListener('keydown', this.keyPress, false)
    this.props.close()
    uiEmitter.emit(events.showBurger)
    this.body.style.overflow = 'visible'
  }

  render() {
    const { visible } = this.props
    const { data } = this.state
    const image = get(data, 'image')
    const title = get(data, 'title')
    const body = get(data, 'body')
    const youtube = get(data, 'youtubeId')
    const vimeoId = get(data, 'vimeoId')

    return (
      <Overlay show={visible} onClick={this.hide}>
        <Wrapper ref={this.wrapper} show={visible}>
          <Inner show={visible} ref={this.inner}>
            <CloseArea>
              <Close id="close" onClick={() => this.hide()} />
              <span onClick={() => this.hide()}>Close</span>
            </CloseArea>
            {image && (
              <ImageWrapper>
                <Image {...image} />
              </ImageWrapper>
            )}
            <Content>
              <Title>{title}</Title>
              {body && (
                <Body dangerouslySetInnerHTML={{ __html: renderBody(body) }} />
              )}
              {youtube && (
                <IframeWrap>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${youtube}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullscreen
                  />
                </IframeWrap>
              )}
              {vimeoId && (
                <IframeWrap>
                  <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}?color=ffffff&title=0"`}
                    width="560"
                    height="315"
                    frameborder="0"
                    webkitallowFullscreen
                    mozallowFullscreen
                    allowFullscreen
                  />
                </IframeWrap>
              )}
            </Content>
          </Inner>
        </Wrapper>
      </Overlay>
    )
  }
}
export default Modal

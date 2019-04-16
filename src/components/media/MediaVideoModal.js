import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gutter, baseTransition } from '../../vars'
import Close from '../../icons/Close'
import VideoYoutube from './VideoYoutube'
import VideoVimeo from './VideoVimeo'

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
    scale(${p => (p.show ? 1 : 0.8)});
  transition: opacity ${baseTransition}, transform ${baseTransition};
  transition-delay: 0.3s;
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

const MediaVideoModal = ({ onClose, youtubeId, vimeoId }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    document.querySelector('body').style.overflow = 'hidden'

    return () => {
      document.querySelector('body').style.overflow = 'auto'
    }
  }, [])

  const keyPress = event => {
    if (event.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyPress, false)

    return () => {
      document.removeEventListener('keydown', keyPress, false)
    }
  })

  return (
    <Overlay onClick={onClose} show={show}>
      <Popup show={show}>
        <Close onClick={onClose} />
        {show && youtubeId && <VideoYoutube id={youtubeId} />}
        {show && vimeoId && <VideoVimeo id={vimeoId} />}
      </Popup>
    </Overlay>
  )
}

export default MediaVideoModal

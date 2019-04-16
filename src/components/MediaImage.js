import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import posed from 'react-pose'
import styled from 'styled-components'
import { bgColor } from '../vars'

const Wrap = styled.div`
  max-width: 100%;
  max-height: 100%;
`

const Frame = styled(
  posed.div({
    init: {
      applyAtEnd: { display: 'none' },
      opacity: 0,
    },
    zoom: {
      applyAtStart: { display: 'block' },
      opacity: 1,
    },
  })
)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  background: ${bgColor};
  transform: translateZ(0);
`

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99],
}

const Elem = styled(
  posed.div({
    init: {
      position: 'static',
      width: 'auto',
      height: 'auto',
      transition,
      flip: true,
    },
    zoom: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition,
      flip: true,
      zIndex: 1111,
    },
  })
)`
  cursor: ${p => (p.isZoomed ? 'zoom-out' : 'zoom-in')};
  display: block;
  max-width: 100%;
  margin: auto;
`

const MediaImage = ({ data }) => {
  const [isZoomed, setZoom] = useState(false)
  const zoomOut = () => {
    setZoom(false)
    window.removeEventListener('scroll', zoomOut)
  }
  const zoomIn = () => {
    window.addEventListener('scroll', zoomOut)
    setZoom(true)
  }
  const toggleZoom = () => (!isZoomed ? zoomIn() : zoomOut())

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', zoomOut)
    }
  }, [])
  const pose = isZoomed ? 'zoom' : 'init'
  const { small, large } = data
  const target = isZoomed ? large : small

  return (
    <div>
      <Wrap
        // style={{ width: imageWidth, height: imageHeight }}
        onClick={toggleZoom}
      >
        <Frame pose={pose} className="frame" />
        <Elem isZoomed={isZoomed} pose={pose}>
          <Img {...target} />
        </Elem>
      </Wrap>
    </div>
  )
}

export default MediaImage

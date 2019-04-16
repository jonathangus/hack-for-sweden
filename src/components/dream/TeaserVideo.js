import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import teaserBg from './teaserbg.jpg'

const Video = styled.video`
  max-width: 100%;
  width: 100%;
  display: block;
  transition: transform 0.35s ease;
  background-size: 100% 100%;
  background-position: center;
  object-fit: cover;
  pointer-events: none;
`
const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  &:after {
    pointer-events: none;
    content: '';
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    /* Add more width */
    width: 120%;
    /* To form a square, the padding-bottom, needs to have the same value as the width property */
    padding-bottom: 120%;
    box-shadow: inset 0px 0px 150px 60px rgba(0, 0, 0, 0.8);
    border-radius: 50%;
  }
`
const Title = styled.h3`
  font-size: 20px;
  line-height: 1;
  color: white;
  @media (min-width: 800px) {
    font-size: 32px;
  }
`
const Content = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
`
const Role = styled.div`
  color: #cecece;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.6);
  margin-bottom: 14px;
  font-weight: bold;
`

const LinkInner = styled.a`
  display: block;
  height: 100%;
`

const TeaserVideo = ({ video }) => {
  const vid = useRef()
  useEffect(() => {
    vid.current.play()
  }, [])
  return (
    <Container>
      <LinkInner>
        {video.mp4Source && (
          <Video
            muted
            playsInline
            loop
            ref={vid}
            autoPlay={false}
            preload="auto"
            poster={teaserBg}
          >
            <source src={video.mp4Source} type="video/mp4" />
          </Video>
        )}

        <Content>
          <Title>{video.name}</Title>
          <Role>{video.role}</Role>
        </Content>
      </LinkInner>
    </Container>
  )
}
export default TeaserVideo

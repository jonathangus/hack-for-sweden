import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Grid from '../Grid'
import Solo from './Solo'
import SignupIntro from './SignupIntro'
import Team from './Team'
import windowsMovie from '../../videos/windows.mp4'

const Page = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;

  @media all and (-ms-high-contrast: none) {
    display: block;
  }

  > div {
    width: 100%;
  }
`

const Video = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: block;
  opacity: ${p => (p.done ? 1 : 0)};
  transition: opacity 0.3s ease;
  transition-delay: 0.7s;
  object-fit: cover;
  object-position: 50% 50%;

  @media (max-width: 400px) {
    transform: translateY(-104px);
    height: 131%;
  }
`

const Overlay = styled.div`
  z-index: 2;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: block;
  transition: opacity 0.3s ease;
  transition-delay: 0.7s;
  opacity: ${p => (p.done ? 1 : 0)};
  transition: opacity 0.3s ease;
  transition-delay: 0.7s;
  background: rgba(0, 0, 0, 0.4);
`

const SignupForm = () => {
  const [done, setSuccess] = useState(false)
  const [selectedType, setSelected] = useState()
  let inner = <SignupIntro onSelect={setSelected} />
  const video = useRef()

  const onSuccess = () => {
    setSuccess(true)
    video.current.play()
  }
  if (selectedType) {
    inner =
      selectedType === 'solo' ? (
        <Solo setSuccess={onSuccess} />
      ) : (
        <Team setSuccess={onSuccess} />
      )
  }

  return (
    <Page>
      <Grid>{inner}</Grid>
      <Overlay done={done} />
      <Video done={done} ref={video} preload="auto" loop playsInline muted>
        <source src={windowsMovie} type="video/mp4" />
      </Video>
    </Page>
  )
}

export default SignupForm

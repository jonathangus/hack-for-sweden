import React, { useEffect } from 'react'
import styled from 'styled-components'
import DreamVideos from './DreamVideos'
import uiEmitter, { events } from '../../uiEmitter'
import { gutter, titleFont, baseTransition } from '../../vars'
import { useLocale } from '../../localeContext'

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: none;
  z-index: 2;
`

const Center = styled.div`
  position: fixed;
  padding-top: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 325;
  text-align: center;

  @media (max-width: 800px) {
    width: 100%;
    padding: 0 ${gutter}px;
  }
`

const Title = styled.h1`
  color: rgb(255, 206, 85);
  background: #000;
`
const Text = styled.div`
  font-size: 26px;
  background: #000;
  margin-top: ${gutter * 2}px;

  @media (max-width: 800px) {
    font-size: 18px;
  }
`

const Button = styled.a`
  background-color: rgb(255, 206, 85);
  color: rgb(24, 24, 24);
  display: inline-block;
  margin-top: ${gutter * 3}px;
  font-family: ${titleFont};
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  padding: 14px 20px;
  border-radius: 30px;
  outline: none;
  transition: transform ${baseTransition};
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
  }
`
const DreamForSwedenHero = () => {
  useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])
  const t = useLocale()
  return (
    <div>
      <Overlay />
      <Center>
        <Title>Dream for Sweden</Title>
        <Text>{t('dream.text')}</Text>
        <Button href="https://www.dreamforsweden.com/" target="_blank">
          {t('dream.link')}
        </Button>
      </Center>
      <DreamVideos />
    </div>
  )
}

export default DreamForSwedenHero

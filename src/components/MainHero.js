import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { bgHero, gutter } from '../vars'
import uiEmitter, { events } from '../uiEmitter'
import HackerTitle from './HackerTitle'
import Grid from './Grid'
import AnimateIns from './AnimateIns'
import isMobile from 'ismobilejs'
import { Link } from 'gatsby'
import BorderButton from './BorderButton'
import { useLocale } from '../localeContext'

const Header = styled.header`
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url(${p => p.bg});
  background-size: cover;
  background-position: center;

  &:before {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    content: '';
    z-index: 5;
  }

  &:after {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 50%, ${bgHero} 100%);
    content: '';
    z-index: 5;
  }
`

const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  text-align: center;
  padding: 0 20px;
`
const Button = styled.div`
  margin-top: ${gutter * 2}px;
`

const MainHero = ({ title, text, data, posterImage }) => {
  const container = useRef()

  const onAnimateDone = () => {
    uiEmitter.emit(events.heroLoaded)
  }

  console.log(posterImage.fluid.src)
  const t = useLocale()

  return (
    <Header ref={container} bg={posterImage.fluid.src}>
      <Grid>
        <Content>
          <AnimateIns onDone={onAnimateDone}>
            <HackerTitle title={title} />
            <Button>
              <BorderButton to={'/almedalen'}>
                {t('almedalenTitle')}
              </BorderButton>
            </Button>
          </AnimateIns>
        </Content>
      </Grid>
    </Header>
  )
}
export default MainHero

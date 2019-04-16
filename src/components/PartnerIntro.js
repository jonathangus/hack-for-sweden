import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import HackerTitle from './HackerTitle'
import uiEmitter, { events } from '../uiEmitter'
import Grid from './Grid'
import AnimteIns from './AnimateIns'
import { gutter, bgColor, bgHero, paragraphBottom } from '../vars'
import Rellax from 'rellax'
import Img from 'gatsby-image'
import { renderBody } from '../render'
import BgImage from './BgImage'
import BorderButton from './BorderButton'
import { useLocale } from '../localeContext'

const height = '90vh'

const Container = styled.section`
  position: relative;
  overflow: hidden;

  ${BgImage} {
    height: ${height};
    position: absolute !important;

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
  }
`
const Content = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 30;
  padding-top: 55vh;
  font-size: 22px;

  ul,
  h3,
  p {
    margin-bottom: ${paragraphBottom}px;
  }

  ul {
    padding-left: 70px;
  }
  h1 {
    text-align: center;
    margin-bottom: ${gutter * 5}px;
  }
`

const Text = styled.div``
const Bottom = styled.div``

const ImageIntro = props => {
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState()
  const img = useRef()

  useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])

  const { title, body, image } = props
  const t = useLocale()

  return (
    <Container>
      <BgImage sizes={image.sizes} />
      <Grid>
        <Content>
          <AnimteIns>
            <HackerTitle title={title} />
            <Text dangerouslySetInnerHTML={{ __html: renderBody(body) }} />
          </AnimteIns>
        </Content>
      </Grid>
    </Container>
  )
}

export default ImageIntro

import React from 'react'
import styled from 'styled-components'
import HackerTitle from './HackerTitle'
import uiEmitter, { events } from '../uiEmitter'

import Grid from './Grid'
import AnimteIns from './AnimateIns'
import { gutter, bgColor } from '../vars'
import Rellax from 'rellax'
import Img from 'gatsby-image'
import { body } from '../render'
import Reveal from './Reveal'
import isMobile from 'ismobilejs'

const Container = styled.section`
  @media (min-width: 800px) {
    padding: 20vh 0;
  }
`
const Wrapper = styled.div`
  position: relative;
  padding-top: 20vh;
  padding-bottom: 10vh;

  @media (min-width: 800px) {
    padding: 20vh 0;
  }

  h1 {
    white-space: pre;
  }
`
const ImageWrap = styled.div`
  right: 0;
  top: 50%;
  max-width: ${p => p.imageWidth}px;
  width: 100%;

  @media (min-width: 800px) {
    transform: translateY(-50%);
    position: absolute;
  }
`
const Image = styled(Img)`
  width: 100%;
  height: auto;
`

const ImageStatic = styled.img`
  width: 100%;
  height: auto;
`

const Text = styled.p`
  font-size: 20px;
  margin-top: ${gutter * 2}px;

  @media (max-width: 800px) {
    margin-bottom: ${gutter}px;
  }
`

const Left = styled.div`
  max-width: 400px;
  position: relative;
  z-index: 5;
  transition: transform 0.45s ease, opacity 0.45s ease;
  opacity: ${p => (p.hide ? 0 : 1)};
  transform: translateY(${p => (p.hide ? -15 : 0)}px);
`

class ImageIntro extends React.Component {
  state = { show: false, hide: undefined }
  img = React.createRef()

  show = () => {
    this.setState({ show: true })
    setTimeout(() => {
      uiEmitter.emit(events.heroLoaded)
    }, 200)
  }

  componentDidMount() {
    const speed = isMobile.any ? -0.5 : -2
    this.imgRelax = new Rellax(this.img.current, {
      speed,
    })
  }

  componentWillUnmount() {
    this.imgRelax.destroy()
  }

  animOut = () => {
    this.setState({ hide: true, show: false })
    setTimeout(() => {
      uiEmitter.emit(events.pageTransitionDone)
    }, 700)
  }

  render() {
    const { title, text, image, imageWidth = 740 } = this.props
    const { show, hide } = this.state

    return (
      <Container>
        <Grid>
          <Wrapper>
            <Left hide={hide}>
              <AnimteIns onDone={this.show}>
                <HackerTitle className="u-opacity" title={title} />
                <Text dangerouslySetInnerHTML={{ __html: body(text) }} />
              </AnimteIns>
            </Left>
            <ImageWrap imageWidth={imageWidth}>
              <Reveal innerRef={this.img} show={show}>
                <Image critical {...image} />
              </Reveal>
            </ImageWrap>
          </Wrapper>
        </Grid>
      </Container>
    )
  }
}

export default ImageIntro

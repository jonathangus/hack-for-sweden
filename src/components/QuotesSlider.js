import React from 'react'
import styled from 'styled-components'
import {
  sectionSpace,
  bgColor,
  gutter,
  scrollOffset,
  baseTransition,
} from '../vars'
import Grid from './Grid'
import get from 'lodash/get'
import scrollMonitor from 'scrollmonitor'
import Image from 'gatsby-image'
import { renderBody } from '../render'

const Container = styled.footer`
  padding: ${sectionSpace} 0;

  @media (min-width: 800px) {
    margin-top: 100px;
  }
`

const breakp = '900px'

const percBg = '60%'
const shadowEnd = `rgba(0, 1,15 ,1) 100%`
const Wrapper = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`

const Part = styled.div`
  position: absolute;
  opacity: ${p => (p.show ? 1 : 0)};
  pointer-events: ${p => (p.show ? 'auto' : 'none')};
  transition: opacity ${baseTransition}, transform ${baseTransition};
  transform: translateY(${p => (p.show ? 0 : -10)}px);
  width: 100%;

  @media (min-width: ${breakp}) {
    padding-left: 220px;
  }
`
const Title = styled.h2`
  @media (max-width: 800px) {
    font-size: 26px;
  }

  @media (max-width: 500px) {
    font-size: 22px;
  }
  p {
    &:before {
      content: '"';
    }

    &:after {
      content: '"';
    }
  }
`
const Author = styled.div``

const Bar = styled.div`
  width: ${p => (p.on ? 100 : 50)}px;
  opacity: ${p => (p.on ? 1 : 0.6)};
  margin: 0 8px;
  padding: 20px 0;
  cursor: pointer;
  transition: width ${baseTransition}, transform ${baseTransition};
`

const BarInner = styled.div`
  height: 4px;
  background: white;
`

const Progress = styled.div`
  display: flex;
  margin-top: ${gutter * 4}px;
  justify-content: center;
`

const ImageWrap = styled.div`
  overflow: hidden;
  margin-left: 10px;
  width: 100px;
  left: 0;
  position: relative;
  margin-top: ${gutter}px;

  @media (min-width: ${breakp}) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 180px;
    margin-top: 0;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  &:before {
    background: linear-gradient(to left, transparent ${percBg}, ${shadowEnd});
  }
  &:after {
    background: linear-gradient(transparent ${percBg}, ${shadowEnd});
  }
`
const AuthorWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`
const Inner = styled.div`
  position: relative;
  z-index: 2;
`
const ImageShadow = styled.div`
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  &:before {
    background: linear-gradient(to right, transparent ${percBg}, ${shadowEnd});
  }
  &:after {
    background: linear-gradient(to top, transparent ${percBg}, ${shadowEnd});
  }
`

const ImageForground = styled.div``

const TOTAL_TIME = 5000

class QuotesSlider extends React.Component {
  container = React.createRef()

  state = {
    selected: 0,
    progress: 0,
  }

  componentDidMount() {
    this.watcher = scrollMonitor.create(this.container.current, scrollOffset)
    this.watcher.enterViewport(() => {
      this.watcher.destroy()
      this.start()
    })
  }

  componentWillUnmount() {
    this.watcher.destroy()
    this.timerId && clearTimeout(this.timerId)
  }

  go = selected => {
    this.setState({ selected })
    this.start()
  }

  bump = () => {
    const time = TOTAL_TIME / 100

    if (this.progressTimer) {
      clearTimeout(this.timerId)
    }
  }

  start = () => {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }

    this.timerId = setTimeout(() => {
      const { selected } = this.state
      let newIndex = selected + 1
      if (!this.props.quotes[newIndex]) {
        newIndex = 0
      }
      this.go(newIndex)
    }, TOTAL_TIME)
  }

  getQuote = (item, i) => {
    const { selected } = this.state
    const show = i === selected
    const image = get(item, 'node.image')

    return (
      <Part show={show} key={i}>
        <Inner>
          <Title
            dangerouslySetInnerHTML={{
              __html: renderBody(get(item, 'node.quote')),
            }}
          />
          <AuthorWrap>
            <Author
              dangerouslySetInnerHTML={{
                __html: renderBody(get(item, 'node.author')),
              }}
            />
          </AuthorWrap>
        </Inner>
        <ImageWrap>
          <ImageShadow />
          <ImageForground>{image && <Image {...image} />}</ImageForground>
        </ImageWrap>
      </Part>
    )
  }

  onMouseOver = () => {
    clearTimeout(this.timerId)
  }

  onMouseLeave = () => {
    this.start()
  }

  getProg = (item, i) => {
    const { selected } = this.state
    const on = i === selected

    return (
      <Bar onClick={() => this.go(i)} on={on} key={i}>
        <BarInner />
      </Bar>
    )
  }

  render() {
    const { quotes } = this.props
    return (
      <Container ref={this.container}>
        <Grid onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
          <Wrapper>{quotes.map(this.getQuote)}</Wrapper>
          <Progress>{quotes.map(this.getProg)}</Progress>
        </Grid>
      </Container>
    )
  }
}
export default QuotesSlider

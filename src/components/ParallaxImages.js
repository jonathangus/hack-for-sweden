import React from 'react'
import styled from 'styled-components'
import Grid from './Grid'
import debounce from 'lodash/debounce'
import { findDOMNode } from 'react-dom'
import Rellax from 'rellax'
import LazyImage from './LazyImage'
import get from 'lodash/get'
import Image from 'gatsby-image'
import ismobile from 'ismobilejs'
import Reveal from './Reveal'
import scrollMonitor from 'scrollmonitor'
import { scrollOffset } from '../vars'

const Section = styled.section`
  padding: 5vh 0;
`
const Inner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`

const Item = styled.div`
  &:nth-child(1) {
    grid-column: 1 / span 8;
    grid-row: 1 / span 4;
  }

  &:nth-child(2) {
    grid-column: 7 / span 4;
    grid-row: 2 / span 4;
  }

  &:nth-child(3) {
    grid-column: 6 / span 4;
    grid-row: 5 / span 5;
  }
`

class ParallaxImages extends React.Component {
  images = [React.createRef(), React.createRef(), React.createRef()]
  rellaxers = []
  container = React.createRef()

  state = { show: false }

  componentDidMount() {
    // console.log(this.container.current)
    // this.watcher = scrollMonitor.create(this.container.current, scrollOffset)
    // this.watcher.enterViewport(() => {
    //   this.watcher.destroy()
    //   this.setState({ show: true })
    // })

    if (ismobile.any) return

    const sizes = [-1, -0, -0]

    this.images.forEach((ref, index) => {
      this.setImgListener(ref, sizes[index])
    })
  }

  componentWillUnmount() {
    this.rellaxers.forEach(r => r.destroy())
    // this.watcher.destroy()
  }

  setImgListener(target, speed) {
    const rellax = new Rellax(findDOMNode(target.current), {
      speed,
    })
    this.rellaxers.push(rellax)
  }

  render() {
    const { images = [] } = this.props
    const { show } = this.state

    return (
      <Section>
        <Grid>
          <Inner ref={this.container}>
            {images.map((image, index) => (
              <Item key={index} ref={this.images[index]}>
                <Image {...image} />
              </Item>
            ))}
          </Inner>
        </Grid>
      </Section>
    )
  }
}

export default ParallaxImages

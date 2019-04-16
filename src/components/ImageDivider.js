import React from 'react'
import scrollMonitor from 'scrollmonitor'
import styled from 'styled-components'
import { bgHero } from '../vars'
import image from '../images/divider.jpg'
import anime from 'animejs'

const Container = styled.section`
  position: relative;
  height: 350px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  margin: 5vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h3`
  font-size: 40px;
  color: white;
`

class ImageDivider extends React.Component {
  text = React.createRef()

  componentDidMount() {
    this.watcher = scrollMonitor.create(this.text.current, -200)

    this.watcher.enterViewport(() => {
      this.watcher.destroy()

      anime({
        targets: this.text.current,
        easing: 'easeOutElastic',
        translateY: ['80%', '0%'],
        opacity: ['0', '1'],
      })
    })
  }

  componentWillUnmount() {
    this.watcher.destroy()
  }

  render() {
    const { data } = this.props

    return (
      <Container image={image}>
        <Title className="u-opacity" ref={this.text}>
          We ❤️ open data
        </Title>
      </Container>
    )
  }
}

export default ImageDivider

import React from 'react'
import styled from 'styled-components'
import { bgColor } from '../vars'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`
const ANIMATION_LENGTH = 750
const Bo = styled.div`
  transform: scaleY(${p => (p.show ? 0 : 1)});
  transform-origin: bottom;
  position: absolute;
  z-index: 5;
  background: ${bgColor};
  width: 100%;
  height: 100%;
  transition: transform ${ANIMATION_LENGTH}ms ease;
`

class Reveal extends React.Component {
  static defaultProps = {
    onReveal: () => {},
  }

  componentDidMount() {
    const { onReveal, delay } = this.props
    setTimeout(onReveal, ANIMATION_LENGTH + delay)
  }

  render() {
    const { show, children, delay = 0, innerRef } = this.props
    return (
      <Wrapper ref={innerRef}>
        <Bo
          className="js-reveal js-transform"
          style={{ transitionDelay: `${delay}ms` }}
          show={show}
        />
        {children}
      </Wrapper>
    )
  }
}

export default Reveal

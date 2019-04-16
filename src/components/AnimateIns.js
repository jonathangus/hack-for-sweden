import React from 'react'
import styled from 'styled-components'
import { gutter, titleFont, dark, scrollOffset } from '../vars'
import { Link } from 'gatsby'
import scrollMonitor from 'scrollmonitor'

const DELAY_IN_MS = 200
const Wrapper = styled.div``
const Part = styled.div`
  transition: transform 0.45s ease, opacity 0.45s ease;
  transform: translateY(${p => (p.show ? 0 : 30)}px);
  opacity: ${p => (p.show ? 1 : 0)};
`

class AnimateIns extends React.Component {
  container = React.createRef()

  state = {
    show: false,
  }

  componentDidMount() {
    const { onDone = () => {}, children } = this.props

    this.watcher = scrollMonitor.create(this.container.current, scrollOffset)
    this.watcher.enterViewport(() => {
      this.watcher.destroy()
      this.setState({ show: true }, () => {
        const timeout = React.Children.count(children) * DELAY_IN_MS
        setTimeout(onDone, timeout)
      })
    })
  }

  componentWillUnmount() {
    this.watcher.destroy()
  }

  render() {
    const { children } = this.props
    const { show } = this.state

    const nodes = React.Children.map(children, (child, i) => (
      <Part
        show={show}
        style={{ transitionDelay: `${i * DELAY_IN_MS}ms` }}
        className="js-reset"
        key={i}
      >
        {child}
      </Part>
    ))

    return <Wrapper ref={this.container}>{nodes}</Wrapper>
  }
}

export default AnimateIns

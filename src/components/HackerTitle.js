import React from 'react'
import styled from 'styled-components'
import scrollMonitor from 'scrollmonitor'
import { scrollOffset } from '../vars'
import anime from 'animejs'

const H1 = styled.h1`
  line-height: 1;
  text-shadow: 4px 0px 4px rgba(0, 0, 0, 0.26);
`
const H2 = styled.h2`
  @media (min-width: 700px) {
    white-space: pre;
  }
`

const Letter = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  // transform: translateY(${p => (p.show ? 0 : '100%')});
`

const Word = styled.div`
  display: inline-block;
`

const LETTER_MS_DELAY = 30

const chars = ['$', '%', '#', '@', '&', '(', ')', '=', '*', '/']
const charsTotal = chars.length
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

class HackerTitle extends React.Component {
  title = React.createRef()

  state = {
    show: false,
  }

  timeouts = []
  initial = []
  complete = false
  cnt = 0
  lastLag

  componentDidMount() {
    const el = this.title.current
    this.letters = Array.from(el.querySelectorAll('span')).sort(
      () => 0.5 - Math.random()
    )
    this.initial = this.letters.map(l => l.innerHTML)
    this.lettersTotal = this.letters.length
    // this.letters.forEach((letter, pos) => this.charAnim(letter, pos, false))
    this.watcher = scrollMonitor.create(this.title.current, scrollOffset)
    this.watcher.enterViewport(() => {
      // this.anim()
      this.watcher.destroy()
      this.addLag()
    })
  }

  componentWillUnmount() {
    clearTimeout(this.latTimeout)
    this.watcher.destroy()
  }

  anim = () => {
    const targets = this.title.current.querySelectorAll('span')

    this.setState({
      show: true,
    })

    const delay = this.lettersTotal * LETTER_MS_DELAY + 300
    setTimeout(() => {
      const num = Math.round(this.lettersTotal / 10)
      this.addLag()
    }, delay)
  }

  charAnim = (letter, pos, useTimeout = true) => {
    const initial = letter.innerHTML
    const initialColor = this.props.color
    let loopTimeout

    const loop = () => {
      const value = chars[getRandomInt(0, charsTotal - 1)]
      letter.innerHTML = value
      // letter.style.color = ['#2c0baf', '#03a9f4', '#062d86'][getRandomInt(0, 2)]

      if (useTimeout) {
        loopTimeout = setTimeout(loop, getRandomInt(75, 150))
        this.timeouts.push(loopTimeout)
      }
    }
    loop()

    const renderLetter = () => {
      clearTimeout(loopTimeout)
      letter.innerHTML = this.initial[pos]
      // letter.style.color = initialColor

      if (useTimeout) {
        ++this.cnt
        if (this.cnt === this.lettersTotal) {
          this.complete = true
        }
      }
    }

    if (useTimeout) {
      const timeout = setTimeout(renderLetter, pos * 80 + 400)

      this.timeouts.push(timeout)
    }
  }

  enter = () => {
    this.letters.forEach(this.charAnim)
  }

  addLag = delay => {
    const lag = () => {
      const pos = getRandomInt(0, this.letters.length - 1)
      if (pos === this.lastLag) {
        return lag()
      }

      this.lastLag = pos
      const letter = this.letters[pos]
      this.charAnim(letter, pos)

      this.latTimeout = setTimeout(() => {
        lag()
      }, getRandomInt(2000, 6000))
    }

    this.latTimeout = setTimeout(() => {
      lag()
    }, getRandomInt(2000, 6000))
  }

  render() {
    const { title, as = 'h1', prefix, suffix } = this.props

    const headlines = {
      h1: H1,
      h2: H2,
    }
    const Component = headlines[as]
    const letters = title.split(' ').map(word => (
      <React.Fragment key={word}>
        <Word>
          {word.split('').map((str, i) => (
            <Letter
              show={this.state.show}
              style={{ transitionDelay: `${i * LETTER_MS_DELAY}ms` }}
              key={i}
            >
              {str || '&nbsp;'}
            </Letter>
          ))}
        </Word>
        &nbsp;
      </React.Fragment>
    ))

    return (
      <Component ref={this.title}>
        {prefix}
        {letters}
        {suffix}
      </Component>
    )
  }
}

export default HackerTitle

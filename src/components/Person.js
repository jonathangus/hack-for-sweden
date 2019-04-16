import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { gutter, sectionSpace, cleanShadow, scrollOffset } from '../vars'
import Grid from './Grid'
import get from 'lodash/get'
import HackerTitle from './HackerTitle'
import AnimateIns from './AnimateIns'
import Tilt from 'vanilla-tilt'
import BgImage from './BgImage'
import scrollMonitor from 'scrollmonitor'

const Content = styled.div`
  position: absolute;
  z-index: 5;
  left: 0;
  padding: ${gutter}px;
  bottom: 0;
  transition: transform 0.25s ease;
  transform: translateZ(20px);

  span {
    word-break: break-word;
  }

  @media (max-width: 650px) {
    padding: ${p => (p.prio ? gutter : 2)}px ${gutter}px;
  }

  @media (max-width: 450px) {
    padding: ${p => (p.prio ? gutter : 2)}px ${gutter}px;
  }
`

const Item = styled.div`
  display: block;
  background-color: #2c2c2c;
  box-shadow: ${cleanShadow};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 0.4s ease;
  margin-bottom: 0;
  transform-style: preserve-3d;
  color: white;
  &:after {
    position: absolute;
    bottom: -1px;
    top: -1px;
    left: -1px;
    right: -1px;
    display: block;

    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.84) 100%);
    content: '';
    opacity: 1;

    @media (max-width: 650px) {
      background: rgba(0, 0, 0, 0.34);
    }
  }
`

const MailTo = styled.div`
  display: block;
  position: relative;
  z-index: 5;

  &:hover {
    text-decoration: underline;
  }
`

class Person extends React.Component {
  container = React.createRef()

  state = {
    show: undefined,
  }

  componentDidMount() {
    this.watcher = scrollMonitor.create(this.container.current, scrollOffset)

    this.watcher.enterViewport(() => {
      this.watcher.destroy()

      this.setState({
        show: true,
      })
    })

    Tilt.init(this.container.current, {
      max: 16,
      scale: 1.05,
    })
  }

  componentWillUnmount() {
    this.container.current.vanillaTilt &&
      this.container.current.vanillaTilt.destroy()

    this.watcher.destroy()
  }

  render() {
    const { person, prio } = this.props
    const id = get(person, 'node.id')
    const name = get(person, 'node.name')
    const email = get(person, 'node.email')
    const image = get(person, 'node.image')
    const company = get(person, 'node.company')
    const role = get(person, 'node.role')
    const companyWebsite = get(person, 'node.companyWebsite')

    const as = email ? 'a' : 'div'

    return (
      <Item
        as={as}
        href={`mailto:${email}`}
        show={this.state.show}
        ref={this.container}
        key={id}
        prio={prio}
        email={email}
      >
        {image && <BgImage {...image} />}
        <Content prio={prio}>
          <h3>{name}</h3>
          <span>{[role, company].filter(Boolean).join(', ')}</span>
          {email && <MailTo>{email}</MailTo>}
        </Content>
      </Item>
    )
  }
}

export default Person

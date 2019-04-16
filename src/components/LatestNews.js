import React from 'react'
import styled from 'styled-components'
import Grid from './Grid'
import {
  base,
  borderColor,
  gutter,
  titleColor,
  cleanShadow,
  scrollOffset,
} from '../vars'
import get from 'lodash/get'
import Image from 'gatsby-image'
import scrollMonitor from 'scrollmonitor'
import HackerTitle from './HackerTitle'
import AnimateIns from './AnimateIns'
import BgImage from './BgImage'
import Modal from './Modal'
import { LocaleContextConsumer } from '../localeContext'

const Section = styled.section`
  padding: 10vh 0;
`

const Content = styled.div`
  position: absolute;
  z-index: 5;
  left: 0;
  padding: ${gutter}px;
  bottom: 0;
  transition: transform 0.25s ease;
`

const Part = styled.div`
  background-color: #2c2c2c;
  box-shadow: ${cleanShadow};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: translateY(30px);
  margin-bottom: 0;

  @media (max-width: 800px) {
    margin-bottom: ${gutter}px;
  }

  &:nth-child(1) {
    grid-row-start: 1;
    grid-row-end: 12;
    grid-column-start: 1;
    grid-column-end: 13;
  }

  &:nth-child(2) {
    grid-row-start: 1;
    // grid-row-end: 10;
    grid-row-end: 19;
    grid-column-start: 13;
    grid-column-end: 19;
  }

  &:nth-child(3) {
    grid-row-start: 12;
    grid-row-end: 19;
    grid-column-start: 1;
    grid-column-end: 7;
  }

  &:nth-child(4) {
    grid-row-start: 12;
    grid-row-end: 19;
    grid-column-start: 7;
    grid-column-end: 13;
  }

  &:nth-child(5) {
    grid-row-start: 10;
    grid-row-end: 19;
    grid-column-start: 13;
    grid-column-end: 19;
  }

  &:after {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.64) 100%);
    content: '';
    transition: opacity 0.3s ease;
    opacity: 0.6;
  }

  &:hover {
    ${Content} {
      transform: translateY(-10px);
    }
    &:after {
      opacity: 1;
    }
  }
`

const Wrapper = styled.div`
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(18, 1fr);
  grid-row-gap: 14px;
  grid-column-gap: 14px;

  @media (min-width: 800px) {
    display: grid;
    height: 700px;
  }

  @media all and (-ms-high-contrast: none) {
    height: auto;
  }

  ${Part} {
    opacity: ${props => (props.visible ? 1 : 0)};
    transform: translateY(${props => (props.visible ? 0 : 30)}px);
  }
`

const Title = styled.h3`
  color: white;
`

class LatestNews extends React.Component {
  container = React.createRef()

  state = {
    visible: false,
    selected: null,
  }

  componentDidMount() {
    this.watcher = scrollMonitor.create(this.container.current, scrollOffset)

    this.watcher.enterViewport(() => {
      this.watcher.destroy()

      this.setState({
        visible: true,
      })
    })
  }

  componentWillUnmount() {
    this.watcher.destroy()
  }

  setModal = item => {
    this.setState({ selected: item.node })
  }

  getPart = (item, index) => {
    const sizes = get(item, 'node.image.sizes')
    const image = get(item, 'node.image')

    return (
      <Part
        style={{ transitionDelay: `${index * 0.15}s` }}
        className="u-opacity"
        key={get(item, 'node.id')}
        onClick={() => this.setModal(item)}
      >
        {image && <BgImage {...image} />}
        <Content>
          <Title>{get(item, 'node.title')}</Title>
        </Content>
      </Part>
    )
  }

  render() {
    const { news } = this.props
    const { selected } = this.state

    return (
      <LocaleContextConsumer>
        {t => (
          <Section>
            <Modal
              close={() => this.setState({ selected: null })}
              visible={Boolean(selected)}
              data={selected}
            />
            <Grid>
              <AnimateIns>
                <HackerTitle
                  as="h2"
                  color={titleColor}
                  title={t('news.title')}
                />
              </AnimateIns>
              <Wrapper ref={this.container} visible={this.state.visible}>
                {news.map(this.getPart)}
              </Wrapper>
            </Grid>
          </Section>
        )}
      </LocaleContextConsumer>
    )
  }
}

export default LatestNews

import React from 'react'
import styled from 'styled-components'
import {
  gutter,
  dark,
  secondaryColor,
  scrollOffset,
  sectionSpace,
  bgColor,
} from '../vars'
import Grid from './Grid'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Reveal from './Reveal'
import AnimateIns from './AnimateIns'
import HackerTitle from './HackerTitle'
import BorderButton from './BorderButton'
import { StaticQuery, graphql } from 'gatsby'
import { LocaleContextConsumer } from '../localeContext'

const Logo = styled(Img)`
  width: 70px;
  height: 35px;
  justify-self: center;

  @media all and (-ms-high-contrast: none) {
    margin-right: ${gutter}px;
    margin-bottom: ${gutter}px;
  }

  @media (min-width: 800px) {
    width: 120px;
    height: 60px;
  }

  transition: transform 0.45s ease, opacity 0.45s ease;
  transform: translateY(${p => (p.show ? 0 : 10)}px);
  opacity: ${p => (p.show ? 1 : 0)};

  img {
    max-width: 100%;
    // max-height: 60px;
    object-fit: contain !important;
  }
`

const Container = styled.section`
  background: white;
  margin: ${sectionSpace} 0;
  color: #000;
  position: relative;
  padding-top: 1px;
`

const Inner = styled.div`
  padding: ${gutter * 3}px 0;
`

const Part = styled.div`
  // padding: ${gutter * 3}px 0;
  text-align: center;
  h2 {
    color: ${dark};
  }
`

const Bottom = styled.div`
  text-align: center;
`
const DELAY_IN_MS = 30
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${gutter}px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  grid-row-gap: ${gutter}px;
  grid-column-gap: ${gutter * 2}px;

  @media (min-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-row-gap: ${gutter * 2}px;
    grid-column-gap: ${gutter * 4}px;
    padding: ${gutter * 3}px;
  }
`

const ANIMATION_LENGTH = 750

const Overlay = styled.div`
  transform: scaleY(${p => (p.show ? 0 : 1)});
  transform-origin: bottom;
  position: absolute;
  z-index: 5;
  background: ${bgColor};
  width: 100%;
  height: 100%;
  transition: transform ${ANIMATION_LENGTH}ms ease;
`

class PartnerDivider extends React.Component {
  container = React.createRef()

  state = {
    show: undefined,
  }
  componentDidMount() {
    const { children } = this.props

    this.watcher = scrollMonitor.create(
      this.container.current,
      -(window.outerHeight / 3)
    )
    this.watcher.enterViewport(() => {
      this.watcher.destroy()
      this.setState({ show: true })
    })
  }

  componentWillUnmount() {
    this.watcher.destroy()
  }

  getPart = (partners, title) => {
    const { show } = this.state

    const items = partners.map((p, i) => (
      <Logo
        show={show}
        className="js-reset"
        style={{ transitionDelay: `${i * DELAY_IN_MS}ms` }}
        key={i}
        fadeIn={false}
        critical
        backgroundColor={'white'}
        {...get(p, 'node.childImageSharp', {})}
      />
    ))

    return (
      <Part>
        <HackerTitle title={title} as="h2" />
        <Wrapper>{items}</Wrapper>
      </Part>
    )
  }

  render() {
    const { eventPartners, colabPartners, link = true } = this.props
    const { show } = this.state

    return (
      <LocaleContextConsumer>
        {t => (
          <Container ref={this.container}>
            <Inner>
              <AnimateIns>
                {this.getPart(eventPartners, t('partner.colab'))}
                {this.getPart(colabPartners, t('partner.event'))}
                {link && (
                  <Bottom>
                    <BorderButton
                      active="white"
                      color={secondaryColor}
                      to="/partner"
                    >
                      {t('readmore.partner')}
                    </BorderButton>
                  </Bottom>
                )}
              </AnimateIns>
            </Inner>
          </Container>
        )}
      </LocaleContextConsumer>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        eventPartners: allFile(
          filter: { sourceInstanceName: { eq: "event-partners" } }
        ) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 220, quality: 95) {
                  ...GatsbyImageSharpFluid_withWebp
                  aspectRatio
                }
              }
            }
          }
        }

        colabPartners: allFile(
          filter: { sourceInstanceName: { eq: "colab-partners" } }
        ) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 220, quality: 95) {
                  ...GatsbyImageSharpFluid_withWebp
                  aspectRatio
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <PartnerDivider
        {...props}
        colabPartners={get(data, 'eventPartners.edges', [])}
        eventPartners={get(data, 'colabPartners.edges', [])}
      />
    )}
  />
)

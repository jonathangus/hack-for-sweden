import React, { useEffect, useState } from 'react'
import Grid from '../Grid'
import styled from 'styled-components'
import logo from './logo.jpg'
import { useLocale } from '../../localeContext'
import {
  sectionSpace,
  swedenBlue,
  baseTransition,
  swedenYellow,
  cleanShadow,
  gutter,
} from '../../vars'
import AnimateIns from '../AnimateIns'
import uiEmitter, { events } from '../../uiEmitter'

const Wrapper = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: center;

  @media (min-width: 800px) {
    height: 100vh;
    margin-top: 50px;
  }
  @media (max-width: 800px) {
    margin-top: 100px;
  }
`
const Inner = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: center;

  @media (max-width: 800px) {
    display: block;
  }
`
const Logo = styled.div`
  flex: 1;
  text-align: center;
`
const LogoImg = styled.img`
  display: block;
  border: 5px solid white;
  border-radius: 50%;
  overflow: hidden;
  max-width: 350px;
  margin: 0 auto;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: translateZ(0) scale(${p => (p.show ? 1 : 0.8)});
  transition: opacity ${baseTransition}, transform ${baseTransition};

  @media (max-width: 800px) {
    max-width: 200px;
    margin-bottom: ${gutter * 3}px;
  }
`
const Right = styled.div`
  flex: 1;
`
const Bottom = styled.div`
  font-size: 20px;
  color: ${swedenBlue};
  padding-top: ${gutter * 6}px;
  -webkit-backface-visibility: hidden;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: translateY(${p => (p.show ? '0px' : '-5px')});
  transition: all 0.3s ease;
  @media (max-width: 800px) {
    line-height: 2;

    padding-top: ${gutter * 3}px;
  }
`

const Title = styled.h2`
  font-weight: normal;
  font-size: 60px;
  color: ${swedenBlue};
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 0.8s, transform ${baseTransition};

  @media (max-width: 800px) {
    font-size: 38px;
  }
`

const InnovationWeekHero = () => {
  const [show, setShow] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const t = useLocale()
  const headlines = [
    t('innovationWeekHeadline1'),
    t('innovationWeekHeadline2'),
    t('innovationWeekHeadline3'),
  ]

  useEffect(() => {
    setShowLogo(true)

    setTimeout(() => {
      setShow(true)
    }, 300)
    setTimeout(() => {
      setShowAll(true)
      window.requestAnimationFrame(() => {
        uiEmitter.emit(events.heroLoaded)
      })
    }, 2600)
  }, [])

  return (
    <Wrapper>
      <Grid>
        <Inner>
          <Logo>
            <LogoImg show={showLogo} src={logo} />
          </Logo>
          <Right>
            {headlines.map((text, i) => (
              <Title
                style={{ transitionDelay: `${i * 800}ms` }}
                show={show}
                key={i}
              >
                {text}
              </Title>
            ))}
          </Right>
        </Inner>
        <Bottom
          show={showAll}
          dangerouslySetInnerHTML={{ __html: t('innovationWeekIntro') }}
        />
      </Grid>
    </Wrapper>
  )
}

export default InnovationWeekHero

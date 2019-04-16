import React, { useState, useEffect, useRef } from 'react'
import { useLocale } from '../../localeContext'
import SectionScroll from '../SectionScroll'
import styled from 'styled-components'
import categories from './winnerSections'
import { gutter, baseTransition, baseTransitionMs } from '../../vars'
import HackerTitle from '../HackerTitle'
import { Grid, Cell } from 'styled-css-grid'
import BgImage from '../BgImage'
import Reveal from '../Reveal'
import uiEmitter, { events } from '../../uiEmitter'
import media from '../../media'

const Container = styled.div`
  position: relative;
  margin-top: 100px;

  @media (min-width: 1000px) {
    margin: 100px ${gutter}px 0 ${gutter}px;
  }
`

const StyledGrid = styled(Grid)`
  display: block;

  .intro-item {
    display: none;

    &:first-child {
      display: block;
    }
  }

  @supports (display: grid) {
    display: grid;
    .intro-item {
      display: block;
    }
  }
  ${media.phone`
    #grid {
      height: 200px;
    }
  `};
`

const Title = styled.div`
  max-width: 80%;
  margin: 0 auto;
  bottom: 0;
  width: 100%;
  text-align: center;
  transition: opacity ${baseTransition}, transform ${baseTransition};
  transform:  translateY(-35%);
  /* opacity: ${p => (p.show ? 1 : 0)};
  transform:  translateY(${p => (p.show ? '-40%' : '100%')}); */
  top: 100%;
    position:relative;
    z-index:10;
  ${media.phone`
  transform:  translateY(${gutter * 2}px);
  
  `}

  h1 {
    line-height:1;
  }
}
`

const sizes = [
  {
    // height: 10,
    width: 10,
    height: 6,
  },
]
const defaultSize = {
  height: 3,
  width: 5,
}

const getSize = i => (sizes[i] ? sizes[i] : defaultSize)

const HackatonInfo = styled.div`
  font-size: 22px;
`
const WinnersIntro = ({ images = [] }) => {
  const t = useLocale()
  const count = useRef(0)
  const [showTitle, setShowTitle] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const onReveal = () => {
    count.current++

    if (count.current === images.length) {
      uiEmitter.emit(events.heroLoaded)
      setShowTitle(true)
      setTimeout(() => {
        uiEmitter.emit(events.hackatonTitle)
      }, baseTransitionMs)
    }
  }

  const items = categories.map(hash => ({
    hash,
    title: t(`winners.${hash}`),
  }))
  const sections = [
    ...items,
    {
      url: t.url('/participants-2019'),
      title: t(`winners.remaining`),
    },
    {
      hash: 'video',
      title: t(`winners.final`),
    },
  ]

  return (
    <Container>
      <StyledGrid id="grid" height="60vh" gap={`${gutter}px`} columns={20}>
        {images.map((image, index) => (
          <Cell className="intro-item" {...getSize(index)} key={index}>
            <Reveal onReveal={onReveal} delay={index * 125} show={show}>
              <BgImage critical {...image.childImageSharp} />
            </Reveal>
          </Cell>
        ))}
      </StyledGrid>
      <Title show={showTitle} className="js-reset">
        <div>
          <h1>{t('winners.title')}</h1>
          <HackerTitle title={'Hack for Sweden'} />
          <h1>2019</h1>
        </div>
        <HackatonInfo show={showTitle} />
        <SectionScroll items={sections} />
      </Title>
    </Container>
  )
}

export default WinnersIntro

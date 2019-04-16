import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import HackerTitle from '../HackerTitle'
import { gutter } from '../../vars'
import { useLocale } from '../../localeContext'
import BasicData from './BasicData'
import Confetti from 'react-confetti'
import scrollMonitor from 'scrollmonitor'
import media from '../../media'
import CategoryLabel from './CategoryLabel'
import isMobile from 'ismobilejs'

const Container = styled.div`
  position: relative;

  ${media.tablet`
    margin-bottom: ${gutter}px;
  `};
`
const Center = styled.div`
  transform: translateY(-50%);
  text-align: center;
`
const Content = styled.div`
  position: relative;
  z-index: 5;
`
const Img = styled.div`
  position: relative;
  overflow: hidden;
`

const Team = styled.div`
  font-size: 22px;
  text-align: center;
  margin-top: 10px;
`
const Pitch = styled.div`
  margin-bottom: ${gutter * 5}px;
  padding-bottom: ${gutter * 5}px;
  border-bottom: 1px solid #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 120px;
    width: 120px;
    left: 0;
    fill: white;
  }
`

const PitchInner = styled.div`
  max-width: 750px;
  font-size: 26px;
  margin-left: ${gutter * 2}px;
  text-align: center;
`

const FirstPrize = ({ winner, category }) => {
  const container = useRef()
  const imageContainer = useRef()
  const [size, setSize] = useState({})
  const [show, setShow] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const watcher = scrollMonitor.create(container.current, 200)
    setSize(container.current.getBoundingClientRect())
    watcher.enterViewport(() => {
      setShowConfetti(true)
      watcher.destroy()

      setTimeout(() => {
        setShowConfetti(false)
      }, 10000)
    })

    return () => {
      watcher.destroy()
    }
  }, [])

  const confetti = showConfetti && (
    <Confetti
      recycle={false}
      numberOfPieces={1200}
      width={size.width}
      height={size.height}
    />
  )

  return (
    <Container ref={container}>
      <CategoryLabel category={category || winner.category} />
      <Img>
        {!isMobile.any && confetti}
        {winner.image && <Image critical {...winner.image} />}
      </Img>
      {isMobile.any && confetti}
      <Content>
        <Center>
          <HackerTitle title={winner.name} />
          <Team>{winner.team}</Team>
        </Center>
        <Pitch>
          <PitchInner dangerouslySetInnerHTML={{ __html: winner.pitch }} />
        </Pitch>

        <BasicData team={winner} />
      </Content>
    </Container>
  )
}

export default FirstPrize

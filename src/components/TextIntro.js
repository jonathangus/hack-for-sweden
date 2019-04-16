import React, { useEffect } from 'react'
import styled from 'styled-components'
import Grid from './Grid'
import { bigPadding, base, titleColor, scrollOffset } from '../vars'
import scrollMonitor from 'scrollmonitor'
import anime from 'animejs'
import HackerTitle from './HackerTitle'
import BorderButton from './BorderButton'
import AnimateIns from './AnimateIns'
import { useLocale } from '../localeContext'

const Section = styled.section`
  padding: 20px 0;

  @media (min-width: 700px) {
    padding: 15vh 0;
  }
`

const Inner = styled.div`
  max-width: 680px;
  margin: 0 auto;
  justify-content: space-between;
`

const Part = styled.div`
  p {
    font-size: 22px;
    margin-bottom: ${base}px;
  }
`

const Title = styled.h2`
  color: ${titleColor};
  display: block;
  overflow: hidden;
`

const Word = styled.span`
  float: left;
  transform: translate3d(0, 100%, 0);
`

const TextIntro = props => {
  const container = React.createRef()

  useEffect(() => {
    const watcher = scrollMonitor.create(container.current, -200)

    watcher.enterViewport(() => {
      watcher.destroy()
    })

    return () => {
      watcher.destroy()
    }
  }, [])
  const { title, body } = props
  const t = useLocale()

  return (
    <Section>
      <Grid>
        <Inner ref={container}>
          <AnimateIns>
            <Part>
              <HackerTitle color={titleColor} title={title} as="h2" />
            </Part>
            <Part dangerouslySetInnerHTML={{ __html: body }} />
            <BorderButton to="/the-mission">
              {t('readmore.themision')}
            </BorderButton>
          </AnimateIns>
        </Inner>
      </Grid>
    </Section>
  )
}

export default TextIntro

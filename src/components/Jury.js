import React, { useState } from 'react'
import styled from 'styled-components'
import Grid from './Grid'
import AnimateIns from './AnimateIns'
import HackerTitle from './HackerTitle'
import { useLocale } from '../localeContext'
import {
  gutter,
  baseTransition,
  baseTransitionMs,
  secondaryColor,
} from '../vars'

const Wrapper = styled.div`
  text-align: center;
  color: #222;
  background: #fafafa;
  padding: ${gutter * 14}px 0;
  @media (max-width: 1000px) {
    padding: ${gutter * 6}px 0;
  }

  h1,
  h2 {
    color: #222;
  }
`
const Description = styled.div`
  max-width: 600px;
  text-align: center;
  margin: ${gutter * 2}px auto;
  font-size: 22px;
  padding-bottom: ${gutter * 2}px;
`
const LastDesc = styled(Description)`
  border-bottom: 1px solid;
`

const Part = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: white;
  transition: opacity ${baseTransition}, transform ${baseTransition};
  opacity: ${p => (p.show ? 1 : 0)};
  transform: scale(${p => (p.show ? 1 : 0)});
  margin: 5px 0;
  position: relative;
  display: inline-block;
  color: #272727;
`

const Bar = styled.div`
  width: 60%;
  height: 25px;
  background: linear-gradient(45deg, #f6f6f6, #ffbf60);
  position: absolute;
  left: -4px;
  bottom: 0;
  transform-origin: 0 0;
  z-index: -1;
  transition: transform ${baseTransition};
  transform: ${p => (p.show ? 'scale3d(1,1,1)' : 'scale3d(0,1,1)')};
`

const Prizes = () => {
  const [show, setShow] = useState(false)
  const t = useLocale()
  const items = t('jury.criteriaItems').split(', ')
  const onDone = () => {
    setShow(true)
  }

  return (
    <Wrapper id="jury">
      <Grid>
        <AnimateIns onDone={onDone}>
          <HackerTitle title={t('jury.title')} />
          <Description>{t('jury.desc')}</Description>
          <HackerTitle as="h2" title={t('jury.secondaryTitle')} />
          <LastDesc>{t('jury.criteria')}</LastDesc>
        </AnimateIns>
        <div>
          {items.map((item, i) => (
            <div key={i}>
              <Part
                style={{ transitionDelay: `${i * 60 + 200}ms` }}
                show={show}
              >
                {item}
                <Bar
                  style={{
                    transitionDelay: `${i * 60 + 200 + baseTransitionMs}ms`,
                  }}
                  show={show}
                />
              </Part>
            </div>
          ))}
        </div>
      </Grid>
    </Wrapper>
  )
}

export default Prizes

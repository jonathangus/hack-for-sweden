import React, { useEffect, useState } from 'react'
import Grid from '../Grid'
import styled from 'styled-components'
import { useLocale } from '../../localeContext'
import { gutter, swedenYellow, swedenBlue } from '../../vars'
import AnimateIns from '../AnimateIns'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  color: ${swedenBlue};
  @media (max-width: 800px) {
    padding-top: 100px;
  }
`
const Text = styled.div`
  margin-bottom: ${gutter * 4}px;
  font-size: 22px;

  p {
    margin-bottom: ${gutter}px;
  }
  a {
    margin-top: ${gutter}px;
    line-height: 1;
    padding-bottom: 9px;
  }

  b {
    font-weight: bold;
    /* font-family: Arial, Helvetica, sans-serif; */
    background: ${swedenBlue};
    color: ${swedenYellow};
    padding: 2px 10px 6px 10px;
  }
`
const Title = styled.h2`
  color: ${swedenBlue};
`

const InnovationWeekTexts = () => {
  const t = useLocale()

  return (
    <Wrapper>
      <Grid>
        <AnimateIns>
          <Text>
            <Title>{t('innovationWeek.digi.title')}</Title>
            <div
              dangerouslySetInnerHTML={{
                __html: t('innovationWeek.digi.body'),
              }}
            />
            <a href="https://www.digigov.se" target="_blank">
              {t('common.readMore')}
            </a>
          </Text>
          <Text>
            <Title>{t('innovationWeek.demoday.title')}</Title>
            <div
              dangerouslySetInnerHTML={{
                __html: t('innovationWeek.demoday.body'),
              }}
            />
            <a href="https://www.swedendemoday.com" target="_blank">
              {t('common.readMore')}
            </a>
          </Text>
          <Text>
            <Title>{t('innovationWeek.h4s.title')}</Title>
            <div
              dangerouslySetInnerHTML={{
                __html: t('innovationWeek.h4s.body'),
              }}
            />
            <Link to="/hackaton">{t('common.readMore')}</Link>
          </Text>
        </AnimateIns>
      </Grid>
    </Wrapper>
  )
}

export default InnovationWeekTexts

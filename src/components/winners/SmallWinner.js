import React from 'react'
import styled from 'styled-components'
import BasicData from './BasicData'
import HackerTitle from '../HackerTitle'
import { gutter, bgColor, secondaryColor } from '../../vars'
import media from '../../media'
import { useLocale } from '../../localeContext'

const Container = styled.div`
  padding: ${gutter * 3}px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;

  a {
    word-break: break-word;
  }

  ${media.tablet`
    margin-bottom: ${gutter}px;
    padding: ${gutter * 2}px;
  `};

  h2 {
    white-space: normal;
    line-height: 1.1;
    font-size: 22px;
    margin-bottom: ${gutter}px;
  }
`
const Team = styled.div`
  font-size: 16px;
  margin-bottom: ${gutter * 2}px;
`
const Pitch = styled.div`
  margin-bottom: ${gutter * 2}px;

  border-top: 1px solid white;
  border-bottom: 1px solid white;
  text-align: center;
  padding: ${gutter}px;

  p {
    display: inline;
  }
  &:before,
  &:after {
    content: ' " ';
  }
`
const Position = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  line-height: 1;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.tablet`
    width: 24px;
    height: 24px;
    transform: translate(-25%, -25%);
  `};

  h1 {
    font-size: 40px;
    /* font-size: 70px; */
    color: ${bgColor};

    ${media.tablet`
      font-size: 20px;
    `};
  }
`
const Prefix = styled.div`
  font-size: 22px;
  margin-bottom: 6px;
  color: white;
`

const awards = {
  education: 'Education and Science Award',
  mobility: 'Mobility Award',
  environment: 'Green Award',
  health: 'Health Award',
  business: 'Business Award',
  labor: 'Job Award',
}

const SmallWinner = ({ team, inGroup }) => {
  let pos
  if (team.position === 'Silver') {
    pos = 2
  } else if (team.position === 'Bronze') {
    pos = 3
  }

  const t = useLocale()
  const prefix = (
    <Prefix>
      {team.position === 'Silver' ? '🥈' : '🥉'}
      {team.position} {t('smallWinner.middle')} {awards[team.category]}
    </Prefix>
  )

  return (
    <div>
      {inGroup && prefix}
      <Container>
        <HackerTitle as="h2" title={team.name} />

        <Team>{team.team}</Team>
        {team.pitch && (
          <Pitch dangerouslySetInnerHTML={{ __html: team.pitch }} />
        )}
        <BasicData withCategory={!inGroup} team={team} />
      </Container>
    </div>
  )
}

export default SmallWinner

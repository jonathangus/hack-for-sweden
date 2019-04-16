import React from 'react'
import styled from 'styled-components'
import { useLocale } from '../../localeContext'
import { gutter, titleFont } from '../../vars'
import media from '../../media'

const Name = styled.span``

const Container = styled.div``
const Sweden = styled(Name)`
  /* color: #ffe000; */
`
const Mobilty = styled(Name)`
  /* color: #fc4f8a; */
`
const Green = styled(Name)`
  /* color: #4cd137; */
`
const Education = styled(Name)`
  /* color: #2980b9; */
`
const Job = styled(Name)`
  /* color: #1abc9c; */
`
const Business = styled(Name)`
  /* color: #e67e22; */
`
const Health = styled(Name)`
  /* color: #9b59b6; */
`

const Bigger = styled.div`
  font-size: 42px;
  font-weight: bold;

  color: white;
  font-family: ${titleFont};
  ${media.tablet`
  font-size:22px;
`};
`
const Extra = styled.div`
  font-size: 20px;
  margin-bottom: ${gutter * 2}px;
`

const CategoryLabel = ({ category }) => {
  const t = useLocale()

  const components = {
    education: text => (
      <Education>{text} Education and Science Award</Education>
    ),
    hackforsweden: () => <span>{t('winner.firstPrize')}</span>,
    mobility: text => <Mobilty>{text} Mobility Award</Mobilty>,
    environment: text => <Green>{text} Green Award</Green>,
    health: text => <Health>{text} Health Award</Health>,
    business: text => <Business>{text} Business Award</Business>,
    labor: text => <Job>{text} Job Award</Job>,
  }
  const prize =
    category === 'hackforsweden'
      ? t('winners.categoryFirst')
      : t('winners.categoryOther')

  return (
    <Container>
      <Bigger>
        🥇
        {components[category](t('winnerGroup'))}
      </Bigger>
      <Extra>{prize}</Extra>
    </Container>
  )
}

export default CategoryLabel

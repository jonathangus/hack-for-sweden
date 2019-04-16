import React from 'react'
import styled from 'styled-components'
import FirstPrize from './FirstPrize'
import SmallWinner from './SmallWinner'
import { Grid, Cell } from 'styled-css-grid'
import { gutter } from '../../vars'
import media from '../../media'

const Container = styled.div`
  margin-top: ${gutter * 12}px;

  ${media.tablet`
    margin-top: ${gutter * 8}px;
  `};

  ${media.phone`
    margin-top: ${gutter * 4}px;
  `};
`

const StyledGrid = styled(Grid)`
  ${media.tablet`
    display:block;
  `};
`

const WinnerGroup = ({ winners = [] }) => {
  const gold = winners.find(winner => winner.position === 'Gold')
  const silver = winners.find(winner => winner.position === 'Silver')
  const bronze = winners.find(winner => winner.position === 'Bronze')

  return (
    <Container id={gold.category}>
      <StyledGrid gap={`${gutter * 3}px`} columns={8}>
        {gold && (
          <Cell width={8}>
            <FirstPrize winner={gold} />
          </Cell>
        )}

        {silver && (
          <Cell width={4}>
            <SmallWinner inGroup team={silver} />
          </Cell>
        )}

        {bronze && (
          <Cell width={4}>
            <SmallWinner inGroup team={bronze} />
          </Cell>
        )}
      </StyledGrid>
    </Container>
  )
}

export default WinnerGroup

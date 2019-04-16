// @flow

import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import ArrowTitle from './ArrowTitle'
import get from 'lodash/get'
import { gutter } from '../../vars'
import media from '../../media'
import colors from './colors'

const Content = styled.div`
  flex: 1;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${gutter * 4}px;
  padding: ${gutter * 2}px;
  background-color: white;
  border-radius: 4px;
  color: #222;
  box-shadow: 0px 1px 10px rgba(255, 255, 255, 0.7);

  ${media.phone`display:block;`} &:last-child {
    margin-bottom: 0;
  }
`
const Link = styled.a``
const Logo = styled.div`
  width: 20%;
  margin-right: ${gutter * 3}px;

  ${media.phone`
    width:100%;
    margin-bottom: ${gutter * 3}px;
    margin-right:0;
  `};
`
const Text = styled.div``

const PrizeElement = props => {
  const { color, prize } = props

  return (
    <Container>
      <Logo>{prize.logo && <Image critical {...prize.logo} />}</Logo>
      <Content>
        <ArrowTitle color={color}>{prize.title}</ArrowTitle>
        {prize.url && (
          <Link href={prize.url} target="_blank">
            {prize.url}
          </Link>
        )}
        <Text
          dangerouslySetInnerHTML={{
            __html: get(prize, 'text.childMarkdownRemark.html'),
          }}
        />
      </Content>
    </Container>
  )
}

export default PrizeElement

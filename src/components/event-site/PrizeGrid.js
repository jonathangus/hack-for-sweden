// @flow

import React from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'
import SiteGrid from '../Grid'
import { gutter } from '../../vars'
import colors from './colors'
import { Grid, Cell } from 'styled-css-grid'
import GridItem from './GridItem'
import get from 'lodash/get'

const { blue, green, magenta, yellow, white } = colors

const colorsList = [green, blue, magenta, yellow, white]

let count = 0
const getColor = () => {
  const color = colorsList[count]
  if (colorsList[count + 1]) {
    count += 1
  } else {
    count = 0
  }
  return color
}

const categories = [
  {
    url: '/co-working',
    title: 'Co-working space',
    companies: ['The Park', 'GoTo10', 'NIH/Vinnova', 'WeWork', 'Acando'],
  },
  {
    url: '/fast-track',
    title: 'Fast Track Program',
    companies: ['Antler', 'IBM'],
  },
  {
    url: '/incubator',
    title: 'Incubator Program',
    companies: ['SISP', 'SSES', 'Ignite Sweden', 'Tillväxtverket'],
  },
  {
    url: '/mentorship',
    title: 'Mentorship/ Consultant',
    companies: [
      'Google Cloud',
      'Valtech',
      'Acando',
      'Initiative of Change',
      'Arbetsförmedlingen',
    ],
  },
  {
    url: '/domain',
    title: 'Domain, storage etc',
    companies: ['AWS', 'Internetstiftelsen', 'Nordix'],
  },
  {
    url: '/other',
    title: 'Other',
    companies: [
      'SingularityU Nordic',
      "Expo 2020 - Committee for Sweden's Participation at Expo 2020",
    ],
  },
]

const items = categories.map((item, i) => ({
  ...item,
  width: 3,
  height: 8,
  color: getColor(),
}))

const Text = styled.div`
  max-width: 600px;
  font-size: 18px;
  margin: ${gutter * 2}px auto;
`
const Extra = styled.div``
const Container = styled.div`
  margin: ${gutter * 4}px 0;
`
const PrizeGrid = props => {
  console.log(props)
  const getExtra = companies => <Extra>{companies.join(', ')}</Extra>
  return (
    <Container>
      <Text
        dangerouslySetInnerHTML={{
          __html: get(props, 'contentfulText.body.childMarkdownRemark.html'),
        }}
      />
      <Grid columns="repeat(auto-fit, minmax(120px, 1fr))" gap={`${gutter}px`}>
        {items.map((item, i) => (
          <Cell width={item.width} height={item.height} key={i}>
            <GridItem
              color={item.color}
              title={item.title}
              key={i}
              to={`/prizes${item.url}`}
              extra={getExtra(item.companies)}
            />
          </Cell>
        ))}
      </Grid>
    </Container>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        contentfulText: contentfulText(
          node_locale: { eq: "en-US" }
          identifier: { eq: "prizes-extra-info" }
        ) {
          headline
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    `}
    render={PrizeGrid}
  />
)

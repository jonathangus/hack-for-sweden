import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styled from 'styled-components'
import Seo from '../components/Seo'
import Grid from '../components/Grid'
import { gutter } from '../vars'
import PrizeElement from '../components/event-site/PrizeElement'
import PrizeGrid from '../components/event-site/PrizeGrid'
import colors from '../components/event-site/colors'
import withHead from '../hocs/withHead'
import uiEmitter, { events } from '../uiEmitter'

const Container = styled.div`
  margin-top: ${gutter * 8}px;
`
const Bottom = styled.div`
  margin-top: ${gutter * 8}px;
`

const Page = ({ data, pageContext }) => {
  const promoted = get(data, 'prizes.edges', []).map(n => n.node)
  const seo = {
    title: pageContext.page.title,
  }

  React.useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])

  return (
    <Grid>
      <Seo data={seo} />
      <Container>
        {promoted.map(prize => (
          <PrizeElement color={colors.white} prize={prize} key={prize.id} />
        ))}
        <Bottom>
          <PrizeGrid />
        </Bottom>
      </Container>
    </Grid>
  )
}

export const query = graphql`
  query($pageId: String) {
    contentfulText(
      node_locale: { eq: "en-US" }
      identifier: { eq: "hackathon-prizes" }
    ) {
      headline
      body {
        childMarkdownRemark {
          html
        }
      }
    }

    prizes: allContentfulPrize(
      filter: { node_locale: { eq: "en-US" }, category: { eq: $pageId } }
    ) {
      edges {
        node {
          id
          title
          text {
            childMarkdownRemark {
              html
            }
          }
          logo {
            sizes(maxWidth: 600) {
              ...GatsbyContentfulSizes
            }
          }
          url
        }
      }
    }
  }
`

export default withHead(Page)

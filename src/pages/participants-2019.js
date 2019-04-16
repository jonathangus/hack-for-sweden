import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import ContainerGrid from '../components/Grid'
import groupBy from 'lodash/groupBy'
import styled from 'styled-components'
import categories from '../components/winners/winnerSections'
import { Grid, Cell } from 'styled-css-grid'
import SmallWinner from '../components/winners/SmallWinner'
import { gutter } from '../vars'
import uiEmitter, { events } from '../uiEmitter'

const StyledGrid = styled(Grid)`
  @media (max-width: 500px) {
    display: block;
  }
`
const Container = styled.div`
  margin-top: 100px;
`

const Page = ({ data }) => {
  const nodes = get(data, 'allContentfulWinner.edges', []).map(n => ({
    ...n.node,
    category: n.node.category[0],
    position: n.node.position[0],
    openData: get(n, 'node.openData.childMarkdownRemark.html'),
    pitch: get(n, 'node.pitch.childMarkdownRemark.html'),
    challenge: get(n, 'node.challenge.title'),
  }))
  const seo = get(data, 'allContentfulSeo.edges[0].node')

  React.useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])
  return (
    <article>
      <Seo data={seo} />

      <Container>
        <ContainerGrid>
          <StyledGrid
            gap={`${gutter * 2}px`}
            columns="repeat(auto-fit,minmax(400px,1fr))"
          >
            {nodes.map(node => (
              <Cell key={node.id}>
                <SmallWinner team={node} />
              </Cell>
            ))}
          </StyledGrid>
        </ContainerGrid>
      </Container>
    </article>
  )
}

export const query = graphql`
  query($locale: String) {
    allContentfulWinner(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          name
          position
          category
          contact
          team
          presentation
          challenge {
            title
          }
          openData {
            childMarkdownRemark {
              html
            }
          }
          pitch {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    allContentfulSeo(
      filter: { node_locale: { eq: "en-US" }, slug: { eq: "h4s-participants" } }
    ) {
      edges {
        node {
          title
          description {
            description
          }
          image {
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`

export default withHead(Page)

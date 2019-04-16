import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styled from 'styled-components'
import Seo from '../components/Seo'
import { gutter, textColor } from '../vars'
import withHead from '../hocs/withHead'
import uiEmitter, { events } from '../uiEmitter'
import Prizes from '../components/Prizes'

const Page = ({ data }) => {
  const seo = get(data, 'allContentfulSeo.edges[0].node')

  React.useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])

  return (
    <React.Fragment>
      <Seo data={seo} />
      <Prizes />
    </React.Fragment>
  )
}

export const query = graphql`
  {
    intro: contentfulText(
      node_locale: { eq: "en-US" }
      identifier: { eq: "prizes-categories-description" }
    ) {
      headline
      body {
        childMarkdownRemark {
          html
        }
      }
    }

    allContentfulSeo(
      filter: { node_locale: { eq: "en-US" }, slug: { eq: "prizes" } }
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

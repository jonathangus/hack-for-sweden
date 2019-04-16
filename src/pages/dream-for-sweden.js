import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import styled, { createGlobalStyle } from 'styled-components'
import {
  gutter,
  baseTransition,
  swedenYellow,
  swedenBlue,
  swedenFont,
} from '../vars'
import DreamForSwedenHero from '../components/dream/DreamForSwedenHero'

const Page = ({ data }) => {
  const seo = get(data, 'allContentfulSeo.edges[0].node')

  return (
    <div>
      <Seo data={seo} />
      <DreamForSwedenHero />
    </div>
  )
}

export const query = graphql`
  {
    allContentfulSeo(filter: { slug: { eq: "dream-for-sweden" } }) {
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

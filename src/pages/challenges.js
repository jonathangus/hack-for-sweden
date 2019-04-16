import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import styled from 'styled-components'
import { gutter } from '../vars'
import { useLocale } from '../localeContext'
import Challenge from '../components/categories/Challenge'
import ChallengesIntro from '../components/categories/ChallengesIntro'
import uiEmitter, { events } from '../uiEmitter'

const Wrapper = styled.div``

const Page = ({ data }) => {
  const seo = get(data, 'allContentfulSeo.edges[0].node')
  const categories = get(data, 'allContentfulCategory.edges')

  const videos = [
    get(data, 'swedenwedreamof.edges[0].node'),
    get(data, 'combinedata.edges[0].node'),
    get(data, 'revival.edges[0].node'),
  ]

  useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])

  return (
    <React.Fragment>
      <Seo data={seo} />

      <ChallengesIntro categories={categories} videos={videos} />
      {categories.map((c, i) => (
        <Challenge key={i} challenge={c.node} />
      ))}
    </React.Fragment>
  )
}

export const query = graphql`
  query($locale: String) {
    allContentfulCategory(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          name
          text {
            childMarkdownRemark {
              html
            }
          }
          slug
          challenges {
            title
          }
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    combinedata: allContentfulYoutube(
      filter: { slug: { eq: "combinedata" }, node_locale: { eq: "sv-SE" } }
    ) {
      edges {
        node {
          title
          youtubeId
          vimeoId
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    swedenwedreamof: allContentfulYoutube(
      filter: { slug: { eq: "swedenwedreamof" }, node_locale: { eq: "sv-SE" } }
    ) {
      edges {
        node {
          title
          youtubeId
          vimeoId
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    revival: allContentfulYoutube(
      filter: { slug: { eq: "revival" }, node_locale: { eq: "sv-SE" } }
    ) {
      edges {
        node {
          title
          youtubeId
          vimeoId
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    allContentfulSeo(
      filter: { node_locale: { eq: $locale }, slug: { eq: "challenges" } }
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

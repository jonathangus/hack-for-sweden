import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import { gutter } from '../vars'
import MediaVideo from '../components/MediaVideo'
import ContainerGrid from '../components/Grid'
import uiEmitter, { events } from '../uiEmitter'
import MediaImage from '../components/MediaImage'
import shuffle from 'lodash/shuffle'
import styled from 'styled-components'
import { Grid, Cell } from 'styled-css-grid'
import MediaGrid from '../components/media/MediaGrid'

const Page = ({ data }) => {
  const seo = get(data, 'allContentfulSeo.edges[0].node')
  const videos = get(data, 'allContentfulYoutube.edges', []).map(v => ({
    ...v.node,
    type: 'video',
  }))
  const media = get(data, 'allContentfulMediaImage.edges', []).map(v => ({
    ...v.node,
    type: 'image',
  }))

  const items = shuffle([...media, ...videos])
  useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])

  return (
    <div>
      <Seo data={seo} />
      <MediaGrid items={items} />
    </div>
  )
}

export const query = graphql`
  query($locale: String) {
    allContentfulYoutube(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          id
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

    allContentfulMediaImage(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    allContentfulSeo(
      filter: { slug: { eq: "media" }, node_locale: { eq: $locale } }
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

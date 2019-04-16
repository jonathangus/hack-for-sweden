import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import YoutubeVideo from '../components/MediaVideo'
import ImageIntro from '../components/ImageIntro'
import BasicText from '../components/BasicText'

const Page = ({ data, ...rest }) => {
  const node = get(data, 'allContentfulOpenData.edges[0].node') || {}
  const { introTitle, introBody, image } = node
  const seo = get(node, 'seo')
  const youtube = get(node, 'youtube')
  const text = get(node, 'text.childMarkdownRemark.html')

  console.log(rest)
  return (
    <article>
      <Seo data={seo} />
      <ImageIntro title={introTitle} text={introBody} image={image} />
      {youtube && <YoutubeVideo data={youtube} />}
      <BasicText text={text} />
    </article>
  )
}

export const query = graphql`
  query($locale: String) {
    allContentfulOpenData(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          id
          introTitle
          introBody {
            childMarkdownRemark {
              html
            }
          }
          text {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          youtube: yotube {
            title
            youtubeId
            image {
              fluid(maxWidth: 1280) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
          seo {
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
  }
`

export default withHead(Page)

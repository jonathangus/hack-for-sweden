import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import ImageIntro from '../components/ImageIntro'
import BasicText from '../components/BasicText'
import { body } from '../render'
import Quote from '../components/Quote'

const Page = ({ data }) => {
  const node = get(data, 'allContentfulTheMission.edges[0].node') || {}
  const { introTitle, introBody, image } = node
  const seo = get(node, 'seo')
  const quote = get(node, 'quote')

  return (
    <article>
      <Seo data={seo} />
      <ImageIntro title={introTitle} text={introBody} image={image} />
      {quote && <Quote data={quote} />}
      <BasicText text={body(node.body)} />
    </article>
  )
}

export const query = graphql`
  query($locale: String) {
    allContentfulTheMission(
      limit: 1
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          id
          node_locale
          introTitle
          introBody
          body {
            childMarkdownRemark {
              html
            }
          }
          quote {
            quote {
              childMarkdownRemark {
                html
              }
            }
            author {
              childMarkdownRemark {
                html
              }
            }
          }

          image {
            sizes(maxWidth: 1280) {
              ...GatsbyContentfulSizes
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

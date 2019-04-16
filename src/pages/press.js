import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import ImageIntro from '../components/ImageIntro'
import Press from '../components/Press'

class Page extends React.Component {
  render() {
    const { data } = this.props
    const node = get(data, 'allContentfulPress.edges[0].node') || {}
    const { introTitle, image, introBody } = node
    const seo = get(node, 'seo')

    return (
      <article>
        <Seo data={seo} />
        <ImageIntro title={introTitle} image={image} />
        <Press />
      </article>
    )
  }
}

export const query = graphql`
  {
    allContentfulPress(limit: 1, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          introTitle
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

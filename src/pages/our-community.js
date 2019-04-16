import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import ImageIntro from '../components/ImageIntro'
import BasicText from '../components/BasicText'
import { body } from '../render'
import ParallaxImages from '../components/ParallaxImages'
import Form from '../components/Form'

class Page extends React.Component {
  render() {
    const { data } = this.props
    const node = get(data, 'allContentfulOurCommunity.edges[0].node') || {}
    const { introTitle, image, images } = node
    const seo = get(node, 'seo')

    return (
      <article>
        <Seo data={seo} />
        <ImageIntro title={introTitle} text={body} image={image} />
        <BasicText text={body(node.body)} />
        <ParallaxImages images={images} />
        {/* <Form formName="our-community" /> */}
      </article>
    )
  }
}

export const query = graphql`
  query($locale: String) {
    allContentfulOurCommunity(
      limit: 1
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          id
          introTitle
          body {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }

          images {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
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

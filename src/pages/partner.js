import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import PartnerIntro from '../components/PartnerIntro'
import PartnerForm from '../components/partner/PartnerForm'
import PartnerDivider from '../components/PartnerDivider'

class Page extends React.Component {
  render() {
    const { data } = this.props
    const node = get(data, 'allContentfulPartner.edges[0].node') || {}
    const { introTitle, body, image } = node
    const seo = get(node, 'seo')

    return (
      <article>
        <Seo data={seo} />
        <PartnerIntro title={introTitle} body={body} image={image} />
        <PartnerForm />
        <PartnerDivider link={false} />
      </article>
    )
  }
}

export const query = graphql`
  query($locale: String) {
    allContentfulPartner(
      filter: { node_locale: { eq: $locale } }
      limit: 1
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
            sizes(maxWidth: 1680) {
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

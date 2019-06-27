import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import MainHero from '../components/MainHero'
import TextIntro from '../components/TextIntro'
import LatestNews from '../components/LatestNews'
import Events from '../components/Events'
import PartnerDivider from '../components/PartnerDivider'
import Form from '../components/Form'
import QuotesSlider from '../components/QuotesSlider'

import { loadVideo } from '../vid'

if (typeof window !== 'undefined') {
  loadVideo()
}

class Page extends React.Component {
  render() {
    const { data } = this.props
    const node = get(data, 'page.edges[0].node')
    const seo = get(node, 'seo')
    const news = get(data, 'allContentfulBlogPost.edges')
    const events = get(data, 'allContentfulEvent.edges')
    const posterImage = get(node, 'posterImage')
    const quotes = get(data, 'allContentfulQuote.edges')

    return (
      <React.Fragment>
        <Seo data={seo} index />

        <MainHero
          posterImage={posterImage}
          title={get(node, 'heroTitle')}
          text={get(node, 'heroText')}
        />
        <TextIntro
          title={get(node, 'introTitle')}
          body={get(node, 'introBody.childMarkdownRemark.html')}
        />
        <LatestNews news={news} />
        <PartnerDivider />
        <Events events={events} />
        <QuotesSlider quotes={quotes} />
        <Form />
      </React.Fragment>
    )
  }
}

export default withHead(Page)

export const query = graphql`
  query($locale: String) {
    page: allContentfulStartPage(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          node_locale
          id
          heroTitle
          heroText
          introTitle
          introBody {
            childMarkdownRemark {
              id
              html
            }
          }

          posterImage {
            fluid(maxWidth: 1500, quality: 95) {
              ...GatsbyContentfulFluid_withWebp
            }
          }

          seo {
            title
            description {
              description
            }
          }
        }
      }
    }

    allContentfulBlogPost(
      limit: 5
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          id
          title

          vimeoId
          body {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 880) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    allContentfulEvent(
      sort: { fields: [startDate], order: ASC }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          title
          startDate
          endDate
          date
          location
          youtubeId

          body {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 880) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    allContentfulQuote(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          author {
            childMarkdownRemark {
              html
            }
          }
          quote {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 380) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          id
        }
      }
    }
  }
`

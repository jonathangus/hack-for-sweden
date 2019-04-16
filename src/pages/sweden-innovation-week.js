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
import InnovationWeekHero from '../components/innovation-week/InnovationWeekHero'
import InnovationWeekTexts from '../components/innovation-week/InnovationWeekTexts'
import Helmet from 'react-helmet'
import ParallaxImages from '../components/ParallaxImages'
import { MenuItem } from '../components/Footer'

const GlobalStyle = createGlobalStyle`
    .sweden-innovation-week  {
        background-color: ${swedenYellow};
        color: white;

        body,h1,h2,h3 {
      font-family:${swedenFont}
        }
    }
    
    
    #innovation-week a {
    background: ${swedenBlue};
    color: ${swedenYellow};
    padding: 6px 10px;
    display: inline-block;
    transition: all ${baseTransition};

    @media (max-width: 800px) {
      line-height: 1;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
    }
  }

  footer svg path {
    fill: ${swedenBlue}
  }
  footer h3,
  .bro-row {
    color: ${swedenBlue}
  }

  ${MenuItem} {
    color: ${swedenBlue}

    &:after{
      background: ${swedenBlue}
    }
  }


@font-face {
    font-family: ${swedenFont};
    src: url('/SwedenSans/swedensans-webfont.eot');
    src: url('/SwedenSans/swedensans-webfont.eot?#iefix') format('embedded-opentype'),
         url('/SwedenSans/swedensans-webfont.woff2') format('woff2'),
         url('/SwedenSans/swedensans-webfont.woff') format('woff'),
         url('/SwedenSans/swedensans-webfont.ttf') format('truetype'),
         url('/SwedenSans/swedensans-webfont.svg#sweden_sansregular') format('svg');
    font-weight: normal;
    font-style: normal;

}
`

const Page = ({ data }) => {
  const seo = get(data, 'allContentfulSeo.edges[0].node')
  const images = get(data, 'allContentfulImageParallax.edges[0].node.image')
  const bodyAttr = {
    class: 'sweden-innovation-week',
  }
  return (
    <div id="innovation-week">
      <Helmet bodyAttributes={bodyAttr} />
      <Seo data={seo} />
      <InnovationWeekHero />
      <ParallaxImages images={images} />
      <InnovationWeekTexts />
      <GlobalStyle />
    </div>
  )
}

export const query = graphql`
  {
    allContentfulImageParallax(filter: { slug: { eq: "innovation-day" } }) {
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

    allContentfulSeo(filter: { slug: { eq: "innovation-day" } }) {
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

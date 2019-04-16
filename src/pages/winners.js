import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import Grid from '../components/Grid'
import WinnersIntro from '../components/winners/WinnersIntro'
import WinnerGroup from '../components/winners/WinnerGroup'
import groupBy from 'lodash/groupBy'
import styled from 'styled-components'
import categories from '../components/winners/winnerSections'
import MediaVideo from '../components/MediaVideo'
import uiEmitter, { events } from '../uiEmitter'
import FirstPrize from '../components/winners/FirstPrize'
import { useLocale } from '../localeContext'
import { gutter } from '../vars'

const Groups = styled.div`
  a {
    word-break: break-word;
  }
`

const Video = styled.div`
  margin-top: 10vh;
`

const First = styled.div`
  margin: 15vh 0;
`
const VideoText = styled.div`
  font-size: 22px;
  text-align: center;
  margin-bottom: ${gutter * 2}px;
`

const Page = ({ data }) => {
  const nodes = get(data, 'allContentfulWinner.edges', []).map(n => ({
    ...n.node,
    category: n.node.category[0],
    position: n.node.position[0],
    openData: get(n, 'node.openData.childMarkdownRemark.html'),
    pitch: get(n, 'node.pitch.childMarkdownRemark.html'),
    motivation: get(n, 'node.motivation.childMarkdownRemark.html'),
    challenge: get(n, 'node.challenge.title'),
  }))
  const seo = get(data, 'allContentfulSeo.edges[0].node')
  const realWinners = nodes.filter(n => n.position !== 'No-winner')
  const video = get(data, 'allContentfulYoutube.edges[0].node')
  const groups = groupBy(realWinners, 'category')
  const sorter = (a, b) => categories.indexOf(a[0]) - categories.indexOf(b[0])
  const images = get(data, 'images.edges', [])
    .map(img => img.node)
    .filter(img => img.name.includes('winner'))

  useEffect(() => {
    uiEmitter.emit(events.hackatonTitle)
  }, [])

  const superWinner = nodes.find(
    node => node.category === 'health' && node.position === 'Gold'
  )
  const t = useLocale()

  return (
    <article>
      <Seo data={seo} />
      <WinnersIntro images={images} />
      <Grid>
        <First>
          <FirstPrize category="hackforsweden" winner={superWinner} />
        </First>
        <Groups>
          {Object.entries(groups)
            .sort(sorter)
            .map(([key, value]) => (
              <WinnerGroup key={key} category={key} winners={value} />
            ))}
        </Groups>
        <Video id="video">
          <VideoText>{t('winners.video')}</VideoText>
          <MediaVideo inGrid data={video} />
        </Video>
      </Grid>
    </article>
  )
}

export const query = graphql`
  query($locale: String) {
    allContentfulWinner(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          name
          position
          category
          contact
          team
          motivation {
            childMarkdownRemark {
              html
            }
          }
          presentation
          challenge {
            title
          }
          openData {
            childMarkdownRemark {
              html
            }
          }
          pitch {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 1280) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    allContentfulYoutube(
      filter: { slug: { eq: "video-stream" }, node_locale: { eq: $locale } }
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

    images: allFile(
      sort: { fields: name }
      filter: { sourceInstanceName: { eq: "other" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            sizes(maxWidth: 720, quality: 95) {
              ...GatsbyImageSharpSizes_withWebp
              aspectRatio
            }
          }
        }
      }
    }

    allContentfulSeo(
      filter: { node_locale: { eq: "en-US" }, slug: { eq: "h4s-winners" } }
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

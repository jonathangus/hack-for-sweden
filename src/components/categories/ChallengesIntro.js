import React from 'react'
import styled from 'styled-components'
import Grid from '../Grid'
import { gutter } from '../../vars'
import MediaVideo from '../MediaVideo'
import { useLocale } from '../../localeContext'
import SectionScroll from '../SectionScroll'
import reportFile from '../../../files/datadriven-innovation.pdf'

const Intro = styled.div`
  margin: 100px 0;
  text-align: center;
`
const Text = styled.div`
  font-size: 22px;
  margin-bottom: ${gutter * 2}px;
`

const VideosWrap = styled.div`
  @media (min-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    margin-top: ${gutter}px;
    justify-content: space-between;
  }
`
const VideoSmall = styled.div`
  margin-top: ${gutter}px;

  @media (min-width: 900px) {
    margin-top: 0;
    width: calc(50% - ${gutter / 2}px);
  }
`

const ChallengesIntro = props => {
  const { videos, categories } = props
  const parent = React.useRef()

  const t = useLocale()
  const items = categories.map(c => ({
    title: c.node.name,
    hash: c.node.slug,
  }))

  React.useEffect(() => {
    const elems = parent.current.getElementsByTagName('a')
    if (!elems) return

    const links = Array.prototype.slice.call(elems)
    links[0].href = reportFile
    links[0].target = '_blank'
  }, [])

  return (
    <Intro>
      <Grid ref={parent}>
        <h1>{t('challenges.title')}</h1>
        <Text>{t('challenges.first')}</Text>
        <Text
          dangerouslySetInnerHTML={{
            __html: t('challenges.second'),
          }}
        />
        <SectionScroll items={items} />

        <MediaVideo inGrid data={videos[0]} />
        <VideosWrap>
          <VideoSmall>
            <MediaVideo small inGrid data={videos[1]} />
          </VideoSmall>
          <VideoSmall>
            <MediaVideo small inGrid data={videos[2]} />
          </VideoSmall>
        </VideosWrap>
      </Grid>
    </Intro>
  )
}

export default ChallengesIntro

import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import Image from 'gatsby-image'
import Play from '../../icons/Play'
import { gutter } from '../../vars'
import MediaVideoModal from './MediaVideoModal'
import { useLocale } from '../../localeContext'

const Container = styled.div`
  margin-top: 125px;
  min-height: 100vh;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    width: 400px;
    margin: ${gutter / 2}px;
  }

  @supports (display: grid) {
    display: grid;
    grid-gap: ${gutter}px;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-auto-rows: 20px;
    padding: 0 ${gutter}px;

    > div {
      width: auto;
      margin: 0;
    }
  }

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
  }
`

const Item = styled.div`
  overflow: hidden;
  transition: opacity 0.3s ease;
  opacity: 0;
`
const StyledImage = styled(Image)`
  height: 100%;
  transition: transform 0.3s ease;
  position: relative;
`

const VideoTease = styled.div`
  padding: ${gutter}px;
  text-align: center;
  opacity: 0;
  position: absolute;
  left: 0%;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  width: 100%;
  transition: opacity 0.3s ease;

  h4 {
    font-size: 22px;
  }
`

const Inner = styled.div`
  height: 100%;
  position: relative;

  .isVideo & {
    cursor: pointer;
  }

  &:after {
    content: '';
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    left: 0;
    top: 0;
    opacity: 0;
    transition: opacity 0.3s ease;

    .isVideo & {
      display: block;
    }
  }

  &:hover {
    &:after {
      opacity: 0.5;
    }
    ${VideoTease} {
      opacity: 1;
    }
    ${StyledImage} {
      .isVideo & {
        transform: scale(1.08);
      }
    }
  }
`
const PlayIcon = styled.div`
  position: absolute;
  left: ${gutter}px;
  bottom: ${gutter}px;

  svg {
    width: 30px;
    height: auto;

    path {
      fill: white;
    }
  }
  z-index: 20;
`
const Intro = styled.div`
  text-align: center;
  padding: 0 ${gutter}px;
  font-size: 20px;
  margin-bottom: ${gutter * 2}px;
`
const MediaGrid = ({ items }) => {
  const gridElem = useRef()
  const [selectedVideoIndex, setVideoIndex] = useState()

  const resizeItem = (item, index, setHeight) => {
    const grid = gridElem.current
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'),
      10
    )
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-row-gap'),
      10
    )
    const content = item.querySelector('.content')
    if (!content) {
      console.log('cant find content', item)
      return
    }

    const ratio = items[index].image.fluid.aspectRatio
    const height = item.getBoundingClientRect().width / ratio
    const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap))

    item.style.gridRowEnd = 'span ' + rowSpan
    if (setHeight === true) {
      item.style.opacity = 1
    }
    if (items[index].type === 'video') {
      item.classList.add('isVideo')
    }
  }

  const resizeStuff = () => {
    Array.from(document.getElementsByClassName('grid-item')).forEach(resizeItem)
  }

  useEffect(() => {
    resizeStuff()
  }, [])

  const onImageLoad = index => {
    resizeItem(
      Array.from(document.getElementsByClassName('grid-item'))[index],

      index,
      true
    )
  }

  const getImage = item => item.image || item.small
  const onMediaClick = (item, index) => {
    if (item.type === 'video') {
      setVideoIndex(index)
    }
  }

  const t = useLocale()
  return (
    <Container>
      <Intro>
        {t('media.intro')}{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/hack4sweden"
        >
          Facebook
        </a>
      </Intro>
      {items[selectedVideoIndex] && (
        <MediaVideoModal
          {...items[selectedVideoIndex]}
          onClose={() => setVideoIndex(null)}
        />
      )}
      <Wrapper ref={gridElem}>
        {items.map((item, i) => (
          <Item className="grid-item " key={item.id}>
            <Inner onClick={() => onMediaClick(item, i)}>
              <StyledImage
                onLoad={() => onImageLoad(i)}
                className="content"
                fluid={getImage(item).fluid}
              />
              {item.type === 'video' && (
                <VideoTease>
                  <h4>{item.title}</h4>
                </VideoTease>
              )}
              {item.type === 'video' && (
                <PlayIcon>
                  <Play />
                </PlayIcon>
              )}
            </Inner>
          </Item>
        ))}
      </Wrapper>
    </Container>
  )
}

export default MediaGrid

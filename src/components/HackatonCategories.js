import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { gutter, baseTransition, paragraphBottom } from '../vars'
import { useLocale } from '../localeContext'
import HackerTitle from './HackerTitle'
import AnimateIns from './AnimateIns'
import Grid from './Grid'
import BgImage from './BgImage'
import reportFile from '../../files/datadriven-innovation.pdf'

const StyledGrid = styled(Grid)`
  z-index: 3;
  position: relative;

  a {
    font-weight: bold;
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${gutter * 2}px;

  color: #222 !important;
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
const Parent = styled.div`
  padding: 10vh 0;
  padding-top: 15vh;
  position: relative;

  margin-bottom: ${gutter * 5}px;
  background-position: center;

  @media (max-width: 800px) {
    margin-top: ${gutter * 2}px;
    padding: 0;
  }

  &:after {
    position: absolute;
    bottom: -1px;
    top: -1px;
    left: -1px;
    right: -1px;
    display: block;

    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.84) 100%);
    content: '';
    opacity: 1;

    @media (max-width: 650px) {
      background: rgba(0, 0, 0, 0.34);
    }
  }

  ${BgImage} {
    position: absolute !important;
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.55);
      z-index: 1;
    }
  }
`

const Item = styled.div`
  text-align: center;
  position: relative;
  background: white;
  color: #222;
  padding: ${gutter * 2}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-direction: column;
  transition: all ${baseTransition};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 0px 18px rgba(255, 255, 255, 1);
  }

  h3 {
    color: #222;
  }
  @media (max-width: 800px) {
    h3 {
      font-size: 20px;
      font-weight: normal;
    }
  }
`

const Text = styled.div`
  p {
    font-size: 22px;
    margin-bottom: ${paragraphBottom}px;
  }
`
const HackatonCategories = props => {
  const parent = useRef()
  const t = useLocale()
  const {
    categories,
    text,
    title,
    image,
    challengesTitle,
    challengesText,
  } = props

  useEffect(() => {
    const elems = parent.current.getElementsByTagName('a')
    if (!elems) return

    const links = Array.prototype.slice.call(elems)
    links[0].href = reportFile
    links[0].target = '_blank'
  }, [])

  return (
    <Parent id="categories" ref={parent}>
      <BgImage {...image} />

      <StyledGrid>
        <AnimateIns>
          <HackerTitle title={title} as="h2" />
          <Text dangerouslySetInnerHTML={{ __html: text }} />
        </AnimateIns>
      </StyledGrid>
    </Parent>
  )
}

export default HackatonCategories

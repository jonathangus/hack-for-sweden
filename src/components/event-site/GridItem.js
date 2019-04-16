import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { gutter } from '../../vars'
import ArrowTitle from './ArrowTitle'

const Part = styled.div`
  height: 100%;
  position: relative;
  a {
    min-height: 100%;
    /* height: 160px; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-decoration: none;
    overflow: hidden;
    background: ${p => p.color};
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`

const Inner = styled.div`
  padding: ${gutter}px;
`
const Extra = styled.div`
  color: ${p => p.color};
  margin-top: ${gutter}px;
`
const Content = styled.div`
  position: relative;
  z-index: 5;
`
const Color = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: ${p => p.color};
  opacity: ${p => p.opacity};
`

const GridItem = props => {
  const { color, title, extra, to, externalUrl, children } = props
  const inner = (
    <Inner>
      <Color opacity={props.children ? 0.85 : 1} color={color.color} />
      <Content>
        <ArrowTitle color={color}>{title}</ArrowTitle>
        {extra && <Extra color={color.getTextColor()}>{extra}</Extra>}
      </Content>
      {children}
    </Inner>
  )

  const LinkComp = externalUrl ? (
    <a target="_blank" href={externalUrl}>
      {inner}
    </a>
  ) : (
    <Link to={to}>{inner}</Link>
  )

  return <Part>{LinkComp}</Part>
}

export default GridItem

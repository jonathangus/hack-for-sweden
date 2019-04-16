import React from 'react'
import styled, { keyframes } from 'styled-components'
import {
  bgFooter,
  sectionSpace,
  gutter,
  titleFont,
  secondaryColor,
} from '../vars'
import menuItems from '../menu-items'
import Grid from './Grid'
import { Link } from 'gatsby'
import anime from 'animejs'

const DELAY = 1800
const rotate = keyframes`
    0%{
        opacity: 0;
        transform: translateY(15px);
    }


    33% {
        opacity: 1;
        transform: translateY(0px);
    }
    66% {
        opacity: 0;
        transform: translateY(-15px);
    }

    100% {
        opacity: 0;
        transform: translateY(-15px);
    }
`
const Container = styled.div`
  position: relative;
  min-height: 40px;
  padding-left: 60px;
`

const rows = [
  ['We believe in', 'data'],
  ['and', 'source'],
  ['for an', 'society.'],
]

const Bro = styled.div`
  font-weight: bold;
  color: ${secondaryColor};
  font-family: ${titleFont};
  display: inline-block;
  position: absolute;
  left: 109px;
  margin-top: 1px;
`
const Space = styled.div`
  width: 49px;
`

const RowInner = styled.div`
  display: flex;
`
const Row = styled.div`
  position: absolute;
  animation: ${rotate} ${DELAY * 3}ms ease infinite;
  opacity: 0;

  &:nth-child(1) {
    opacity: 1;
  }

  &:nth-child(1) {
    ${RowInner} {
      margin-left: -48px;
    }
  }

  &:nth-child(2) {
    ${RowInner} {
      margin-left: 16px;
    }
  }

  &:nth-child(3) {
    ${RowInner} {
      margin-left: 0px;
    }
  }
`

class OpenDataTitle extends React.Component {
  parent = React.createRef()

  componentDidMount() {
    this.animte()
  }
  animte = () => {}
  render() {
    return (
      <Container ref={this.parent}>
        <Bro>open</Bro>
        <div>
          {rows.map((row, i) => (
            <Row
              className="bro-row"
              style={{ animationDelay: `${i * DELAY}ms` }}
              key={i}
            >
              <RowInner>
                <span>{row[0]}</span>
                <Space />
                <span>{row[1]}</span>
              </RowInner>
            </Row>
          ))}
        </div>
      </Container>
    )
  }
}

export default OpenDataTitle

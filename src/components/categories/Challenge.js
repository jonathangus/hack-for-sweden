import React from 'react'
import styled from 'styled-components'
import BgImage from '../BgImage'
import { gutter, titleFont } from '../../vars'
import get from 'lodash/get'
import Grid from '../Grid'

const colors = {
  health: 'linear-gradient(to bottom right,#328232,#000000)',
  buisness: 'linear-gradient(to bottom right,#002f4b,#dc4225)',
  labormarket:
    'linear-gradient(to bottom right,#ff9900,rgba(66, 44, 11, 0.6392156862745098))',
  environment:
    'linear-gradient(to bottom right,rgba(76, 175, 80, 0.74),#000000)',
  mobility: 'linear-gradient(to bottom right,#d02424,#000000)',
  education: 'linear-gradient(to bottom right,#03A9F4,#000000);',
}
const opacity = {
  labormarket: 1,
}

const Item = styled.div`
  position: relative;
  color: white;
`
const Title = styled.h1`
  position: relative;
  line-height: 1;
//   margin-bottom: ${gutter}px;
//   padding-bottom: ${gutter + 3}px;
//   /* font-size: 48px; */

  
`
const Divider = styled.div`
  width: 100%;
  margin: ${gutter * 2}px 0;
  height: 2px;
  background: white;
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: ${gutter * 9}px 0;

  @media (max-width: 800px) {
    padding: ${gutter * 4}px 0;
  }
`
const Body = styled.div`
  font-size: 22px;
  max-width: 600px;

  @media (max-width: 800px) {
    font-size: 16px;
  }
`

const Number = styled.div`
  font-weight: bold;
  font-size: 40px;
  font-family: ${titleFont};
  line-height: 1;
  margin-right: 10px;
`

const Part = styled.div`
  font-size: 26px;
  display: flex;
  align-items: top;

  margin-bottom: ${gutter * 2}px;

  &:last-child {
    margin: none;
  }
`

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    background: ${p => colors[p.slug] || 0.8};

    display: block;
    z-index: 1;
    opacity: ${p => opacity[p.slug] || 0.8};
  }
`

const Challenge = ({ challenge }) => {
  const challenges = get(challenge, 'challenges', []) || []

  return (
    <Item id={challenge.slug}>
      {challenge.image && (
        <Image slug={challenge.slug}>
          <BgImage {...challenge.image} />
        </Image>
      )}
      <Grid>
        <Content>
          <Title>{challenge.name}</Title>

          <Divider />
          <div>
            {challenges.map((c, i) => (
              <Part key={i}>
                <Number>{i + 1}.</Number>
                {c.title}
              </Part>
            ))}
          </div>
        </Content>
      </Grid>
    </Item>
  )
}

export default Challenge

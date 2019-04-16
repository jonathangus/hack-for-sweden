import styled from 'styled-components'
import React from 'react'

const Line = styled.span`
  position: absolute;
  background: white;
  transition: transform 0.3s ease;

  &:nth-of-type(1) {
    top: 0;
    left: 0;
    transform: translateX(-105%);
  }

  &:nth-of-type(2) {
    bottom: 0;
    left: 0;
    transform: translateX(-105%);
  }

  &:nth-of-type(3) {
    top: 0;
    left: 0;
    transform: translateY(-105%);
  }

  &:nth-of-type(4) {
    top: 0;
    right: 0;
    transform: translateY(-105%);
  }

  &:nth-of-type(1),
  &:nth-of-type(2) {
    width: 100%;
    height: 1px;
  }

  &:nth-of-type(3),
  &:nth-of-type(4) {
    height: 100%;
    width: 1px;
  }
`
const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export default () => (
  <Border>
    <Line className="line" />
    <Line className="line" />
    <Line className="line" />
    <Line className="line" />
  </Border>
)

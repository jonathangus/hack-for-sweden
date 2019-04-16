// @flow

import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
  color: ${p => p.color};

  svg {
    height: 0.7em;
    width: 0.7em;
    margin-right: 0.2em;

    fill: ${p => p.arrowColor};
    display: inline-block;
  }
`

const ArrowTitle = props => {
  return (
    <Title
      color={props.color.getTextColor()}
      arrowColor={props.color.getArrowColor()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124.1 117.18">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <polygon points="10.67 0.67 0.67 20.01 76.01 58.84 0.67 97.51 10.34 116.51 123.01 58.34 10.67 0.67" />
          </g>
        </g>
      </svg>
      {props.children}
    </Title>
  )
}

export default ArrowTitle

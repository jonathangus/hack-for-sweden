import React from 'react'
import styled from 'styled-components'

const Close = styled.div`
  position: absolute;

  width: 50px;
  height: 50px;
  overflow: hidden;
  top: -55px;
  right: -10px;
  cursor: pointer;
  :before,
  :after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 50%;
    margin-top: -1px;
    background: white;
    border-radius: 120% 0;
  }
  :before {
    transform: translate(-50%) rotate(45deg);
  }
  :after {
    transform: translate(-50%) rotate(-45deg);
  }
`

export default Close

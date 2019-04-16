import React from 'react'
import styled from 'styled-components'
import { gutter } from '../vars'

const Grid = styled.div`
  max-width: ${p => p.maxWidth || 1140}px;
  margin: 0 auto;
  padding: 0 ${gutter}px;
`

export default Grid

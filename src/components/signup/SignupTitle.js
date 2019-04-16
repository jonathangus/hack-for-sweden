import React from 'react'
import styled from 'styled-components'
import { gutter } from '../../vars'

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: ${gutter}px;
`

export default ({ children }) => <Title>{children}</Title>

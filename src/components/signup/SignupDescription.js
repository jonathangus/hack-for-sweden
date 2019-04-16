import React from 'react'
import styled from 'styled-components'
import { gutter } from '../../vars'

const Description = styled.div`
  font-size: 20px;
  margin-bottom: ${gutter}px;
`

export default ({ children }) => <Description>{children}</Description>

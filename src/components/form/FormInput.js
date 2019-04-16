import React, { useState } from 'react'
import styled from 'styled-components'
import { baseTransition } from '../../vars'

const Input = styled.input`
  font-size: 30px;

  @media (max-width: 800px) {
    font-size: 28px;
  }
`
const Wrapper = styled.div`
  margin-top: 32px;
  position: relative;
`

const Label = styled.div`
  position: absolute;
  pointer-events: none;
  transform-origin: left;
  transition: transform ${baseTransition}, font-size ${baseTransition};
  transform: ${p => (p.labelOnTop ? 'translateY(-60%)' : '')};
  font-size: ${p => (p.labelOnTop ? '18px' : '30px')};

  @media (max-width: 800px) {
    font-size: 28px;
  }
`

const FormInput = ({ value, onChange, label, as = 'input', ...rest }) => {
  const [isFocus, setFocus] = useState(false)
  const labelOnTop = isFocus || value

  return (
    <Wrapper>
      <Label labelOnTop={labelOnTop}>{label}</Label>
      <Input
        as={as}
        {...rest}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  )
}

export default FormInput

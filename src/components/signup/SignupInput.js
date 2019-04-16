import React, { useEffect, createRef } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import SignupAnimWrap from './SignupAnimWrap'
import SignupDescription from './SignupDescription'
import SignupTitle from './SignupTitle'

const Wrapper = styled.div``
const Input = styled.input`
  font-size: 60px;

  @media (max-width: 800px) {
    font-size: 28px;
  }
`
const TextArea = styled.textarea`
  font-size: 30px;

  @media (max-width: 800px) {
    font-size: 20px;
  }
`

const defaultIsValid = value => value.length > 1

const SignupInput = props => {
  const {
    type,
    value = '',
    field,
    direction,
    title,
    onChange,
    setValid,
    visible,
    isValid = defaultIsValid,
    description,
    placeholder,
  } = props

  const input = createRef()
  useEffect(
    () => {
      const valid = isValid(value)
      setValid(valid)
    },
    [value, visible]
  )
  useEffect(
    () => {
      if (visible) {
        input.current && input.current.focus()
      } else {
        input.current && input.current.blur()
      }
    },
    [visible]
  )

  const inputProps = {
    name: field,
    value,
    placeholder,
    onChange: e => onChange(e.target.value),
  }

  return (
    <SignupAnimWrap direction={direction}>
      <SignupTitle>{title}</SignupTitle>
      {description && <SignupDescription>{description}</SignupDescription>}
      <div>
        {type === 'textarea' ? (
          <TextArea ref={input} {...inputProps} />
        ) : (
          <Input autoComplete="disabled" ref={input} {...inputProps} />
        )}
      </div>
    </SignupAnimWrap>
  )
}

export default SignupInput

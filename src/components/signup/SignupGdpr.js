import React, { useEffect, createRef } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import SignupAnimWrap from './SignupAnimWrap'
import SignupDescription from './SignupDescription'
import SignupTitle from './SignupTitle'
import Checkbox from '../Checkbox'
import { useLocale } from '../../localeContext'

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

const SignupGdpr = props => {
  const {
    type,
    value = false,
    field,
    direction,
    onChange,
    setValid,
    visible,
    isValid = defaultIsValid,
  } = props
  const t = useLocale()

  useEffect(
    () => {
      const valid = isValid(value)
      setValid(valid)
    },
    [value, visible]
  )

  return (
    <SignupAnimWrap direction={direction}>
      <SignupTitle>{t('signup.gdpr.title')}</SignupTitle>
      <SignupDescription>{t('signup.gdpr.description')}</SignupDescription>
      <Checkbox
        label={t('signup.gdpr.accept')}
        checked={value}
        onChange={onChange}
      />
    </SignupAnimWrap>
  )
}

export default SignupGdpr

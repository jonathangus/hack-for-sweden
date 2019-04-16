import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import SignupAnimWrap from './SignupAnimWrap'
import Checkbox from '../Checkbox'
import { gutter } from '../../vars'
import SignupTitle from './SignupTitle'
import { useLocale } from '../../localeContext'

const roles = [
  'Developer',
  'Designer',
  'Entrepreneur',
  'Philosopher',
  'Dreamer',
  'Woman',
  'Man',
  'Dog',
]

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${gutter}px;
  margin-bottom: ${gutter * 4}px;
`

const Input = styled.input``

const SignupPartner = props => {
  const t = useLocale()
  const { value = [], direction, onChange, setValid, visible } = props

  return (
    <SignupAnimWrap direction={direction}>
      <SignupTitle>{t('signupPartner.title')}</SignupTitle>
      <Wrapper>
        {roles.map((r, i) => (
          <Checkbox
            label={r}
            key={i}
            checked={value.includes(r)}
            onChange={checked => updateSelection(r, checked)}
          />
        ))}
      </Wrapper>
      <SignupTitle>{t('roleSelect.other')}</SignupTitle>
      <Input
        value={extraValue}
        placeholder={t('roleSelect.placeholder')}
        onChange={onTypeChange}
      />
    </SignupAnimWrap>
  )
}

export default SignupPartner

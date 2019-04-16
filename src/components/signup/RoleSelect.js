import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import SignupAnimWrap from './SignupAnimWrap'
import Checkbox from '../Checkbox'
import { gutter } from '../../vars'
import SignupTitle from './SignupTitle'
import { useLocale } from '../../localeContext'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${gutter * 2}px;
  margin-bottom: ${gutter * 4}px;

  @media (max-width: 800px) {
    margin-bottom: ${gutter * 2}px;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Input = styled.input``

const RoleSelect = props => {
  const t = useLocale()
  const { value = [], direction, onChange, setValid, visible } = props
  const updateSelection = (role, checked) => {
    const newItems = checked ? [...value, role] : value.filter(v => v !== role)
    onChange(newItems)
  }
  useEffect(
    () => {
      const valid = value.filter(Boolean).length > 0
      setValid(valid)
    },
    [value, visible]
  )

  const roles = t('signup.roles').split(', ')
  const extraValue = value.find(v => !roles.includes(v)) || ''
  const onTypeChange = e => {
    const without = value.filter(v => roles.includes(v))
    onChange([...without, e.target.value])
  }

  return (
    <SignupAnimWrap direction={direction}>
      <SignupTitle>{t('roleSelect.title')}</SignupTitle>
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

export default RoleSelect

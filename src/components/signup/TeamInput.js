import React from 'react'
import styled from 'styled-components'
import { gutter } from '../../vars'
import { useLocale } from '../../localeContext'

const Input = styled.input`
  flex: 1;
  &:nth-child(1) {
    flex: 2;
    margin-right: ${gutter}px;
  }

  @media (max-width: 800px) {
    font-size: 16px;
  }
`
const Wrapper = styled.div`
  display: flex;
`

const TeamInput = props => {
  const { onChange, data = {}, autoFocus, index } = props
  const t = useLocale()

  const onInputChange = (e, key) => {
    onChange({
      ...data,
      [key]: e.target.value,
    })
  }

  return (
    <Wrapper>
      <Input
        value={data.name}
        onChange={e => onInputChange(e, 'name')}
        placeholder={t('name')}
        autoFocus={autoFocus}
        name={`team_name${index}`}
        autoComplete="disabled"
      />
      <Input
        value={data.role}
        onChange={e => onInputChange(e, 'role')}
        autoComplete="disabled"
        placeholder={t('role')}
        name={`role${index}`}
      />
    </Wrapper>
  )
}

export default TeamInput

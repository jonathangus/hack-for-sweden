import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import SignupAnimWrap from './SignupAnimWrap'
import Checkbox from '../Checkbox'
import { gutter } from '../../vars'
import SignupTitle from './SignupTitle'
import SignupDescription from './SignupDescription'
import { AddCircle } from 'grommet-icons'

import TeamInput from './TeamInput'
import { useLocale } from '../../localeContext'

const InputWrapper = styled.div`
  // display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${gutter * 2}px;
  margin: ${gutter * 2}px 0;

  @media (max-width: 800px) {
    margin: ${gutter}px 0;
    max-height: 200px;
    overflow: scroll;
  }
`
const AddRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;

  span {
    margin-left: 5px;
  }
`
const AnotherMember = styled.div``

const trimMembers = members => members.filter(a => a.role && a.name)

const SignupTeam = props => {
  const { value = {}, direction, onChange, setValid, visible } = props
  const { members = [], openForMembers } = value
  const t = useLocale()

  useEffect(
    () => {
      setValid(trimMembers(members).length > 0)
    },
    [value, visible]
  )

  const toggleMemberChoice = checked => {
    onChange({ members, openForMembers: checked })
  }
  const update = (newData, index) => {
    const newValues = members.map((d, i) => (index === i ? newData : d))

    onChange({ openForMembers, members: newValues })
  }

  const add = () => {
    onChange({
      members: [
        ...members,
        {
          name: '',
          role: '',
        },
      ],
    })
  }

  const inputs = members.map((data, i) => {
    let autoFocus
    if (members.length === 4) {
      autoFocus = i === 0
    } else {
      autoFocus = i === members.length - 1
    }
    return (
      <TeamInput
        autoFocus={autoFocus}
        onChange={v => update(v, i)}
        data={data}
        key={i}
        index={i}
      />
    )
  })

  return (
    <SignupAnimWrap direction={direction}>
      <SignupTitle>{t('signup.team.title')}</SignupTitle>
      <SignupDescription>{t('signup.team.description')}</SignupDescription>
      <AnotherMember>
        <Checkbox
          label={t('signup.team.moreMembers')}
          checked={openForMembers}
          onChange={toggleMemberChoice}
        />
      </AnotherMember>
      <InputWrapper>{inputs}</InputWrapper>
      {members.length < 8 && (
        <AddRow onClick={add}>
          <AddCircle />
          <span>{t('signup.team.add')}</span>
        </AddRow>
      )}
    </SignupAnimWrap>
  )
}

export default SignupTeam

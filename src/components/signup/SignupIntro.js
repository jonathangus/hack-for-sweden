import React, { useState } from 'react'
import styled from 'styled-components'
import AnimateIns from '../AnimateIns'
import HackerTitle from '../HackerTitle'
import uiEmitter, { events } from '../../uiEmitter'
import posed from 'react-pose'
import { Group, User } from 'grommet-icons'
import { gutter } from '../../vars'
import { useLocale } from '../../localeContext'
import Choice from './Choice'

const Header = styled.header`
  transition: transform 0.5s ease, opacity 0.3s ease;
  transform: translateY(${p => (p.show ? 0 : '-50%')});
  opacity: ${p => (p.show ? 1 : 0)};
  padding: 300px 0;
  text-align: center;
  position: relative;
  z-index: 5;
`

const Label = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`

const HackatonInfo = styled.div`
  font-size: 22px;
`
const Choices = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${gutter * 2}px;
`

const Select = styled.div`
  margin-top: ${gutter * 4}px;
`

const SelectText = styled.h2`
  display: block;
`

const SignupIntro = ({ onSelect }) => {
  const t = useLocale()
  const [selectedType, setSelectedType] = useState()

  const setSelected = sel => {
    setSelectedType(sel)

    setTimeout(() => {
      onSelect(sel)
    }, 400)
  }
  return (
    <Header show={Boolean(!selectedType)}>
      <AnimateIns onDone={() => uiEmitter.emit(events.heroLoaded)}>
        <HackerTitle as="h2" title={t('signupIntro.title')} />
        <HackatonInfo>{t('signupIntro.date')}</HackatonInfo>
        <HackatonInfo>{t('signupIntro.extra')}</HackatonInfo>
        <Select>
          <SelectText>{t('signupIntro.joinAs')}</SelectText>
          <Choices>
            <Choice
              url="https://media.giphy.com/media/l0IynCcC1gqsEyNAk/giphy.gif"
              onClick={() => setSelected('solo')}
            >
              <Label>{t('solo')}</Label>
              <User color="white" size="large" />
            </Choice>
            <Choice
              url="https://media.giphy.com/media/krM6ANSNvFg52/giphy.gif"
              onClick={() => setSelected('group')}
            >
              <Label>{t('team')}</Label>
              <Group color="white" size="large" />
            </Choice>
          </Choices>
        </Select>
      </AnimateIns>
    </Header>
  )
}

export default SignupIntro

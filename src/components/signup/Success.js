import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocale } from '../../localeContext'
import { Checkmark } from 'grommet-icons'
import AnimateIns from '../AnimateIns'
import HackerTitle from '../HackerTitle'
import { gutter } from '../../vars'

const Icon = styled.div`
  margin-bottom: ${gutter * 2}px;
`
const Message = styled.div`
  font-size: 22px;
  margin-top: ${gutter}px;
`
const Container = styled.div`
  text-align: center;
  position: relative;
  z-index: 5;
`

const Success = () => {
  const t = useLocale()

  return (
    <Container>
      <AnimateIns>
        <Icon>
          <Checkmark color="#2ecc71" size="xlarge" />
        </Icon>
        <HackerTitle title={t('signup.success.title')} />
        <Message>{t('signup.success.message')}</Message>
      </AnimateIns>
    </Container>
  )
}

export default Success

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import Categories from '../Categories'
import SignupAnimWrap from './SignupAnimWrap'
import SignupTitle from './SignupTitle'
import { useLocale } from '../../localeContext'
import SignupDescription from './SignupDescription'
import { Link } from 'gatsby'

const ReadMore = styled(Link)``

const SignupCategory = props => {
  const { onChange, direction, setValid, value = [], visible } = props
  const t = useLocale()

  useEffect(
    () => {
      const valid = value.length > 0
      setValid(valid)
    },
    [value, visible]
  )

  return (
    <SignupAnimWrap direction={direction}>
      <SignupTitle>{t('signup.category.title')}</SignupTitle>
      <SignupDescription>
        {t('signup.category.description')}
        <ReadMore href="/hackaton#categories">
          {' '}
          {t('signup.category.readMore')}
        </ReadMore>
      </SignupDescription>

      <Categories selected={value} onChange={onChange} />
    </SignupAnimWrap>
  )
}

export default SignupCategory

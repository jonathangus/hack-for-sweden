import React from 'react'
import styled from 'styled-components'
import sweFlag from '../images/sweden.png'
import ukFlag from '../images/uk.png'
import { useLocale } from '../localeContext'
import { Link } from 'gatsby'

const Wrapper = styled(Link)`
  width: 35px;
  display: inline-block;
  cursor: pointer;

  img {
    with: 100%;
    display: block;
  }
`

const LanguageSelect = ({ pathname }) => {
  const t = useLocale()
  const flag = t.locale === 'en-US' ? sweFlag : ukFlag
  const url = t.translateUrl(pathname)
  return null
  return (
    <Wrapper to={url}>
      <img src={flag} />
    </Wrapper>
  )
}

export default LanguageSelect

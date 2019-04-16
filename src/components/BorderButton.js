import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { titleFont, dark } from '../vars'
import { useLocale } from '../localeContext'

const Inner = styled.span`
  transition: transform 0.3s ease;
  display: inline-block;
`

const styles = `
background: transparent;
border: 2px solid white;
display: inline-block;
padding: 10px 16px;
text-decoration: none;
font-family: ${titleFont};
font-weight: bold;
position: relative;
z-index: 1;
overflow: hidden;
cursor:pointer;
font-size: inherit;
transition: color 0.25s ease;


&:after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: white;
  transform: translateX(-100%);
  transition: transform 0.4s ease;
  z-index: -1;
}
`

const LinkNode = styled(Link)`
  ${styles};
  border-color: ${p => p.color};
  color: ${p => p.color};

  &:after {
    background: ${p => p.color};
  }

  &:hover {
    color: ${p => p.active};
  }

  &:hover {
    > span {
      cursor: ${p =>
        p.disabled ? 'transform: scale(1)' : 'transform: scale(0.85)'};
    }
    &:after {
      transform: ${p =>
        p.disabled ? 'transform: translateX(-100%)' : 'translateX(0%)'};
    }
  }
`
const Button = styled.button`
  ${styles};

  border-color: ${p => p.color};
  color: ${p => p.color};
  opacity: ${p => (p.disabled ? 0.5 : 1)};

  &:after {
    background: ${p => p.color};
  }

  &:hover {
    color: ${p => (p.disabled ? p.color : p.active)};
    cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  }

  &:hover {
    > span {
      cursor: ${p =>
        p.disabled ? 'transform: scale(1)' : 'transform: scale(0.85)'};
    }
    &:after {
      transform: ${p =>
        p.disabled ? 'transform: translateX(-100%)' : 'translateX(0%)'};
    }
  }
`

const BorderButton = props => {
  const {
    to,
    children,
    active = dark,
    color = 'white',
    type = 'submit',
    onClick,
    disabled,
  } = props

  const t = useLocale()

  if (to) {
    return (
      <LinkNode color={color} active={active} to={t.url(to)}>
        <Inner>{children}</Inner>
      </LinkNode>
    )
  }

  return (
    <Button
      disabled={disabled}
      color={color}
      active={active}
      type={type}
      onClick={onClick}
    >
      <Inner>{children}</Inner>
    </Button>
  )
}

export default BorderButton

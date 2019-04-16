import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { gutter, secondaryColor } from '../vars'
import Modal from './Modal'
import { Action } from 'grommet-icons'
import Border from './Border'
import { useLocale } from '../localeContext'

const selectedAnim = keyframes`
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${gutter * 2}px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const Item = styled.div`
  text-align: center;
  position: relative;

  @media (max-width: 800px) {
    h3 {
      font-size: 14px;
      font-weight: normal;
    }
  }

  svg {
    @media (max-width: 800px) {
      height: 24px;
      width: 24px;
    }
  }
`

const animation = () =>
  css`
    ${selectedAnim} 0.4s ease;
    animation-iteration-count: 1;
  `

const Inner = styled.div`
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: ${p => (p.selected ? 1 : 0.5)};
  transform: scale(1);
  animation: ${p => p.selected && animation};
  padding: ${gutter * 4}px ${gutter}px;

  &:hover {
    .line {
      transform: translate(0px);
    }
  }

  @media (max-width: 800px) {
    padding: ${gutter}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`
const ReadMore = styled.div`
  color: ${secondaryColor};

  @media (max-width: 800px) {
    display: none;
  }
`

const Icon = styled.div``

const Categories = props => {
  const [showModal, setModal] = useState(false)
  const [target, setTarget] = useState(null)
  const t = useLocale()

  const { categories, selected, onChange } = props
  const onClick = cat => {
    const exist = selected.includes(cat.node.name)
    const newItems = exist
      ? selected.filter(s => s !== cat.node.name)
      : [...selected, cat.node.name]
    onChange(newItems)
  }

  const show = cat => {
    setTarget({
      title: cat.name,
      body: cat.text,
    })
    setModal(true)
  }

  const hide = cat => {
    setModal(false)

    setTimeout(() => {
      setTarget(null)
    }, 400)
  }

  return (
    <React.Fragment>
      <Wrapper>
        {categories.map(cat => (
          <Item key={cat.node.id}>
            <Inner
              selected={selected.includes(cat.node.name)}
              onClick={() => onClick(cat)}
            >
              <Border />
              <Icon>
                <Action size="large" color="white" />
              </Icon>
              <h3>{cat.node.name}</h3>
            </Inner>
            {/* <ReadMore onClick={() => show(cat)}>
              {t('categories.readmore')}
            </ReadMore> */}
          </Item>
        ))}
      </Wrapper>

      <Modal close={hide} visible={showModal} data={target} />
    </React.Fragment>
  )
}

export default Categories

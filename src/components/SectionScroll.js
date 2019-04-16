import styled from 'styled-components'
import React from 'react'
import { gutter, secondaryColor, baseTransition } from '../vars'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  padding: ${gutter * 2}px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 570px) {
    display: block;
  }
`

const Part = styled.div`
color:white;
  /* padding: 0 ${gutter / 2}px; */
  display: flex;
  align-items: center;
  line-height: 1;
  z-index:2;
  margin-bottom: ${gutter}px;
  position:relative;
  font-size:26px;
  color:white-space;
  cursor:pointer-events;
  margin-left: ${gutter * 2}px;
  cursor: pointer;
  &:before {
      content:"";
      display:block;
    width: 70%;
    height: 80%;
    background: linear-gradient(45deg, ${secondaryColor}, #000110);
    position: absolute;
    left: -4px;
    bottom: 0;
    transform-origin: 0 0;
    z-index: -1;
    transform:scale3d(0,1,1);
    transition: transform ${baseTransition};
  }

  &:hover:before {
      transform:scale3d(1,1,1);
  }

  &:after {
    content: '';
    height: 60%;
    margin-top:7px;
    margin-left: ${gutter * 2}px;
    width: 1px;
    background: white;
    display: block;
  }

  &:last-child:after {
      display: none
  }

  @media (max-width: 570px) {
    font-size: 18px;
    position:relative;
    padding-left:30px;

    &:after {
      width: 14px;
      height: 1px;
      position: absolute;
      left: 0;
      margin:0;
      display: block !important;
      top: 50%;
    }
  }
`

// const FAQLink = styled()

const SectionScroll = ({ items }) => {
  const onClick = hash => {
    const elem = document.getElementById(hash)

    if (!elem || !window.scrollTo) return

    window.scrollTo({
      top: elem.offsetTop,
      behavior: 'smooth',
    })
  }
  return (
    <Wrapper>
      {items.map((item, i) => (
        <Part
          onClick={() => onClick(item.hash)}
          as={item.hash ? 'div' : Link}
          key={i}
          to={item.url}
        >
          {item.title}
        </Part>
      ))}
    </Wrapper>
  )
}

export default SectionScroll

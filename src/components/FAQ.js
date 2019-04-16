import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import scrollMonitor from 'scrollmonitor'
import {
  gutter,
  baseTransition,
  baseTransitionMs,
  scrollOffset,
  secondaryColor,
} from '../vars'

const Item = styled.div`
  margin-bottom: ${gutter * 3}px;
`
const Title = styled.h2`
  position: relative;
  display: inline-block;
  z-index: 3;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: translateY(${p => (p.show ? 0 : '10px')});
  transition: opacity ${baseTransition}, transform ${baseTransition};

  ${p =>
    p.smallTitle &&
    `
      font-size: 22px;
  
      @media (min-width: 800px) {
        font-size: 28px;
      }
  `}
`

const Body = styled.div`
  opacity: ${p => (p.show ? 1 : 0)};
  transform: translateY(${p => (p.show ? 0 : '10px')});
  transition: opacity ${baseTransition}, transform ${baseTransition};
  transition-delay: 50ms;

  p {
    font-size: 18px;
  }
`
const Bar = styled.div`
  width: 60%;
  height: 45%;
  background: linear-gradient(45deg, ${secondaryColor}, #000110);
  position: absolute;
  left: -4px;
  bottom: 0;
  transform-origin: 0 0;
  z-index: -1;
  transition: transform ${baseTransition};
  transform: ${p => (p.show ? 'scale3d(1,1,1)' : 'scale3d(0,1,1)')};
  transition-delay: 320ms;
`
const FAQ = ({ title, body, smallTitle }) => {
  const item = useRef()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const watcher = scrollMonitor.create(item.current, scrollOffset)
    watcher.enterViewport(() => {
      setShow(true)
      watcher.destroy()
    })

    return () => {
      watcher.destroy()
    }
  }, [])

  return (
    <Item ref={item}>
      <Title smallTitle={smallTitle} show={show}>
        {title}
        <Bar show={show} />
      </Title>
      <Body dangerouslySetInnerHTML={{ __html: body }} show={show} />
    </Item>
  )
}

export default FAQ

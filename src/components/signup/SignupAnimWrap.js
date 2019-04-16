import React, { useEffect } from 'react'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'

const AnimItemPose = posed.div({
  current: {
    opacity: 1,
    y: '0px',
    delay: 300,
    duration: 500,
    // delay: ({ i }) => {
    //   console.log
    //   return i * 150 + 450
    // },
    // transition: { type: 'spring' },
    // transition: { y: { duration: 700 } },
    // transition: ({ i }) => ({ delay: i * 50 + 1200 }),
  },
  out: {
    opacity: 0,
    y: '-40px',
    delay: 100,
    duration: 500,
    // transition: { y: { duration: 400 } },
    // transition: { type: 'spring' },
    // transition: ({ i }) => ({ delay: i * 100 }),
  },
  in: {
    opacity: 0,
    y: '40px',

    delay: 100,
    // transition: { y: { duration: 400 } },
    // transition: ({ i }) => ({ delay: i * 100 }),
  },
})

const AnimItem = styled(AnimItemPose)`
  @media all and (-ms-high-contrast: none) {
    opacity: ${p => p.direction === 'current' && 1} !important;
    ${p =>
      p.direction === 'current' && 'transform: translateY(0px) translateZ(0px)'}
  }
`

const Wrapper = posed.div({
  current: {
    staggerChildren: 10,
    staggerDirection: -1,
    duration: 500,
  },
  in: {
    staggerChildren: 10,
    staggerDirection: -1,
    duration: 500,
  },
  out: {
    // delay: 1300,
    staggerDirection: -1,
    staggerChildren: 10,
    duration: 500,
  },
})

const SignupAnimWrap = props => {
  const { direction, children } = props
  const nodes = React.Children.map(children, (child, i) => {
    if (!child) return null
    return (
      <AnimItem direction={direction} i={i} className="js-reset" key={i}>
        {child}
      </AnimItem>
    )
  }).filter(Boolean)

  return (
    <Wrapper initialPose="in" pose={direction}>
      {nodes}
    </Wrapper>
  )
}

export default SignupAnimWrap

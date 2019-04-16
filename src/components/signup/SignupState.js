import React, { useState, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import BorderButton from '../BorderButton'
import { gutter, textColor } from '../../vars'
import { useLocale } from '../../localeContext'
import Loader from '../Loader'
import Success from './Success'
import get from 'lodash/get'

const Wrapper = styled.div`
  width: 100%;
`
const Main = styled.div`
  position: relative;
  z-index: 5;

  @media (max-width: 1220px) {
    padding-right: ${gutter * 2 + 16}px;
  }
`
const Nav = styled.div`
  position: absolute;
  z-index: 5;
  right: ${gutter * 2}px;
  top: 50%;
  transform: translateY(-50%);
`
const NavItem = styled.div`
  margin: 16px 0;
  width: 16px;
  height: 16px;
  opacity: ${p => (p.ok ? 1 : 0.5)};
  position: relative;
  cursor: ${p => (p.ok ? 'pointer' : 'auto')};
  transform: ${p =>
    p.isCurrent && 'perspective(1000px) rotate3d(0,1,0,180deg)'};
  transition: transform 0.3s ease;

  &:after,
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    content: '';
    text-indent: 0;
    backface-visibility: hidden;
  }

  &:before {
    background-color: ${p => p.isCurrent && '#fffed8'};
  }

  &:after {
    transform: perspective(1000px) rotate3d(0, 1, 0, 180deg);
  }
`
const Form = styled.form`
  position: relative;
  width: 100%;
  @media all and (-ms-high-contrast: none) {
    height: 100vh;
  }
`

const Item = styled.div`
  position: absolute;
  width: 100%;
  pointer-events: ${p => (p.visible ? 'all' : 'none')};
  // visibility: ${p => (p.visible ? 'visible' : 'hidden')};
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`

const NextStep = styled.div`
  position: absolute;
  right: ${gutter * 2}px;
  bottom: ${gutter * 2}px;
  text-align: right;
  z-index: 5;
`
const EnterText = styled.div`
  color: ${textColor};
  margin-top: ${gutter}px;

  @media (max-width: 800px) {
    display: none;
  }
`

const valueReducer = (state, action) => {
  return {
    ...state,
    [action.field]: action.value,
  }
}

const defaultValues = {
  role: [],
  category: [],
  team: {
    openForMembers: true,
    members: Array(4)
      .fill()
      .map((a, i) => ({
        name: '',
        role: '',
      })),
  },
}

const url = ' https://nodejs-1y3bxgxz2.now.sh'

const createSignup = (values, isSolo, email) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isSolo,
      values,
      email,
    }),
  })
}

class SignupState extends React.Component {
  onEnter = e => {
    if (e.keyCode === 13) {
      this.props.onContinue()
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.onEnter)
  }
  componentWillUnmount() {
    window.removeEventListener('keypress', this.onEnter)
  }

  render() {
    const {
      children,
      formState,
      setFormState,
      validCount,
      visible,
      setValid,
      selected,
      valid,
      onContinue,
      goToStep,
      isLastStep,
      t,
      isCreating,
      success,
    } = this.props
    const count = React.Children.count(children)

    if (success) {
      return <Success />
    } else if (isCreating) {
      return <Loader />
    }

    const nodes = React.Children.map(children, (child, i) => {
      const { field } = child.props
      const visible = selected === i
      let direction
      if (selected < i) {
        direction = 'in'
      } else if (selected === i) {
        direction = 'current'
      } else {
        direction = 'out'
      }

      return (
        <Item visible={visible}>
          {React.cloneElement(child, {
            value: formState[field] || defaultValues[field] || '',
            visible,
            setValid: isValid => visible && setValid(isValid),
            direction,
            onChange: value => {
              setFormState({
                value,
                field,
              })
            },
          })}
        </Item>
      )
    })
    const onSubmit = e => {
      e.preventDefault()
      onContinue()
    }

    return (
      <Wrapper>
        <Main>
          <Form onSubmit={onSubmit}>{nodes}</Form>
        </Main>
        <Nav>
          {Array(count)
            .fill()
            .map((a, i) => (
              <NavItem
                onClick={() => goToStep(i)}
                isCurrent={i === selected}
                ok={validCount >= i}
                key={i}
              />
            ))}
        </Nav>
        <NextStep>
          <BorderButton disabled={!valid} onClick={onContinue}>
            {t(isLastStep ? 'signup.complete' : 'signup.continue')}
          </BorderButton>
          <EnterText>{t('signup.enter')}</EnterText>
        </NextStep>
      </Wrapper>
    )
  }
}

const order = ['name', 'email', 'description', 'category', 'role', 'partner']
const grouporder = [
  'email',
  'description',
  'partner',
  'team',
  'openForMembers',
  'teamSize',
]

export default props => {
  const [selected, setSelected] = React.useState(0)
  const [valid, setValid] = React.useState(0)
  const [validCount, setValidCount] = React.useState(0)
  const [formState, setFormState] = useReducer(valueReducer, {})
  const [isCreating, setCreating] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const count = React.Children.count(props.children)
  const isLastStep = count - 1 === selected
  const { solo } = props

  const submitForm = async () => {
    setCreating(true)

    const finalFormState = {
      ...formState,
      team: undefined,
      members: get(formState, 'team.members'),
      openForMembers: get(formState, 'team.openForMembers'),
    }

    if (!solo) {
      const members = finalFormState.members || []
      finalFormState.teamSize = members.filter(a => a.role).length
    }

    const selectedOrder = solo ? order : grouporder

    const result = Object.keys(finalFormState)
      .filter(key => {
        if (key === 'partner') {
          return true
        }

        return typeof finalFormState[key] !== 'undefined'
      })
      .filter(key => key !== 'gdpr')
      .sort((a, b) => selectedOrder.indexOf(a) > selectedOrder.indexOf(b))
      .map(key => {
        const value = finalFormState[key] || ''

        if (key === 'members') {
          return value.filter(a => a.role).map(a => `${a.name} (${a.role})`)
        }
        if (key === 'openForMembers') {
          return value ? 'Yes' : 'No'
        }
        return value
      })
      .map(value => {
        if (typeof value == 'string') return value
        if (typeof value === 'number') return value
        return value.join(', ')
      })

    try {
      createSignup(result, solo, finalFormState.email)
      setSuccess(true)
      setCreating(false)
      props.setSuccess(true)
    } catch (e) {
      alert('Error when signing up. Contact us at info@hackforsweden.se')
      setCreating(false)
    }
  }

  const t = useLocale()

  const onContinue = () => {
    if (!valid) {
      return
    }
    const newIndex = selected + 1

    if (newIndex > count - 1) {
      submitForm()
      return
    }

    setSelected(newIndex)
    if (newIndex > validCount) {
      setValidCount(newIndex)
    }
  }

  const goToStep = step => {
    if (validCount >= step) {
      setSelected(step)
    }
  }

  const childProps = {
    setFormState,
    onContinue,
    formState,
    validCount,
    selected,
    goToStep,
    setValid,
    valid,
    isLastStep,
    t,
    success,
    isCreating,
  }

  return <SignupState {...props} {...childProps} />
}

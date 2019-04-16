import React, { useState } from 'react'
import styled from 'styled-components'
import Grid from '../Grid'
import Loader from '../Loader'
import Checkbox from '../Checkbox'
import { useLocale } from '../../localeContext'
import FormInput from '../form/FormInput'
import {
  bgHero,
  gutter,
  titleFont,
  baseTransition,
  baseTransitionMs,
  secondaryColor,
  bgColor,
} from '../../vars'
import HackerTitle from '../HackerTitle'

const Part = styled.div`
  margin-top: 30px;
  text-align: center;
`
const SubmitButton = styled.button`
  font-weight: bold;
  font-family: ${titleFont};
  background-color: ${secondaryColor};
  color: white;
  text-decoration: none;
  color: white;
  font-size: 22px;
  border: 1px solid ${secondaryColor};
  padding: 15px 20px;
  border-radius: 30px;
  display: inline-block;
  cursor: pointer;
  transition: transform ${baseTransition};
  &:hover {
    transform: scale(1.1);
  }
`
const Wrapper = styled.div`
  margin: 10vh auto;
  max-width: 700px;
  position: relative;
`
const Form = styled.form``
const Screen = styled.div`
  position: absolute;
  left: -30px;
  top: -30px;
  bottom: -30px;
  right: -30px;
  background: ${bgColor};
  z-index: 5;
  align-items: center;
  justify-content: center;
  display: flex;
`

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const postForm = data => {
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({ 'form-name': 'partner', ...data }),
  })
}

const PartnerForm = () => {
  const t = useLocale()
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    message: '',
    openData: false,
  })
  const [isLoading, setLoading] = useState(false)
  const [isDone, setDone] = useState(false)

  const onChange = (key, value) => {
    setFormState({ ...formState, [key]: value })
  }
  const onSubmit = async e => {
    e.preventDefault()

    if (formState.bot) return

    const isValid = Object.keys(formState).every(key => {
      if (key === 'openData') return true

      return Boolean(formState[key])
    })

    if (!isValid) return
    setLoading(true)

    try {
      await postForm(formState)
      setLoading(false)
      setDone(true)
    } catch (e) {
      alert(
        'Problem sending this form. Please contact us at info@hackforsweden.se'
      )
      setLoading(false)
    }
  }
  const showScreen = isLoading || isDone

  return (
    <Wrapper>
      <Grid>
        <h3>{t('partnerform.title')}</h3>
        <Form
          onSubmit={onSubmit}
          name="partner"
          method="post"
          netlify="true"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {showScreen && (
            <Screen>
              {isLoading && <Loader />}
              {isDone && <h2>{t('partnerform.complete')}</h2>}
            </Screen>
          )}
          <input type="hidden" name="form-name" value="partner" />
          <input
            hidden
            name="bot-field"
            onChange={e => onChange('bot', e.target.value)}
          />
          <FormInput
            onChange={e => onChange('email', e.target.value)}
            label={t('partnerform.email')}
            required
            value={formState.email}
            name="email"
          />
          <FormInput
            onChange={e => onChange('name', e.target.value)}
            label={t('partnerform.name')}
            required
            value={formState.name}
            name="name"
          />
          <FormInput
            as="textarea"
            onChange={e => onChange('message', e.target.value)}
            rows={4}
            required
            label={t('partnerform.description')}
            value={formState.message}
            name="description"
          />
          <Part>
            <Checkbox
              onChange={checked => onChange('openData', checked)}
              label={t('partnerform.open')}
              checked={formState.openData}
              name="openData"
            />
          </Part>
          <Part>
            <SubmitButton type="submit">{t('partnerform.send')}</SubmitButton>
          </Part>
        </Form>
      </Grid>
    </Wrapper>
  )
}

export default PartnerForm

import React, { useState } from 'react'
import SignupState from './SignupState'
import SignupInput from './SignupInput'
import SignupCategory from './SignupCategory'
import RoleSelect from './RoleSelect'
import { useLocale } from '../../localeContext'
import SignupTeam from './SignupTeam'
import SignupGdpr from './SignupGdpr'

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const Team = ({ setSuccess }) => {
  const t = useLocale()

  return (
    <SignupState setSuccess={setSuccess} solo={false}>
      <SignupInput
        placeholder="email@example.com"
        field="email"
        type="email"
        title={t('signup.email.title')}
        isValid={validateEmail}
      />
      <SignupInput
        field="description"
        type="textarea"
        title={t('signup.description.title')}
        description={t('signup.teamDescription.description')}
      />
      <SignupTeam field="team" />
      {/* <SignupCategory field="category" /> */}
      <SignupInput
        field="partner"
        title={t('signup.partner.title')}
        description={t('signup.partner.description')}
        isValid={() => true}
      />
      <SignupGdpr field="gdpr" isValid={value => value} />
    </SignupState>
  )
}

export default Team

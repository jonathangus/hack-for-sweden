import React from 'react'
import styled from 'styled-components'
import { sectionSpace, titleFont, gutter } from '../vars'

import twitter from 'simple-icons/icons/twitter'
import facebook from 'simple-icons/icons/facebook'
import youtube from 'simple-icons/icons/youtube'
import linkedin from 'simple-icons/icons/linkedin'
import instagram from 'simple-icons/icons/instagram'

const Container = styled.div`
  display: flex;
  justify-content: ${p => (p.footer ? 'flex-end' : 'center')};
  margin-top: ${p => (p.footer ? 0 : gutter * 2)}px;
`
const Icon = styled.a`
  margin: 0 9px;
  transition: opacity 0.3s ease;
  opacity: ${p => (p.footer ? 1 : 0.8)};
  &:hover {
    opacity: 1;
  }
  svg {
    fill: white;
    width: 20px;
  }
`

const icons = [
  {
    icon: twitter,
    url: 'https://twitter.com/hackforsweden',
  },
  {
    icon: facebook,
    url: 'https://www.facebook.com/hack4sweden/',
  },
  {
    icon: linkedin,
    url: 'https://www.linkedin.com/company/hack-for-sweden/',
  },
  {
    icon: youtube,
    url: 'https://www.youtube.com/channel/UC-dICY0izVpAse7rb9k4KPQ',
  },
  {
    icon: instagram,
    url: 'https://www.instagram.com/hackforsweden/',
  },
]

class SocialMedia extends React.Component {
  render() {
    const { footer } = this.props

    return (
      <Container footer={footer}>
        {icons.map(icon => (
          <Icon
            footer={footer}
            key={icon.icon.title}
            target="_blank"
            href={icon.url}
            dangerouslySetInnerHTML={{ __html: icon.icon.svg }}
          />
        ))}
      </Container>
    )
  }
}

export default SocialMedia

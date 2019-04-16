import React from 'react'
import styled from 'styled-components'
import { gutter, titleFont } from '../../vars'
import { useLocale } from '../../localeContext'

const Content = styled.div``
const Item = styled.div`
  margin-bottom: ${gutter}px;

  &:last-child {
    margin-bottom: 0;
  }
`
const Value = styled.div`
  ul {
    padding-left: 40px;

    li {
      padding: 3px 0;
    }
  }
`
const Label = styled.div`
  font-family: ${titleFont};
  font-weight: bold;
`
const BasicData = ({ team, withCategory }) => {
  const t = useLocale()
  const keys = [
    {
      key: 'challenge',
    },
    {
      key: 'contact',
      render: () => <a href={`mailto:${team.contact}`}>{team.contact}</a>,
    },
    {
      key: 'presentation',
      render: () => (
        <a
          target="_blank"
          without
          rel="noopener noreferrer"
          href={team.presentation}
        >
          {t('winner.linkToPresentation')}
        </a>
      ),
    },

    {
      key: 'openData',
    },
    {
      key: 'motivation',
    },
  ]

  if (withCategory) {
    keys.unshift({
      key: 'category',
      render: () => t(`winners.${team.category}`),
    })
  }

  return (
    <Content>
      {keys.filter(part => team[part.key]).map(part => (
        <Item key={part.key}>
          <Label>{t(`winnerKey.${part.key}`)}:</Label>
          <Value>
            {part.render ? (
              part.render()
            ) : (
              <div dangerouslySetInnerHTML={{ __html: team[part.key] }} />
            )}
          </Value>
        </Item>
      ))}
    </Content>
  )
}

export default BasicData

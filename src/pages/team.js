import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import withHead from '../hocs/withHead'
import Seo from '../components/Seo'
import Form from '../components/Form'
import ImageIntro from '../components/ImageIntro'
import Persons from '../components/Persons'
import { useLocale } from '../localeContext'

const Page = ({ data }) => {
  const persons = get(data, 'allContentfulPerson.edges')
  const pm = persons.filter(p => p.node.type === 'Project Management')
  const adv = persons.filter(p => p.node.type === 'Advisory Board')
  const steer = persons.filter(p => p.node.type === 'Steering Committee')
  const node = get(data, 'allContentfulTeam.edges[0].node') || {}
  const t = useLocale()

  return (
    <article>
      <Seo data={node.seo} />
      <ImageIntro title={node.title} image={node.image} />
      <Persons prio persons={pm} title={t('projectManagement')} />
      <Persons persons={steer} title={t('steeringCommittee')} />
      <Persons persons={adv} title={t('advisoryBoard')} />
    </article>
  )
}

export const query = graphql`
  query($locale: String) {
    allContentfulTeam(
      limit: 1
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          id
          title

          image {
            sizes(maxWidth: 1280) {
              ...GatsbyContentfulSizes
            }
          }

          seo {
            title
            description {
              description
            }
            image {
              file {
                url
                fileName
                contentType
              }
            }
          }
        }
      }
    }

    allContentfulPerson(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [createdAt], order: ASC }
    ) {
      edges {
        node {
          name
          id
          email
          type
          company
          role
          image {
            fluid(maxWidth: 380, quality: 90) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default withHead(Page)

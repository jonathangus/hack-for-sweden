import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styled from 'styled-components'
import Seo from '../components/Seo'
import Grid from '../components/Grid'
// import IntroText from '../components/IntroText'
import Image from 'gatsby-image'
import { gutter, textColor } from '../vars'
// import Title from '../components/Title'
// import colors from '../colors'
import HackerTitle from '../components/HackerTitle'
import withHead from '../hocs/withHead'
import uiEmitter, { events } from '../uiEmitter'

const juries = {
  mobility: {
    title: 'Mobility',
    team: [
      'Annica Wallenbro Stojcevski, Business Group Lead Data & AI, Microsoft',
      'Elias Arnestrand, Project Manager Mobility, Nordic Innovation House Silicon Valley',
      'Fredrik Lemon, Senior Advisor IT, Trafikverket',
      'Fredric Skargren, Digital Strategist, Transportstyrelsen',
      'Jesper Johansson, Sustainable Mobility Expert, Swedish Incubators and Science Parks',
    ],
  },
  labor: {
    title: 'Labor Market',
    team: [
      'Olle Lundin, Founder, Swedish JobTech',
      'Christian Landgren, CEO, Iteam Solutions',
      'Karin Åslund, Project Manager, Arbetsgivarverket',
      'Lauri Reuter, Senior Specialist of Disruptive Tech, Singularity University Nordics',
      'Tim Gustafsson, Solution Architect, Amazon Web Services',
    ],
  },
  environment: {
    title: 'Environment',
    team: [
      'Jon Pelling, Naturskyddsföreningen',
      'Lars Wiigh, EU & Business Development Executive, IBM',
      'Anne Årneby, CEO, Nordic Morning',
      'Lars Boström, Webb Coordinator, Konsumentverket',
      'Louise König, Sustainability Director, Coop',
    ],
  },
  business: {
    title: 'Business Sector',
    team: [
      'Livia Moore, Marketing and PR Director, Antler',
      'Julia Delin, CEO, SSE Business Lab',
      'Annie Lindmark, Program Manager,Vinnova',
      'Celine Berggreen-Clausen, Strategic Change Leader of Digitalization, Malmö Stad',
    ],
  },
  health: {
    title: 'Health Sector',
    team: [
      'Jesper Enander, Director of Psychology, KRY',
      'Henrik Passmark, Scientist, Socialstyrelsen',
      'Seija Bäcklund, Head of Innovation, Migrationsverket',
      'Miikka Nevasalo, COO, Ultrahack',
    ],
  },
  education: {
    title: 'Education and Science',
    team: [
      'Arash Sangari, Program Manager, Tillväxtverket',
      'Henrik Göthberg, Founder of Dairdux',
      'Gabriel Gardell, Project Manager, Uppsala Universitet',
      'Karin Jansdotter Queseth, Enterprise Architect, Patent och Registreringsverket',
    ],
  },
}
const Part = styled.div`
  margin-bottom: ${gutter * 4}px;

  &:last-child {
    margin-bottom: 0;
  }
`
const Content = styled.div`
  margin-top: ${gutter}px;

  @media (min-width: 830px) {
    display: flex;
  }
`
const Group = styled.div``
const Person = styled.div``
const Face = styled.div`
  max-width: 170px;
  flex: 1;
  margin-right: ${gutter * 2}px;

  @media (max-width: 830px) {
    margin-bottom: ${gutter * 2}px;
    margin-right: 0;
    max-width: 300px;
    max-height: 350px;
    overflow: hidden;
  }
`
const StyledIntroText = styled.div`
  border-bottom: 1px solid ${textColor};
  margin-bottom: ${gutter}px;
  padding-bottom: ${gutter}px;
  max-width: 650px;
`
const Body = styled.div`
  h2 {
    margin-top: ${gutter * 2}px;
  }
`

const Top = styled.div`
  margin: 15vh 0;
  text-align: center;
`

const Page = ({ data }) => {
  const seo = get(data, 'allContentfulSeo.edges[0].node')
  const title = get(data, 'intro.headline')
  const body = get(data, 'intro.body.childMarkdownRemark.html')
  const persons = get(data, 'allContentfulPerson.edges', []).map(p => p.node)
  juries.labor.leader = persons.find(p => p.name === 'Filippa Jennersjö') || {}
  juries.mobility.leader = persons.find(p => p.name === 'Sara Selldahl') || {}
  juries.environment.leader =
    persons.find(p => p.name === 'Mikael Ahlström') || {}
  juries.business.leader =
    persons.find(p => p.name === 'Susanne Fuglsang') || {}
  juries.health.leader = persons.find(p => p.name === 'Ishtar Touailat') || {}
  juries.education.leader = persons.find(p => p.name === 'Magnus Enzell') || {}
  const juryLongText = get(data, 'juryLongText', {})

  React.useEffect(() => {
    uiEmitter.emit(events.heroLoaded)
  }, [])

  return (
    <React.Fragment>
      <Seo data={seo} />
      <Grid>
        <Top>
          <HackerTitle title={title} />
          <div
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
        </Top>
        {Object.values(juries).map((item, i) => (
          <Part key={i}>
            <HackerTitle as="h2" title={`${item.title} Jury`} c />
            <Content>
              <Face>
                <Image {...item.leader.image} />
              </Face>
              <div>
                <StyledIntroText>
                  Head of the {item.title} Jury is {item.leader.name},{' '}
                  {item.leader.role},{item.leader.company}
                </StyledIntroText>
                <Group>
                  {item.team.map((p, k) => (
                    <Person key={k}>{p}</Person>
                  ))}
                </Group>
              </div>
            </Content>
          </Part>
        ))}

        <div>
          <h2>{juryLongText.headline}</h2>
          <Body
            dangerouslySetInnerHTML={{
              __html: juryLongText.body.childMarkdownRemark.html,
            }}
          />
        </div>
      </Grid>
    </React.Fragment>
  )
}

export const query = graphql`
  {
    intro: contentfulText(
      node_locale: { eq: "en-US" }
      identifier: { eq: "jury-groups-hack-for-sweden-2019" }
    ) {
      headline
      body {
        childMarkdownRemark {
          html
        }
      }
    }

    juryLongText: contentfulText(
      node_locale: { eq: "en-US" }
      identifier: { eq: "jury-long-text" }
    ) {
      headline
      body {
        childMarkdownRemark {
          html
        }
      }
    }

    allContentfulPerson {
      edges {
        node {
          name
          role
          company
          image {
            sizes(maxWidth: 1280) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }

    allContentfulSeo(
      filter: { node_locale: { eq: "en-US" }, slug: { eq: "hackathon-jury" } }
    ) {
      edges {
        node {
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
`

export default withHead(Page)

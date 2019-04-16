import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { gutter, sectionSpace } from '../vars'
import Grid from './Grid'
import get from 'lodash/get'
import HackerTitle from './HackerTitle'
import AnimateIns from './AnimateIns'
import Person from './Person'

const List = styled.div`
  display: grid;
  @media (min-width: 650px) {
    grid-row-gap: ${gutter * 2}px;
    grid-column-gap: ${gutter * 2}px;
    grid-template-columns: repeat(
      auto-fit,
      minmax(${p => (p.prio ? 300 : 225)}px, 1fr)
    );
  }

  // @media (min-width: 650px) {
  //   grid-row-gap: ${gutter * 2}px;
  //   grid-column-gap: ${gutter * 2}px;
  //   grid-template-columns: repeat(
  //     auto-fit,
  //     minmax(${p => (p.prio ? 250 : 175)}px, 1fr)
  //   );
  // }

  @media (max-width: 650px) {
    grid-row-gap: ${gutter}px;
    grid-column-gap: ${gutter}px;
    grid-template-columns: ${p => (p.prio ? '1fr' : '1fr 1fr')};
    font-size: 13px;
  }
`
const Wrapper = styled.div`
  @media (min-width: 650px) {
    padding: 24px;
  }
`
const Container = styled.div`
  margin: ${sectionSpace} 0;
`

const Title = styled.div`
  margin-bottom: ${gutter}px;
`

class Persons extends React.Component {
  render() {
    const { persons, title, prio } = this.props

    return (
      <Container>
        <Grid>
          <Wrapper ref={this.container}>
            <AnimateIns>
              <Title>
                <HackerTitle as="h2" title={title} />
              </Title>
            </AnimateIns>
            <List prio={prio}>
              {persons.map(person => (
                <Person
                  prio={prio}
                  person={person}
                  key={get(person, 'node.id')}
                />
              ))}
            </List>
          </Wrapper>
        </Grid>
      </Container>
    )
  }
}

export default Persons

import React from 'react'
import styled from 'styled-components'
import Grid from './Grid'
import AnimteIns from './AnimateIns'
import { sectionSpace } from '../vars'
import { body } from '../render'

const Container = styled.section`
  padding: 20px 0;
  text-align: center;

  @media (min-width: 800px) {
    padding: ${sectionSpace} 0;
  }
`
const Text = styled.div``
const Title = styled.h2`
  p {
    &:before {
      content: '"';
    }

    &:after {
      content: '"';
    }
  }

  @media (max-width: 800px) {
    font-size: 26px;
  }

  @media (max-width: 500px) {
    font-size: 22px;
  }
`

class Quote extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Container>
        <Grid>
          <AnimteIns>
            <Title dangerouslySetInnerHTML={{ __html: body(data.quote) }} />
            <Text dangerouslySetInnerHTML={{ __html: body(data.author) }} />
          </AnimteIns>
        </Grid>
      </Container>
    )
  }
}

export default Quote

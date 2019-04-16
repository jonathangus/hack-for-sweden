import React from 'react'
import styled from 'styled-components'
import HackerTitle from './HackerTitle'
import uiEmitter, { events } from '../uiEmitter'
import Grid from './Grid'
import AnimteIns from './AnimateIns'
import { gutter, bgColor, paragraphBottom, sectionSpace } from '../vars'
import BorderButton from './BorderButton'

const Container = styled.section`
  padding: ${sectionSpace} 0;
`
const Text = styled.div`
  margin: 0 auto;

  p {
    font-size: 18px;
    margin-bottom: ${paragraphBottom}px;

    @media (min-width: 800px) {
      font-size: 22px;
    }
  }
`

class BasicText extends React.Component {
  scroll = () => {
    document.querySelector('form').scrollIntoView({ behavior: 'smooth' })
  }
  render() {
    const { text, scrollToContact } = this.props

    return (
      <Container>
        <Grid maxWidth={700}>
          <AnimteIns>
            <Text dangerouslySetInnerHTML={{ __html: text }} />
            {scrollToContact && (
              <BorderButton onClick={this.scroll}>Contact us here</BorderButton>
            )}
          </AnimteIns>
        </Grid>
      </Container>
    )
  }
}

export default BasicText

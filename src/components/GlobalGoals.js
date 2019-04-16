import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { sectionSpace, paragraphBottom, scrollOffset } from '../vars'
import Grid from './Grid'
import HackerTitle from './HackerTitle'
import AnimateIns from './AnimateIns'
import scrollMonitor from 'scrollmonitor'
import { LocaleContextConsumer } from '../localeContext'

const Container = styled.div`
  margin: ${sectionSpace} 0;
`
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;

  flex-wrap: wrap;
`

const Item = styled.div`
  transition: filter 1s ease, opacity 0.45s ease;
  opacity: ${p => (p.show ? 1 : 0)};
  filter: grayscale(${p => (p.show ? 0 : 1)});
  width: 100px;

  @media (min-width: 800px) {
    width: 150px;
  }

  @media (min-width: 1400px) {
    width: 250px;
  }
`

const Text = styled.div`
  p {
    font-size: 22px;
    margin-bottom: ${paragraphBottom}px;
  }
`
const DELAY_IN_MS = 35

class GlobalGoals extends React.Component {
  container = React.createRef()

  state = {
    show: undefined,
  }

  componentDidMount() {
    this.watcher = scrollMonitor.create(this.container.current, scrollOffset)
    this.watcher.enterViewport(() => {
      this.watcher.destroy()
      this.setState({ show: true })
    })
  }

  componentWillUnmount() {
    this.watcher.destroy()
  }

  render() {
    const { images, text } = this.props
    const { show } = this.state

    return (
      <LocaleContextConsumer>
        {t => (
          <Container id="globalGoals">
            <Grid>
              <AnimateIns>
                <HackerTitle title={t('globalGoals.title')} as="h2" />
                <Text dangerouslySetInnerHTML={{ __html: text }} />
              </AnimateIns>
            </Grid>
            <Wrapper ref={this.container}>
              {images.map((image, i) => (
                <Item
                  show={show}
                  style={{ transitionDelay: `${i * DELAY_IN_MS}ms` }}
                  className="js-reset"
                  key={i}
                >
                  <Img {...image.node.childImageSharp} />
                </Item>
              ))}
            </Wrapper>
          </Container>
        )}
      </LocaleContextConsumer>
    )
  }
}

export default GlobalGoals

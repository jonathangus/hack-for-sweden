import React from 'react'
import styled from 'styled-components'
import vids from './vids'
import TeaserVideo from './TeaserVideo'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #2a2d31;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33.3333333%, 1fr));
  pointer-events: none;

  @media (max-width: 1200px) {
    ${p =>
      !p.personPage &&
      ` grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));`}
  }

  @media (max-width: 800px) {
    display: block;
  }

  @media (max-width: 1000px) {
    ${p => p.personPage && ` display: block`}
  }
`

const Elem = styled.div``

class Videos extends React.Component {
  render() {
    const final = this.props.videos || vids

    return (
      <Wrapper>
        {final
          .filter(f => f.mp4Source)
          .map((vid, i) => (
            <Elem key={i}>
              <TeaserVideo video={vid} />
            </Elem>
          ))}
      </Wrapper>
    )
  }
}

export default Videos

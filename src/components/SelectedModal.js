import React from 'react'
import styled from 'styled-components'
import {
  gutter,
  titleFont,
  dark,
  scrollOffset,
  sectionSpace,
  baseTransition,
} from '../vars'
import { Link } from 'gatsby'
import uiEmitter, { events } from '../uiEmitter'
import Grid from './Grid'

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 400;
  pointer-events: ${p => (p.show ? 'all' : 'none')};
  background: rgba(0, 0, 0, ${p => (p.show ? '0.75' : 0)});
  transition: transform ${baseTransition}, opacity ${baseTransition};
`
const Wrapper = styled.div`
  position: relative;
  position: fixed;
  top: 20vh;
  width: 100%;
  z-index: 410;
  pointer-events: none;
`
const Inner = styled.div`
  padding: ${gutter * 2}px;
  background: #f2f5fa;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: translateY(${p => (p.show ? 30 : 0)}px);
  transition: transform ${baseTransition}, opacity ${baseTransition};
  color: #222;
  pointer-events: ${p => (p.show ? 'all' : 'none')};

  h2 {
    color: #222;
  }
`

class SelectedModal extends React.Component {
  state = {
    show: false,
    data: {},
  }

  componentDidMount() {
    uiEmitter.on(events.modal, this.showModal)
  }

  componentWillMount() {
    uiEmitter.off(events.modal, this.showModal)
  }

  hide = () => {
    this.setState({ show: false })
  }

  showModal = data => {
    this.setState({
      show: true,
      data,
    })
  }

  render() {
    const { show, data } = this.state
    const { title, body } = data
    return (
      <React.Fragment>
        <Overlay show={show} onClick={this.hide} />
        <Wrapper show={show}>
          <Grid>
            <Inner show={show}>
              <h2>{title}</h2>
              {body}
            </Inner>
          </Grid>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default SelectedModal

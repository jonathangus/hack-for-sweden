import React from 'react'
import uiEmitter, { events } from '../uiEmitter'

// import {
//   TransitionGroup,
//   Transition as ReactTransition,
// } from "react-transition-group"

const timeout = 250
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

class Transition extends React.Component {
  // state = {
  //   trigger: false,
  // }

  // componentDidMount() {
  //   uiEmitter.on(events.pageTransitionDone, this.continue)
  // }

  // componentWillUnmount() {
  //   uiEmitter.off(events.pageTransitionDone, this.continue)
  // }

  // continue = () => {
  //   this.setState(
  //     {
  //       trigger: true,
  //     },
  //     () => {
  //       this.setState({
  //         trigger: false,
  //       })
  //     }
  //   )
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.state.trigger && nextState.trigger) {
  //     return true
  //   } else if (this.state.trigger && !nextState.trigger) {
  //     return false
  //   }

  //   uiEmitter.emit(events.pageTransitionStart)
  //   return false
  // }
  render() {
    const { children, location } = this.props

    return children
  }
}

export default Transition

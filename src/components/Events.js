import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  gutter,
  textColor,
  titleColor,
  secondaryColor,
  scrollOffset,
} from '../vars'
import Grid from './Grid'
import anime from 'animejs'
import scrollMonitor from 'scrollmonitor'
import moment from 'moment'
import get from 'lodash/get'
import LocationIcon from '../icons/Location'
import Modal from './Modal'
import Border from './Border'

const Container = styled.section`
  position: relative;
  margin-top: 20px;

  @media (min-width: 800px) {
    margin-top: 150px;
  }
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  display: grid;
  margin: 0 auto;
  overflow: hidden;
  @media (min-width: 400px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));

    grid-row-gap: ${gutter * 2}px;
    grid-column-gap: ${gutter * 2}px;
  }
`

const Title = styled.h3`
  font-size: 26px;
`

const Date = styled.h4`
  color: ${secondaryColor};
  font-size: 16px;
`

const Number = styled.div`
  font-size: 60px;
  line-height: 1;
`

const Text = styled.div``
const Location = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 18px;
    width: 18px;
    margin-right: 5px;

    path {
      fill: ${textColor};
    }
  }
`
const Info = styled.div``

const Event = styled.li`
  padding: ${gutter * 2}px;
  list-style-type: none;
  position: relative;

  &:hover {
    .line {
      transform: ${p => p.upcoming && 'translate(0)'};
    }
  }
`
const Inner = styled.div`
  opacity: ${p => (p.upcoming ? 1 : 0.5)};
  cursor: ${p => (p.upcoming ? 'pointer' : 'normal')};
`

class Events extends React.Component {
  list = React.createRef()

  state = {
    show: false,
    selected: null,
  }

  componentDidMount() {
    this.watcher = scrollMonitor.create(this.list.current, scrollOffset)

    const animation = anime({
      targets: this.list.current.querySelectorAll('li'),
      delay: (el, index) => index * 130,
      autoplay: false,
      scale: [0.75, 1],
      opacity: [0, 1],
    })

    this.watcher.enterViewport(() => {
      this.watcher.destroy()
      this.setState({
        show: true,
      })

      animation.play()
    })
  }

  componentWillUnmount() {
    this.watcher.destroy()
  }

  setModal = item => {
    this.setState({ selected: item.node })
  }

  getEvent = (event = {}, i) => {
    const { node = {} } = event
    const { title, location, startDate, endDate } = node
    let date = ''

    if (node.date) {
      date = node.date
    } else if (startDate) {
      date = moment(startDate).format('MMMM Do')
      if (endDate) {
        date += ` - ${moment(endDate).format('Do')}`
      }
    }

    const upcoming = moment()
      .subtract(10, 'days')
      .isBefore(moment(startDate))

    return (
      <Event
        upcoming={upcoming}
        onClick={() => upcoming && this.setModal(event)}
        className="u-opacity"
        key={i}
      >
        <Inner upcoming={upcoming}>
          <Date>{date}</Date>
          <Info>
            <Title>{title}</Title>
            {location && (
              <Location>
                <LocationIcon />
                {location}
              </Location>
            )}
          </Info>

          <Border />
        </Inner>
      </Event>
    )
  }

  render() {
    const { events } = this.props
    const { selected } = this.state
    return (
      <Container>
        <Modal
          close={() => this.setState({ selected: null })}
          visible={Boolean(selected)}
          data={selected}
        />
        <Grid maxWidth={1600}>
          <List ref={this.list}>{events.map(this.getEvent)}</List>
        </Grid>
      </Container>
    )
  }
}

export default Events

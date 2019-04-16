import React from 'react'

class LazyImage extends React.Component {
  image = React.createRef()

  componentDidMount() {
    const { src } = this.props

    this.image.current.src = src
  }

  render() {
    return <img ref={this.image} />
  }
}

export default LazyImage

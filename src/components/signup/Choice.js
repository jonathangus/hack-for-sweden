import React from 'react'
import styled from 'styled-components'
import { gutter } from '../../vars'
import ReactDOM from 'react-dom'

const ChoiceWrapper = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: transform 0.3s ease, opacity 0.3s ease;
  cursor: pointer;
  margin: 0 ${gutter}px;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`
const ImageElem = styled.img`
  width: 320px;
  height: 180px;
  z-index: 10;
  margin-left: 20px;
  margin-top: 20px;
  position: absolute;

  @media (max-width: 700px) {
    display: none;
  }
`

const ImageLol = ({ pos, url }) => {
  const el = document.getElementById('imageGif')
  const node = <ImageElem src={url} style={pos} />
  return ReactDOM.createPortal(node, el)
}

const Choice = ({ onClick, children, url }) => {
  const [pos, setPos] = React.useState({})
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const myImage = new Image()
    myImage.url = url
  }, [])

  const onMouseMove = e => {
    setPos({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    })
  }

  const onMouseLeave = () => {
    setShow(false)
  }
  const onMouseEnter = () => {
    setShow(true)
  }

  return (
    <ChoiceWrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={() => {
        onClick()
        setShow(false)
      }}
    >
      {children}
      {show && <ImageLol url={url} pos={pos} />}
    </ChoiceWrapper>
  )
}

export default Choice

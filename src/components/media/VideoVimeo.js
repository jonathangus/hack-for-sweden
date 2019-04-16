import React from 'react'

const VideoVimeo = ({ id }) => {
  return (
    <iframe
      src={`https://player.vimeo.com/video/${id}?color=ffffff&title=0"`}
      width="560"
      height="315"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
    />
  )
}

export default VideoVimeo

import React from 'react'

const VideoYoutube = ({ id }) => (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
)

export default VideoYoutube

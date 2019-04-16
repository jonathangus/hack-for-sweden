import React from 'react'
import Helmet from 'react-helmet'
import { createGlobalStyle } from 'styled-components'
import {
  bgColor,
  textColor,
  titleFont,
  titleColor,
  secondaryColor,
  gutter,
} from '../vars'
import favicon from '../images/favicon.png'

const GlobalStyle = createGlobalStyle`

html {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}
*, *::before, *::after {
  box-sizing: inherit;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
  -webkit-text-fill-color: white !important;
  -webkit-box-shadow: 0 0 0px 1000px ${bgColor} inset;
}


*::-webkit-media-controls-panel {
  display: none!important;
  -webkit-appearance: none;
}

*::-webkit-media-controls-play-button {
  display: none!important;
  -webkit-appearance: none;
}

*::-webkit-media-controls-start-playback-button {
  display: none!important;
  -webkit-appearance: none;
}

video::-webkit-media-controls {
    display:none !important;
}


body {
  background-color: ${bgColor};
  font-family: 'Niramit', sans-serif;
  color: ${textColor};
  font-size: 16px;
  line-height: 1.5;
  transition: background-color 0.3s ease;
}

img {
  max-width: 100%;
}
input {
  border-radius: none;
}

h1,h2,h3,h4 {
  font-weight: bold;
  font-family:  ${titleFont};
  color: ${titleColor};
}

h1 {
  font-size: 38px;
  color: white;

  @media (min-width: 800px) {
    font-size: 68px;
  }


  @media (min-width: 1200px) {
    font-size: 94px;
  }
}

h2 {
  font-size: 32px;
  
  @media (min-width: 800px) {
    font-size: 38px;
  }
}

img {
  // box-shadow: 2px 2px 3px #000;
}

a {
  color: ${secondaryColor};
  text-decoration: none;
}

p {
  margin-bottom: ${gutter}px;

  &:last-child {
    margin-bottom: 0;
  }
}

textarea,
input {
  -webkit-appearance: none;
  outline: none;
  border: none
  background: none;
  border-bottom: 2px solid white;
  width: 100%;
  color: white;
  font-family: inherit;
  font-size: 22px;
  line-height: 1.5;
  padding: 10px 0;
  border-radius: 0;

}

.u-opacity {
  opacity: 0;
}
`
const resetStyle = `
.js-reset {
  opacity: 1 !important;
  transform: none !important;
}
.js-opacity {
  opacity: 1 !important;
}
.js-transform {
  transform: none !important;
}
.js-reveal {
  display: none;
}
`

export default Component => {
  class Comp extends React.Component {
    render() {
      return (
        <div>
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css?family=Niramit|IBM+Plex+Sans:400,600,700"
              rel="stylesheet"
            />
            {/* <link rel="preload" href={mp4Source} as="video" type="video/mp4" /> */}
            <link rel="shortcut icon" type="image/png" href={favicon} />
          </Helmet>
          <noscript>
            <style>{resetStyle}</style>
          </noscript>
          <GlobalStyle />
          <Component {...this.props} />
        </div>
      )
    }
  }

  return Comp
}

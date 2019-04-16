import React from 'react'
import styled from 'styled-components'
import Grid from './Grid'
import Helmet from 'react-helmet'

const Container = styled.div`
  padding: 10vh 0;
  background: #fff;
`

const inner = `<script type="text/javascript" charset="utf-8" id="mnd-script"> (function(){var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="//hack-for-sweden.mynewsdesk.com/hosted_newsroom.js";var i=document.getElementsByTagName('script')[0];i.parentNode.insertBefore(s,i);})();</script>`
class Press extends React.Component {
  render() {
    return (
      <Container>
        <Grid>
          <div className="container" id="press" />
          <iframe
            id="settings-widget"
            src="https://www.mynewsdesk.com/story_widgets/3883"
            height="800"
            border="0"
            width="100%"
            scroll="no"
            frameborder="0"
          />
        </Grid>
      </Container>
    )
  }
}

export default Press

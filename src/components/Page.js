import React from 'react'
import Seo from './Seo'
import MainHero from './MainHero'
import Header from './Header'
import TextIntro from './TextIntro'
import ParallaxImages from './ParallaxImages'
import LatestNews from './LatestNews'
import ImageDivider from './ImageDivider'
import Events from './Events'
import Footer from './Footer'

const body = `<p>
We're now expanding the government mission Hack for Sweden. To entail not only a single event but a movement that is present all year round.
</p>
<p>
Our aim is citizen-driven innovation and we will present more about this movement at several gatherings all year round. Stay tuned for more information, this is just the beginning.
</p>
`
class Page extends React.Component {
  render() {
    const { page } = this.props

    return (
      <article>
        <Seo title="Hack for sweden" />
        <Header />
        <MainHero title="Hack for Sweden" youtube="Y1n8btrFnoU" />
        <TextIntro title="Hack for Sweden 365" body={body} />
        <ParallaxImages />
        <LatestNews />
        <ImageDivider />
        <Events />
        <Footer />
      </article>
    )
  }
}

export default Page

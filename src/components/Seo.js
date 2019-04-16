import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

class Seo extends React.Component {
  render() {
    const { data, index } = this.props
    const extra = index ? '' : ' - Hack for Sweden'
    const title = get(data, 'title') + extra
    const description = get(data, 'description.description')
    const imageUrl = get(data, 'image.file.url') || ''
    const image = `https:${imageUrl}`

    return (
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {/* <meta property="og:url" content="https://hackforsweden.se" /> */}
        <meta property="og:type" content="website" />
        <meta name="description" content={description} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@jontgus" />
        <meta name="twitter:image" content={image} />

        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />

        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Hack for Sweden" />
        <meta name="image" content={image} />
        <html lang="en" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-43885727-5"
        />
      </Helmet>
    )
  }
}

export default Seo

let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken:
    process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
}

const contentfulConfigSecond = {
  spaceId: '25z746q9cwtc',
  accessToken:
    '32b139b4ab821fea8b94650f32aafebe9f88a815e9482c71bf5c0a8681e18ec3',
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `media`,
        path: `${__dirname}/images/media`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `event-partners`,
        path: `${__dirname}/images/partners/event`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `colab-partners`,
        path: `${__dirname}/images/partners/collaborating`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `global-goals`,
        path: `${__dirname}/images/global-goals`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `other`,
        path: `${__dirname}/images/other`,
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfigSecond,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-43885727-10',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Hack for Sweden',
        short_name: 'starter',
        start_url: '/',
        background_color: '#00010f',
        theme_color: '#00010f',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-netlify',
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`),
      },
    },
  ],
}

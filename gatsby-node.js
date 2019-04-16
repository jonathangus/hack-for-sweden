const path = require('path')

const pages = [
  {
    url: 'co-working',
    title: 'Co-working space',
  },
  {
    url: 'fast-track',
    title: 'Fast Track Program',
  },
  {
    url: 'incubator',
    title: 'Incubator Program',
  },
  {
    url: 'mentorship',
    title: 'Mentorship / Consultant',
  },
  {
    url: 'domain',
    title: 'Domain, storage etc',
  },
  {
    url: 'other',
    title: 'Other',
  },
]

exports.sourceNodes = async ({ actions }) => {
  const template = path.resolve(`src/templates/prizeCategory.js`)

  const { createPage } = actions
  return new Promise(resolve => {
    pages.forEach(page =>
      createPage({
        path: `prizes/${page.url}`,
        component: template,
        context: {
          page,
          locale: 'en-US',
          pageId: page.url,
        },
      })
    )

    resolve()
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path.includes('404')) {
    return Promise.resolve()
  }

  return new Promise(resolve => {
    const newPath = page.path === '/' ? '/' : page.path.slice(0, -1)
    const newPage = {
      ...page,
      path: `/sv${newPath}`,
      context: { locale: 'sv-SE' },
    }
    const newPage2 = {
      ...page,
      path: newPath,
      context: { locale: 'en-US' },
    }
    deletePage(page)
    createPage(newPage)
    createPage(newPage2)
    resolve()
  })
}

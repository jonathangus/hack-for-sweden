import get from 'lodash/get'

const b = field => {
  if (typeof field === 'string') return field

  const html = get(field, 'childMarkdownRemark.html')
  if (html) return html

  return ''
}

export const body = b
export const renderBody = b

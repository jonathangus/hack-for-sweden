import locales from '../locales.json'

const defaultLanguage = 'en-US'

const languages = ['en-US', 'sv-SE']

const t = (key, language) => {
  if (!locales[key]) {
    console.error(`Missing locale for ${key}`)
    return key
  }

  const index = languages.indexOf(language || defaultLanguage)
  return locales[key][index] || key
}

export default t

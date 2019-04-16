import React, { createContext, useContext } from 'react'
import locale from './locale'

const LocaleContext = createContext()

function LocaleContextProvider(props) {
  const value = key => {
    return locale(key, props.locale)
  }
  value.url = url => {
    if (props.locale == 'en-US') {
      return url
    }

    if (url === '/') {
      return '/sv'
    }
    return `/sv${url}`
  }
  value.locale = props.locale
  value.translateUrl = url => {
    if (props.locale == 'en-US') {
      return `/sv${url}`
    }
    const [sv, ...final] = url.split('/sv')
    return final.join('')
  }

  return (
    <LocaleContext.Provider value={value}>
      {props.children}
    </LocaleContext.Provider>
  )
}

const LocaleContextConsumer = LocaleContext.Consumer

const useLocale = () => {
  return useContext(LocaleContext)
}

export { useLocale, LocaleContextProvider, LocaleContextConsumer }

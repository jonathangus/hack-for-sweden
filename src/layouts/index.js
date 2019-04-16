import React from 'react'
import Transition from '../transition/PageTransition'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { LocaleContextProvider } from '../localeContext'

const noFooter = [
  '/signup',
  '/signup/',
  '/dream-for-sweden',
  '/dream-for-sweden/',
]

const TemplateWrapper = ({ children, location, pageContext, ...rest }) => {
  const { pathname } = location
  const darkLogo =
    pathname === '/sweden-innovation-week' ||
    pathname === '/sweden-innovation-week/'
  return (
    <article>
      <div id="imageGif" />
      <LocaleContextProvider locale={pageContext.locale}>
        <Header pathname={pathname} darkLogo={darkLogo} />
        <Transition location={location}>{children}</Transition>
        {!noFooter.includes(pathname) && <Footer />}
      </LocaleContextProvider>
    </article>
  )
}

export default TemplateWrapper

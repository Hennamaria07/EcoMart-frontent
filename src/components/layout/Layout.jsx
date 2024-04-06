import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Layout = ({ children, title, description, keyword, author, viewport}) => {
  return (
    <div>
        <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
            <meta name="author" content={author} />
              <meta name="viewport" content={viewport} />
              </Helmet>
              </HelmetProvider>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout
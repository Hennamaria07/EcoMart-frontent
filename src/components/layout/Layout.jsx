import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Layout = ({ children}) => {
  return (
    <div>
        {/* <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
            <meta name="author" content={author} />
              <meta name="viewport" content={viewport} />
              </Helmet>
              </HelmetProvider> */}
        <Header />
        <main className='min-h-[90vh]'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout
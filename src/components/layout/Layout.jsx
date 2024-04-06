import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children}) => {
  return (
    <div>
        <Header />
        <main className='min-h-[100vh] pt-[65.6px]'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout
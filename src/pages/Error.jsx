import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const NotFount = () => {
    return (
        <Layout>
             <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Oops! Page Not Found - EcoMart</title>
        <meta name="description" content="Lost in the wilderness of the internet? Don't worry! Navigate back to EcoMart's lush aisles. Shop sustainably. Shop smartly. Shop at EcoMart."/>
          <meta name="keywords" content="EcoMart, e-commerce, MERN stack, sustainable shopping, online marketplace, eco-friendly products, 404 page, lost page" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </Helmet>
              </HelmetProvider>
            <section className='h-[60vh] container'>
                <div className="text-sm pt-10 breadcrumbs">
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li>404 Error</li>
                    </ul>
                </div>
                       <div className='h-full text-center grid place-content-center'>
                       <h1 className='text-4xl sm:text-6xl font-semibold line-clamp-2'>404 Not Found</h1>
                        <p className='pt-5 pb-10'>Your visited page not found. You may go home page.</p>
                        <Link to={'/'}>
                        <button className="btn btn-primary">Back to home page</button>
                        </Link>
                       </div>
            </section>
        </Layout>
    )
}

export default NotFount
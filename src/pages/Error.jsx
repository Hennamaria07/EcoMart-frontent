import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

const NotFount = () => {
    return (
        <Layout>
            <section className='px-16 h-[60vh] md:px-40'>
                <div className="text-sm pt-10 breadcrumbs">
                    <ul>
                        <li><Link>Home</Link></li>
                        <li><Link>404 Error</Link></li>
                    </ul>
                </div>
                       <div className='h-full grid place-content-center'>
                       <h1 className='text-4xl sm:text-6xl font-semibold line-clamp-2'>404 Not Found</h1>
                        <p className='pt-5 pb-10'>Your visited page not found. You may go home page.</p>
                        <button className="btn btn-primary">Back to home page</button>
                       </div>
            </section>
        </Layout>
    )
}

export default NotFount
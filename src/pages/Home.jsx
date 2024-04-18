import React from 'react'
import { BestDeals, Carousel, HeroCategory, HeroPrdouct, Layout } from '../components'

const Home = () => {
  return (
    <Layout>
        <section >
            <Carousel />
            <BestDeals />
            <HeroCategory />
            <HeroPrdouct />
        </section>
    </Layout>
  )
}

export default Home
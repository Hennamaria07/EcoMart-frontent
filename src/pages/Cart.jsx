import React from 'react'
import Layout from '../components/layout/Layout'
import { CartTable, Step } from '../components'

const Cart = () => {
  return (
    <Layout>
        <Step />
        <CartTable />
    </Layout>
  )
}

export default Cart
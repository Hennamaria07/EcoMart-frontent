import React from 'react'
import { AdminSideBar, CategoryCard, CategoryForm, Layout } from '../../components'

const Category = () => {
  return (
    <Layout>
        <AdminSideBar />
        <CategoryForm />
        <CategoryCard />
    </Layout>
  )
}

export default Category
import React from 'react'
import { Link } from 'react-router-dom'

const EditProductBreadCrumbs = () => {
  return (
    <section className="container text-sm breadcrumbs pt-[58px] grid place-content-center pb-5">
  <ul>
    <li><Link to={'/admin'}>Dashboard</Link></li> 
    <li><Link to={'/admin/products'}>Products</Link></li> 
    <li>Edit Product</li>
  </ul>
</section>
  )
}

export default EditProductBreadCrumbs
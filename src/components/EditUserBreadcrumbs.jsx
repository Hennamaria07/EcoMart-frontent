import React from 'react'
import { Link } from 'react-router-dom'

const EditUserBreadcrumbs = () => {
  return (
    <section className="container text-sm breadcrumbs pt-[58px] grid place-content-center pb-5">
  <ul>
    <li><Link to={'/admin'}>Dashboard</Link></li> 
    <li><Link to={'/admin/users'}>Users</Link></li> 
    <li>Edit User</li>
  </ul>
</section>
  )
}

export default EditUserBreadcrumbs
import React from 'react'
import Layout from './layout/Layout'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
    return (
        <div className="drawer relative z-10 pt-1">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content fixed py-2">
                {/* Page content here */}
                <label htmlFor="my-drawer" id='open' className="btn btn-primary drawer-button">
                    <span className="material-symbols-outlined">
                        menu
                    </span>Open menu</label>
            </div>
            <div className="drawer-side pt-[65.6px]" id='sidebar'>
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                    {/* Sidebar content here */}
                    {/* <li><Link to={'/admin/category'}>Dashboard</Link></li> */}
                    <li><Link to={'/admin/category'}>Category</Link></li>
                    <li><Link to={'/admin/banner'}>Banner</Link></li>
                    <li>
                        <details>
                            <summary>
                                Product
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><Link to={'/admin/products'}>All Products</Link></li>
                                <li><Link to={"/admin/create-product"}>Add Product</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link to={'/admin/users'}>users</Link></li>

                </ul>
            </div>
        </div>
    )
}

export default AdminSideBar
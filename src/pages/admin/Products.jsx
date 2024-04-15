import React from 'react'
import { AdminSideBar, Layout, ProductCard } from '../../components';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  return (
    <Layout>
        <ToastContainer 
           position="top-center"
           autoClose={2000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="dark"
           transition={Flip}
           />
        <AdminSideBar />
        <ProductCard />

    </Layout>
  )
}

export default Products
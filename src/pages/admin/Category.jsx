import React from 'react'
import { AdminSideBar, CategoryCard, CategoryForm, Layout } from '../../components'
import {ToastContainer, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
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
        <CategoryForm />
        <CategoryCard />
    </Layout>
  )
}

export default Category
import React from 'react'
import { AdminSideBar, EditProductBreadCrumbs, EditProductForm, Layout } from '../../components';
import {ToastContainer, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
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
   <EditProductBreadCrumbs />
   <EditProductForm />
</Layout>
  )
}

export default EditProduct
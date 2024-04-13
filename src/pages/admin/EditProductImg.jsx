import React from 'react'
import { AdminSideBar, EditProductBreadCrumbs, Layout, ProductImgForm } from '../../components';
import {ToastContainer, Flip} from 'react-toastify';

const EditProductImg = () => {
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
   <ProductImgForm />
</Layout>
  )
}

export default EditProductImg
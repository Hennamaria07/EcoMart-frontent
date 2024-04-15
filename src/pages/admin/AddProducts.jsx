import React from 'react'
import { AddProductFrom, AdminSideBar, Layout } from '../../components'
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
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
        <AddProductFrom />

    </Layout>
  )
}

export default AddProducts
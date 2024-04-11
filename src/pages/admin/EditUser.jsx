import React from 'react'
import { AdminSideBar, EditUserBreadcrumbs, EditUserForm, Layout } from '../../components';
import {ToastContainer, Flip} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
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
        <EditUserBreadcrumbs />
        <EditUserForm />
    </Layout>
  )
}

export default EditUser
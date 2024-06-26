import React from 'react'
import { AdminSideBar, Layout, UserCard } from '../../components';
import {ToastContainer, Flip} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
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
        <UserCard />

    </Layout>
  )
}

export default Users
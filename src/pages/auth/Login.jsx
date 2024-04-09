import React from 'react'
import { Layout, LoginForm } from '../../components';
import {ToastContainer, Flip} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  return (
    <Layout>
        <section className='py-5 container w-full flex justify-center items-center min-h-[89vh]'>
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
        <LoginForm />
        </section>
    </Layout>
  )
}

export default Login
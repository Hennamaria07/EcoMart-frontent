import React from 'react'
import { Layout, SignUpForm } from '../../components';
import {ToastContainer, Flip} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  return (
    <Layout>
        <section className='py-5 container flex justify-center items-center min-h-[89vh]'>
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
        <SignUpForm />
        </section>
    </Layout>
  )
}

export default Register
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../axios';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { getCurrentUser } from '../redux/features/user/authReducer';
import Cookies from "js-cookie";

const LoginForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const onSubmit = async (data) => {
        try {
            const res = await instance.post("/api/v1/user/login", {
                email: data.email,
                password: data.password
            }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(getCurrentUser(
                    {
                        user: res.data.user,
                        token: res.data.accessToken,
                        isAuthenticated: res.data.isAuthenticated
                    }
                ))
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        } catch (error) {
            console.log("JWT expiration error:", error);
            toast.error(error.response.data.message);
            dispatch(getCurrentUser({
                user: null,
                token: null,
                isAuthenticated: false
            }));
            // Navigate to login page
            navigate('/login');
        }
    }

    return (
        <form className='grid gap-5 glass py-10 px-5 rounded-lg sm:w-[50vw] lg:w-[40vw]' onSubmit={handleSubmit(onSubmit)}>
            <div className='text-center pb-5'>
                <h2 className='text-4xl font-medium'>Sign in to Exclusive</h2>
                <p className='text-sm' >Enter your details below</p>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        {...register('email',
                            {
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email format"
                                },
                                required: "Email is required",
                                validate: (fieldValue) => fieldValue !== ""
                            }
                        )}
                    />
                </label>
                <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            className="grow"
                            {...register('password',
                                {
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character"
                                    },
                                    required: "Password is required",
                                    validate: (fieldValue) => fieldValue !== ""
                                })}
                        />
                        <div onClick={togglePasswordVisibility} className="mt-3 mr-4 cursor-pointer">
                            {isPasswordVisible ? (
                                <span className="material-symbols-outlined">visibility</span>
                            ) : (
                                <span className="material-symbols-outlined">visibility_off</span>
                            )}
                        </div>
                    </label>
                    <p className='text-red-500'>{errors.password?.message}</p>
                </div>
                <div className='flex justify-between py-2 gap-5'>
                    <p>Forgot Password?</p>
                    <p>Don't have account?<Link className='ps-2 text-primary' to={'/sign-up'}>Sign up</Link></p>            </div>
            </div>
            <button className="btn btn-accent">Login</button>
        </form>
    )
}

export default LoginForm
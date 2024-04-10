import React, { useEffect, useState } from 'react';
import userPhoto from '../assets/images/user.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import instance from '../axios';
import {toast} from "react-toastify";

const SignUpForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [formData, setFormData] = useState(null);
    const passwordCheck = watch("password");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible((prevState) => !prevState);
    }

    const [file, setFile] = useState(userPhoto);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = async (data) => {
        console.log('Form submitted:', data);
        console.log('Form submitted:', data.profile[0]);
        setFormData(data);
            try {
                const formDatas = new FormData();
                formDatas.append("fullName", data.fullName);
                formDatas.append("email", data.email);
                formDatas.append("phone", data.phone);
                formDatas.append("password", data.password);
                formDatas.append("confirmPassword", data.confirmPassword);
                formDatas.append("avatar", data.profile[0]);
                const res = await instance.post('/api/v1/user/signup', formDatas, {headers: {"Content-Type": "multipart/form-data"}});
                if(res.data.success) {
                    toast.success(res.data.message);
                    setTimeout(()=> {
                        navigate("/login");
                    }, 1000)
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
    };
    

    return (
        <form className='grid gap-5 overflow-x-hidden lg:w-[30vw]' onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto w-full">
                <img
                    src={file}
                    alt="Avatar"
                    className="w-[130px] mb-2 mx-auto h-[130px] rounded-full border-2 border-gray-400"
                />
                <input
                    type="file"
                    {...register('profile', {
                        required: "Profile photo is required",
                        validate: (fieldValue) => fieldValue.length > 0
                    })}
                    onChange={handleChange}
                />
                <p className='text-red-500'>{errors.profile?.message}</p>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input
                        type="text"
                        name='fullName'
                        className="grow"
                        placeholder="Daisy"
                        {...register('fullName', {
                            pattern: {
                                value: /^[a-zA-Z]{5,}(\s[a-zA-Z]+)*$/,
                                message: "Invalid fullname"
                            },
                            required: "FullName is required",
                            validate: (fieldValue) => fieldValue !== ""
                        })} />
                </label>
                <p className='text-red-500'>{errors.fullName?.message}</p>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Email
                    <input
                        type="text"
                        className="grow"
                        placeholder="daisy@site.com"
                        name='email'
                        {...register('email',
                            {
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email format"
                                },
                                required: "Email is required",
                                validate: (fieldValue) => fieldValue !== ""
                            }
                        )} />
                </label>
                <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Phone
                    <input
                        type="number"
                        className="grow"
                        placeholder="7510454663"
                        name='phone'
                        {...register('phone',
                            {
                                pattern: {
                                    value: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/,
                                    message: "Invalid phone number"
                                },
                                required: "Phone Number is required",
                                validate: (fieldValue) => fieldValue !== ""
                            })} />
                </label>
                <p className='text-red-500'>{errors.phone?.message}</p>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Password
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        className="grow"
                        name='password'
                        {...register('password',
                            {
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character"
                                },
                                required: "Password is required",
                                validate: (fieldValue) => fieldValue !== ""
                            })} />
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
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Confirm Password
                    <input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        className="grow" name='confirmPassword'
                        {...register('confirmPassword', {
                            required: "Please provide a correct password",
                            validate: (fieldValue) => fieldValue === passwordCheck || "Passwords do not match"
                        })} />
                    <div onClick={toggleConfirmPasswordVisibility} className="mt-3 mr-4 cursor-pointer">
                        {isConfirmPasswordVisible ? (
                            <span className="material-symbols-outlined">visibility</span>
                        ) : (
                            <span className="material-symbols-outlined">visibility_off</span>
                        )}
                    </div>
                </label>
                <p className='text-red-500'>{errors.confirmPassword?.message}</p>
            </div>
            <div className='flex justify-between py-2 gap-5'>
                <p>Already Have an Account?<Link className='ps-2 text-primary' to={'/login'}>Login</Link></p>
            </div>
            <div>
                <button className="btn btn-accent w-full">Sign Up</button>
            </div>
        </form>
    );
};

export default SignUpForm;

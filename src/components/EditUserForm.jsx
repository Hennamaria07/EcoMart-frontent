import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../axios';
import { toast } from 'react-toastify';

const EditUserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => {
            try {
                const res = await instance.get(`/api/v1/user/${id}`, { withCredentials: true });
                if (res.data.success) {
                    setRole(res.data.user.role)
                    return {
                        fullName: res.data.user.fullName,
                        email: res.data.user.email,
                        phone: res.data.user.phone,
                        role: res.data.user.role
                    }
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
        try {
            console.log(id);
            const res = await instance.put(`/api/v1/user/update/${id}`, {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                role: data.role
            },
                { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/admin/users');
                }, 1000)
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <section className='container grid place-content-center'>
            <form className='grid gap-5 glass py-10 px-5 rounded-lg sm:w-[50vw] lg:w-[40vw]' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Full Name
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
                            })}
                        />
                    </label>
                    <p className='text-red-500'>{errors.fullName?.message}</p>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Email
                        <input
                            type="text"
                            name='email'
                            className="grow"
                            placeholder="daisy@site.com"
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
                    <label className="input input-bordered flex items-center gap-2">
                        Phone
                        <input
                            type="number"
                            className="grow"
                            // name='phone'
                            {...register('phone',
                                {
                                    pattern: {
                                        value: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/,
                                        message: "Invalid phone number"
                                    },
                                    required: "Phone Number is required",
                                    validate: (fieldValue) => fieldValue !== ""
                                })}
                        />
                    </label>
                    <p className='text-red-500'>{errors.phone?.message}</p>
                </div>
                <div>
                    <select className="select select-bordered w-full" {...register("role")}>
                        <option value="admin" selected={role === "admin"}>Admin</option>
                        <option value="user" selected={role === "user"}>User</option>
                        <option value="seller" selected={role === "seller"}>Seller</option>
                    </select>
                    <p className='text-red-500'>{errors.role?.message}</p>
                </div>
                <button className="btn btn-accent">Update</button>
            </form>
        </section>
    )
}

export default EditUserForm
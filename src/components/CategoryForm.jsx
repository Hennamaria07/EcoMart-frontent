import React from 'react'
import { useForm } from 'react-hook-form'
import instance from '../axios';
import { toast } from 'react-toastify';

const CategoryForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async(data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("icon", data.icon[0]);
            const res = await instance.post('/api/v1/category/create', formData, {withCredentials: true});
            if(res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <section className='container py-5 grid place-content-center'>
        <form action="" className='glass p-10 grid gap-5' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input
                                    type="text"
                                    name='name'
                                    className="grow"
                                    {...register('name', {
                                        pattern: {
                                            value: /^[a-zA-Z0-9\s_-]+$/,
                                            message: "Invalid name"
                                        },
                                        required: "Product name is required",
                                        validate: (fieldValue) => fieldValue !== ""
                                    })}
                                />
                            </label>
                            <p className='text-red-500'>{errors.name?.message}</p>
                        </div>
                        <div>
                        <input 
                        type="file" 
                        className="file-input file-input-bordered w-full max-w-xs"
                        {...register("icon", {
                            required: "Icon image is required",
                            validate: (fieldValue) => fieldValue.length === 1 
                        })}
                        />
                            <p className='text-red-500'>{errors.icon?.message}</p>
                        </div>
                        <button className="btn btn-accent">Add</button>
                    </form>
    </section>
  )
}

export default CategoryForm
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import instance from '../axios'; // Make sure you import your Axios instance

const BannerForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("banner", data.banner[0]); // Access the file data correctly

            // Send the form data to the server using Axios
            const res = await instance.post('/api/v1/banner/add', formData, { withCredentials: true });
            
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <section className='container py-5 grid place-content-center'>
            <form className='glass p-10 grid gap-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        type="file" 
                        className="file-input file-input-bordered w-full max-w-xs"
                        {...register("banner", {
                            required: "Icon image is required",
                            validate: (fieldValue) => fieldValue.length === 1 
                        })}
                    />
                    <p className='text-red-500'>{errors.banner?.message}</p>
                </div>
                <button className="btn btn-accent">Add</button>
            </form>
        </section>
    );
};

export default BannerForm;

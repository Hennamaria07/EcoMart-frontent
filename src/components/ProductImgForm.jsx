import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../axios';
import { toast } from 'react-toastify';

const ProductImgForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState(null);
    useEffect(() => {
        const fetchImg = async () => {
            try {
                const res = await instance.get(`/api/v1/product/${id}`, { withCredentials: true });
                if (res.data.success) {
                    setImages(res.data.product.images);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        fetchImg();
    }, [])
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const img = watch('images');
    // console.log(errors);
    // console.log(Array.from(img));
    const onSubmit = async (data) => {
        console.log(data.images);
        const product = Array.from(data.images);
        // console.log(product)
        try {
            const formData = new FormData();
            product.map((img) => formData.append("product", img))
            // console.log(id);
            const res = await instance.put(`/api/v1/product/update-image/${id}`, formData,
                { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/admin/products');
                }, 1000)
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <section className='container grid place-content-center'>
            <form className='grid gap-5 glass py-10 px-5 rounded-lg sm:w-[50vw] lg:w-[40vw]' onSubmit={handleSubmit(onSubmit)}>

                <div className="w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-base-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG or GIF</p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            {...register('images', {
                                pattern: {
                                    value: '/^.+\.(jpg|jpeg|png|gif)$/',
                                    message: "PNG, JPG, JPEG or GIF are acceptable"
                                },
                                required: "Images are required",
                                validate: (fieldValue) => fieldValue.length === 5 || "Exactly 5 images are required and only PNG, JPG, JPEG or GIF format images acceptable"
                            })}
                            multiple
                        />

                    </label>
                    <p className='text-red-500'>{errors?.images?.message}</p>
                </div>

                <button className="btn btn-accent">Update</button>
            </form>
        </section>
    )
}

export default ProductImgForm
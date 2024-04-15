import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const AddProductFrom = () => {
    const user = useSelector(state => state.userAuth.user);
    const navigate = useNavigate();
    console.log('user--->',user._id)
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [categories, setCategories] = useState();
    const onSubmit = async(data) => {
        console.log({...data, seller: user._id});
        const productImages = Array.from(data.images);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("seller", user._id);
            formData.append("brand", data.brand);
            formData.append("actualPrice", data.actualPrice);
            formData.append("discountPrice", data.discountPrice);
            formData.append("category", data.category);
            formData.append("size", JSON.stringify(data.size));
            productImages.forEach((image) => formData.append("product", image));
            console.log(formData);

            const res = await instance.post("/api/v1/product/add", formData, {withCredentials: true});
            if(res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/admin/products")
                }, 1000)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const res = await instance.get('/api/v1/category/all-categories');
                if(res.data.success) {
                    console.log(res.data.category);
                    setCategories(res.data.category);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        fetchCategories();
    }, [])
    return (
        <>
            <section className="container text-sm breadcrumbs pt-[58px] grid place-content-center pb-5">
                <ul>
                    <li><Link to={'/admin'}>Dashboard</Link></li>
                    <li><Link to={'/admin/products'}>Products</Link></li>
                    <li>Add Product</li>
                </ul>
            </section>
            <section className='container grid place-content-center'>
            <form className='grid gap-5 glass py-10 px-5 rounded-lg sm:w-[50vw] lg:w-[40vw]' onSubmit={handleSubmit(onSubmit)}>
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
                                    message: "Invalid fullname"
                                },
                                required: "Product name is required",
                                validate: (fieldValue) => fieldValue !== ""
                            })}
                        />
                    </label>
                    <p className='text-red-500'>{errors.name?.message}</p>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2 h-[4.8rem] pe-0">
                        Description
                        <textarea
                            className="textarea grow ps-1 focus-visible:outline-none outline-none"
                            name='description'
                            {...register('description',
                                {
                                    // pattern: {
                                    //     value: /^[\w\s!@#$%^&*()-+=~`{}[\]:;"'<>,.?\\/]{10,100}$/,
                                    //     message: "Description should consists of atleast 10 characters"
                                    // },
                                    required: "Description is required",
                                    validate: (fieldValue) => fieldValue !== ""
                                }
                            )}
                        >
                        </textarea>
                    </label>
                    <p className='text-red-500'>{errors.description?.message}</p>

                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Brand
                        <input
                            type="text"
                            name='brand'
                            className="grow"
                            {...register('brand',
                                {
                                    pattern: {
                                        value: /^[a-zA-Z0-9\s-]{1,50}$/,
                                        message: "Invalid brand format"
                                    },
                                    required: "Brand is required",
                                    validate: (fieldValue) => fieldValue !== ""
                                }
                            )}
                        />
                    </label>
                    <p className='text-red-500'>{errors.brand?.message}</p>
                </div>
                <div className='grid md:grid-cols-3 gap-5'>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            Stock
                            <input
                                type="number"
                                className="grow"
                                // name='phone'
                                {...register('stock',
                                    {
                                        pattern: {
                                            value: /^\d+(\.\d+)?$/,
                                            message: "Invalid number"
                                        },
                                        required: "Stock count is required",
                                        validate: (fieldValue) => fieldValue !== ""
                                    })}
                            />
                        </label>
                        <p className='text-red-500'>{errors.stock?.message}</p>
                    </div>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            Price
                            <input
                                type="number"
                                className="grow"
                                // name='phone'
                                {...register('discountPrice',
                                    {
                                        pattern: {
                                            value: /^\d+(\.\d+)?$/,
                                            message: "Invalid price"
                                        },
                                        required: "Discount price is required",
                                        validate: (fieldValue) => fieldValue !== ""
                                    })}
                            />
                        </label>
                        <p className='text-red-500'>{errors.discountPrice?.message}</p>
                    </div>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            Price
                            <input
                                type="number"
                                className="grow"
                                // name='phone'
                                {...register('actualPrice',
                                    {
                                        pattern: {
                                            value: /^\d+(\.\d+)?$/,
                                            message: "Invalid price"
                                        },
                                        required: "Orginal price is required",
                                        validate: (fieldValue) => fieldValue !== ""
                                    })}
                            />
                        </label>
                        <p className='text-red-500'>{errors.actualPrice?.message}</p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-5">
                <select className="select select-bordered w-full" {...register("category")}>
                <option disabled selected>Select category</option>
                    {categories?.map((item) => (
                        <option value={item._id}>{item.name}</option>
                    ))}
                    </select>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">XS</span>
                                <input 
                                type="checkbox" 
                                name='extraSmall'
                                value= {'extraSmall'}
                                className="checkbox checkbox-success"
                                {...register("size.extraSmall")}
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">S</span>
                                <input 
                                type="checkbox" 
                                name='small'
                                value={'small'}
                                className="checkbox checkbox-success"
                                {...register("size.small")}
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">M</span>
                                <input 
                                type="checkbox" 
                                name='medium'
                                value={'medium'}
                                className="checkbox checkbox-success"
                                {...register("size.medium")}
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">None</span>
                                <input 
                                type="checkbox" 
                                name='none'
                                value={'none'}
                                className="checkbox checkbox-success"
                                {...register("size.none")}
                                />
                            </label>
                        </div>
                    </div>
                </div>
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
        </>
    )
}

export default AddProductFrom
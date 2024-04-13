import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../axios';
import { toast } from 'react-toastify';

const EditProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => {
            try {
                const res = await instance.get(`/api/v1/product/${id}`, { withCredentials: true });
                if (res.data.success) {
                    // console.log(res.data.product);
                    setCategory(res.data.product.category);
                    return {
                        name: res.data.product.name,
                        brand: res.data.product.brand,
                        description: res.data.product.description,
                        stock: res.data.product.stock,
                        discountPrice: res.data.product.discountPrice,
                        actualPrice: res.data.product.actualPrice,
                        size: {
                            extraSmall: res.data.product.size.extraSmall,
                            small: res.data.product.size.small,
                            medium: res.data.product.size.medium,
                            none: res.data.product.size.none,
                        }
                    }
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    })

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

    const onSubmit = async (data) => {
        console.log(data);
        try {
            // console.log(id);
            const res = await instance.put(`/api/v1/product/update/${id}`, data,
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
                            className="textarea grow ps-1"
                            placeholder="Bio"
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
                            Offer Price
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
                    {categories?.map((item) => (
                        <option value={item._id} selected={category === item.name}>{item.name}</option>
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
                <button className="btn btn-accent">Update</button>
            </form>
        </section>
    )
}

export default EditProductForm
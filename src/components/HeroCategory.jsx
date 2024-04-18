import React, { useEffect, useState } from 'react'
import instance from '../axios';

const HeroCategory = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await instance.get('/api/v1/category/all-categories');
                if (res.data.success) {
                    setCategories(res.data.category);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        fetchCategories();
        console.log("categories--->", categories)
    }, [])
    return (
        <section className='container py-10'>
            <h1 className='text-4xl font-bold pb-5'>Browse By Category</h1>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {categories?.map((category) => (
                    <article key={category._id} className="card card-compact grid place-content-center bg-base-100 border p-5 cursor-pointer">
                        <div className='flex justify-center items-center'>
                            <img src={category.iconImage.url} alt={category.name} />
                        </div>
                        <h2 className='text-[18px]'>{category.name}</h2>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default HeroCategory
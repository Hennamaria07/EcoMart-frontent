import React, { useEffect, useState } from 'react'
import instance from '../axios';
import { Link } from 'react-router-dom';

const CategoryCard = () => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await instance.get('/api/v1/category/all-categories');
                if (res.data.success) {
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
        <section className="container pt-[58px]">
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center gap-5'>
                {categories?.map((category) => (
                    <div key={category._id} className="card  glass shadow-xl  p-5">
                        <div className="flex justify-between pb-5">
                            <h2 className="card-title">{category.name}</h2>
                            <img src={category.iconImage.url} className='w-[50%] h-[100%]' alt={category.name} />
                        </div>
                        <div className='flex justify-end gap-5'>
                            <Link>Edit</Link>
                            
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoryCard
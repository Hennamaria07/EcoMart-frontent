import React, { useEffect, useState } from 'react'
import instance from '../axios';
import { Link } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import CategoryModal from './CategoryModal';

const CategoryCard = () => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await instance.get('/api/v1/category/all-categories');
                if (res.data.success) {
                    // console.log(res.data.category);
                    setCategories(res.data.category);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        fetchCategories();
    }, [categories])
    return (
        <section className="container pt-[58px]">
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center gap-5'>
                {categories?.map((category) => (
                    <div key={category._id} className="card  glass shadow-xl relative p-5">
                        <div className="flex justify-between pb-5">
                            <CategoryModal id={category._id} />
                            <h2 className="card-title">{category.name}</h2>
                            {/* <h2 className="card-title">{category._id}</h2> */}
                            <img src={category.iconImage.url} className='w-[50%] h-[100%]' alt={category.name} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoryCard
import React, { useEffect, useState } from 'react'
import instance from '../axios';

const HeroPrdouct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getAllProducts = async () => {
            try {
              const res = await instance.get('/api/v1/product/hero-product');
              if(res.data.success) {
                setProducts(res.data.product);
                console.log(res.data);
              }
            } catch (error) {
              console.log(error.response?.data?.message)
            }
          }
          getAllProducts();
          console.log("hero---->", products)
    }, [])
  return (
    <section className='container py-10'>
    <h1 className='text-4xl font-bold pb-5'>Latest Products</h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {products?.map((product) => (
        <article key={product._id} className="card card-compact bg-base-100 h-[30rem] shadow-xl">
        <figure className='bg-white h-[60%] relative'>
          <img src={product?.images[0]?.url} className='w-full h-full' alt="Shoes" />
          </figure>
        <div className="card-body">
          <h6 className='py-0'>{product.brand}</h6>
          <h2 className="card-title">{product.name}</h2>
          <h2 className="card-title">{product._id}</h2>
          <div className='flex gap-5 items-center'>
            <span className="text-2xl font-bold ">${product.discountPrice}</span>
            <span className="text-xl font-medium line-through text-gray-500">${product.actualPrice}</span>
          </div>
          <div className="card-actions justify-between">
            {/* <div className="rating">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            </div> */}
            <div className='flex gap-5'>
            <button className="btn btn-primary">view</button>
            <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </article>
      ))}
      </div>
</section>
  )
}

export default HeroPrdouct
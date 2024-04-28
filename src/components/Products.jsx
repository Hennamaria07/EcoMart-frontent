import React, { useEffect, useState } from 'react'
import instance from '../axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartInc, postCart } from '../redux/features/product/cartReducer';
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();
    const [products, setProducts] = useState(null);
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await instance.get('/api/v1/product/all')
          if (res.data.success) {
            setProducts(res.data.product)
            // console.log(res.data.message);
          }
        } catch (error) {
          console.log(error.response?.data?.message)
        }
      }
      fetchProducts();
    //   console.log("products----->", products)
    }, [products]);
  return (
    <section className='container pt-[58px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10 '>
      {products && products.map((product) => (
        <Link to={`/product/${product._id}`}>
        <article key={product._id} className="card card-compact bg-base-100 h-[30rem] shadow-xl cursor-pointer">
          <figure className='bg-white h-[60%] relative'>
            <img src={product?.images[0]?.url} className='w-full h-full' alt="Shoes" />
          </figure>
          <div className="card-body">
            <h6 className='py-0'>{product.brand}</h6>
            <h2 className="card-title">{product.name}</h2>
            <p className='text-justify'>{product.description && product.description.length > 40 ? product.description.substring(0, 60) + '...' : product.description}</p>
            <div className='flex gap-5 items-center justify-between'>
            <div className="rating">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 w-4 h-4" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 w-4 h-4" checked />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 w-4 h-4" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 w-4 h-4" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 w-4 h-4" />
              </div>
             <div className='flex gap-5'>
             <span className="text-2xl font-bold ">${product.discountPrice}</span>
              <span className="text-xl font-medium line-through text-gray-500">${product.actualPrice}</span>
             </div>
            </div>
            <div className="card-actions justify-between">
              
              {/* <div className='flex gap-5'>
              <Link to={`/product/${product._id}`}><button className="btn btn-primary">view</button></Link>
            <button 
            className="btn btn-primary" 
            onClick={() => {
              const orderItems = [{product: product._id, quantity: 1}]
              dispatch(postCart(orderItems));
          }}
            >Add to Cart</button>
              </div> */}
            </div>
          </div>
        </article>
        </Link>
      ))
      }
    </section >
  )
}

export default Products
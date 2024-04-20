import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import instance from '../axios';
import { RadioGroup } from '@headlessui/react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [isClicked, setIsClicked] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        const getProduct = async () => {
            try {
                // console.log(id);
                const res = await instance.get(`/api/v1/product/${id}`);
                if (res.data.success) {
                    setProduct(res.data.product);
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getProduct()
        // console.log(product);
    }, [id])
    return (
        <section className='container pb-5 '>
            <div className='py-5 grid md:grid-cols-2 gap-10 '>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="grid gap-5 -mx-2 mb-4 col-span-4">
                        {/* Thumbnails or selectors for images */}
                        {product?.images.map((_, index) => (
                            <div key={index} className="flex-1 px-2">
                                <button
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`focus:outline-none w-full rounded-lg h-24 bg-gray-100 flex items-center justify-center ${selectedImageIndex === index ? "ring-2 ring-indigo-300 ring-inset" : ""
                                        }`}
                                >
                                    <img src={product.images[index].url} alt={`Thumbnail ${index + 1}`} className="w-full h-full rounded-lg" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="md:mx-0 mx-auto rounded-lg bg-gray-100 mb-4 col-span-8">
                        {/* Show selected image */}
                        {product?.images && (
                            <img src={product.images[selectedImageIndex].url} alt={`Product Image ${selectedImageIndex + 1}`} className="w-full h-full rounded-lg" />
                        )}
                    </div>
                </div>
                <div>
                    <div className='border-b pb-3'>
                        <h1 className='text-4xl font-bold'>{product?.name}</h1>
                        <div className='flex items-center gap-4'>
                            <div className="rating py-3">
                                <input type="radio" name="rating-2" className="mask mask-star-2 h-4 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 h-4 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 h-4 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 h-4 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 h-4 bg-orange-400" />
                            </div>
                            <p>(150 Reviews)</p>
                            <p>|</p>
                            <p className='text-green-600'>stock: {product?.stock}</p>
                        </div>
                        <div className="text-3xl">${product?.discountPrice}</div>
                        <p className='text-justify py-4 leading-6'>{product?.description}</p>
                    </div>
                    <div>
                        <p className='pt-5'>Seller: {product?.seller.fullName}</p>
                        <p className='py-4'>Size: {product?.seller.fullName}</p>
                    </div>
                    <div className='flex justify-between pb-4 w-[24rem]'>
                        <div className="join">
                            <button className="join-item btn" onClick={() => setQuantity(pre => quantity > 0 ? --pre : 0)}>-</button>
                            <button className="join-item btn">{quantity}</button>
                            <button className="join-item btn" onClick={() => setQuantity(pre => ++pre)}>+</button>
                        </div>
                        <button className='btn btn-primary'>Add to Cart <span className="material-symbols-outlined">
                            shopping_cart
                        </span>
                        </button>
                        <button className='btn' onClick={() => setIsClicked(pre => !pre)}>
                            <span className={`material-symbols-outlined ${isClicked ? 'text-red-600' : ""} transition-colors `}>
                                favorite
                            </span>
                        </button>
                    </div>
                    <div className='border p-4 w-[24rem] rounded-t-md'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-2 place-content-center'>
                                <span className="material-symbols-outlined">
                                    local_shipping
                                </span>
                            </div>
                            <div className='col-span-10'>
                                <p className='font-semibold'>
                                    Free Delivery
                                </p>
                                <p className='text-sm underline'>Enter your postal code for Delivery Availability</p>
                            </div>
                        </div>
                    </div>
                    <div className='border border-t-0 p-4 w-[24rem] rounded-b-md'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-2 place-content-center'>
                                <span className="material-symbols-outlined">
                                    autorenew
                                </span>
                            </div>
                            <div className='col-span-10'>
                                <p className='font-semibold'>
                                    Return Delivery
                                </p>
                                <p className='text-sm'>Free 30 Days Delivery Returns. <span className='underline'>Details</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs className={'bg-base-100 shadow p-5'}>
                <TabList className={'flex justify-evenly border-b pb-4'}>
                    <Tab className={'cursor-pointer'}>Product Details</Tab>
                    <Tab className={'cursor-pointer'}>Product Reviews</Tab>
                    <Tab className={'cursor-pointer'}>Seller Information</Tab>
                </TabList>

                <TabPanel className={"pt-4"}>
                    <p>{product?.description}</p>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>


                    <div className="w-full">
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={product?.seller?.image?.avatar} alt="Bonnie image" />
                            <h5 className="mb-1 text-xl font-medium">{product?.seller?.fullName}</h5>
                            <div className='flex gap-5 py-2'>
                            <Link to={`mailto:${product?.seller?.email}`}>
                                <span className="material-symbols-outlined">
                                    mail
                                </span>
                            </Link>
                            <Link to={`tel:${product?.seller?.phone}`}>
                                <span className="material-symbols-outlined">
                                    call
                                </span>
                            </Link>
                            </div>
                            <p>Joined in: {product?.seller?.createdAt.slice(0, 10)}</p>
                        </div>
                    </div>

                </TabPanel>
            </Tabs>
        </section>
    )
}

export default ProductDetail
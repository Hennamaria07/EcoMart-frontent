import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCarts, quantityDec, quantityInc } from '../redux/features/product/cartReducer';
import instance from '../axios';

const CartTable = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(null);
    // console.log("products--->", products);

    useEffect(() => {
        ;(async (req, res) => {
            try {
                const res = await instance.get('/api/v1/cart/lists', { withCredentials: true });
                if (res.data.success) {
                    console.log(res.data.cartItems.orderItems);
                    setProducts(res.data.cartItems.orderItems);
                    dispatch(addCarts(res.data.cartItems.orderItems));
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        })()

        console.log(products)
    }, [])

    return (
        <section className="container pt-[58px] overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>

                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((cart) => (
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={cart.product.images[0]?.url} alt={cart.product.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{cart.product.name}</div>
                                        <div className="text-sm opacity-50">{cart.product.brand}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                ${cart.product.discountPrice}
                            </td>
                            <td className='join'>
                                <button className="join-item btn" onClick={() => dispatch(quantityDec())}>-</button>
                                <button className="join-item btn">{cart.quantity}</button>
                                <button className="join-item btn" onClick={() => dispatch(quantityInc())}>+</button>
                            </td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                            <th>
                                <Link>
                                    <span class="material-symbols-outlined">
                                        delete
                                    </span>
                                </Link>

                            </th>
                        </tr>
                    ))}
                </tbody>

            </table>
        </section>
    )
}

export default CartTable
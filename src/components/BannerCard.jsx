import React, { useEffect, useState } from 'react'
import instance from '../axios';
import BannerForm from './BannerForm';

const BannerCard = () => {
    const [banners, setBanners] = useState(null);
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await instance.get('/api/v1/banner/all', {withCredentials: true});
                if (res.data.success) {
                    // console.log(res.data.category);
                    setBanners(res.data.banner);
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        fetchBanners();
    }, [banners])
    return (
        <section className="container pt-[58px]">
            <BannerForm />
             <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center gap-5'>
                {banners?.map((banner) => (
                    <div key={banner._id} className='p-5 glass'>
                        <img src={banner.image?.url} className='h-full w-full' alt="banner image" />
                        </div>
                ))}
             </div>
        </section>
    )
}

export default BannerCard
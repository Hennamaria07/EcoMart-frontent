import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import instance from '../axios';

const Carousels = () => {
    const [banners, setBanners] = useState();
    useEffect(() => {
        const getAllBanners = async () => {
            try {
              const res = await instance.get('/api/v1/banner/all');
              if(res.data.success) {
                setBanners(res.data.banner);
                console.log(res.data);
              }
            } catch (error) {
              console.log(error.response?.data?.message)
            }
          }
          getAllBanners()
    }, [])
  return (
    <section className=''>
        <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        interval={2000}
        showArrows={false}
        showStatus={false}
        >
                {banners?.map((banner) => (
                    <div key={banner._id}>
                    <img src={banner.image.url} className='h-[60vh] w-full' />
                </div>
                ))}
               
            </Carousel>
    </section>
  )
}

export default Carousels


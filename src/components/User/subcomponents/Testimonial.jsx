import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from 'framer-motion';
import Image from 'next/image'
import { Pagination, Navigation, Autoplay } from "swiper";
import { data } from '../../../db/data';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonial = () => {
    const [selectedData, setSelectedData] = useState(data.videoData[0]);
    const [isVideo, setIsVideo] = useState(false)

    const breakpoints = {
        350: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        750: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1100: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        1550: {
            slidesPerView: 5,
            spaceBetween: 30
        },
        2100: {
            slidesPerView: 6,
            spaceBetween: 50
        },
        2400: {
            slidesPerView: 7,
            spaceBetween: 100
        },

    }

    useEffect(() => {

    }, [selectedData, isVideo])

    console.log({isVideo})
    return (
        <div className="connectme__user-testimonial">
            <div className="connectme__user-testimonial__title">
                <h1>See What Other Says</h1>
            </div>
            <div className="connectme__user-testimonial__content">
                <div className="connectme__user-testimonial__content-upper">
                    <div className="connectme__user-testimonial__content-upper__left">
                        <h3>Mr Zeus</h3>
                        <p>-Redfluk</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa commodi, quisquam eius laborum labore sunt veniam tempore fugiat voluptatum officiis? Nihil totam saepe culpa eum, officia numquam laboriosam. Ipsam, dolore?</p>
                    </div>
                    <div className="connectme__user-testimonial__content-upper__right">
                        {!isVideo ? (
                            <div className="iframe">
                                <iframe width="600" height="350" src={`https://www.youtube.com/embed/${selectedData.vid}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        ) : (
                            <div className="video">
                                <video src={selectedData?.vid} controls />
                            </div>
                        )}
                    </div>
                </div>
                <div className="connectme__user-testimonial__content-lower">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        // autoplay={{ delay: 3000, disableOnInteraction: true }}
                        modules={[Pagination, Navigation, Autoplay]}
                        speed={600}
                        navigation
                        className="mySwiper"
                        breakpoints={breakpoints}
                    >
                        {data.videoData.map((d) => (
                            <SwiperSlide key={d.name} onClick={() => {
                                setSelectedData(d)
                                if (d.isVid){
                                    setIsVideo(true)
                                }else{
                                    setIsVideo(false)
                                }
                            }} >
                                <motion.div className={`card ${selectedData.id === d.id && "card-show"}`} initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: d.id < 6 ? d.id * 0.3 : 0.3 }}>
                                    <Image src={d.img} width={300} height={200} objectFit="contain" />
                                    <div className="card__title">
                                        <h2>{d.name}</h2>
                                        <p >{d.company}</p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
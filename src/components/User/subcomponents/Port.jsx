
import { SwiperSlide, Swiper } from 'swiper/react'
import { BsArrowRight } from 'react-icons/bs'
import SwiperCore, { Autoplay } from 'swiper'
import Image from 'next/image'
import Modal from "../../modal/Modal"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from 'next/link'

const Port = ({data,title,link=""}) => {
    const [showModal, setShowModal] = useState(false)
    const [index, setIndex] = useState(0)
    
    const newData = data
    var refinedData=newData[index]

    const breakpoint = {
        400: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        900: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        1500: {
            slidesPerView: 4,
            spaceBetween: 10
        },
        2100: {
            slidesPerView: 5,
            spaceBetween: 10
        },
        2600: {
            slidesPerView: 6,
            spaceBetween: 10
        },
    }

    useEffect(() => {
        
    }, [showModal,index])
    useEffect(()=>{

    },[refinedData])
    

    if(index<0){
        setIndex(newData.length-1)
    }else if(index>newData.length-1){
        setIndex(0)
        console.log("limit Reached")
    }
    
    
    return (
        <div className="connectme__user-services">
            <div className="connectme__user-services__title">
                <h1>{title && title}</h1>
            </div>
            <motion.div className="connectme__user-services__content" >
                <Swiper loop={true} slidesPerView={1} breakpoints={breakpoint} spaceBetween={50} autoplay speed={600} modules={[Autoplay]}>
                    {newData.map((d,i) => (
                        <SwiperSlide key={d.title}>
                            <motion.div className="image" initial={{x:100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{delay: i<4 && .5 *i  }}  whileHover={{ scale: 1.1 }} onClick={() => {
                                setIndex(i)
                                setShowModal(true)
                            }
                            }>
                                <Image src={d.img} width={300} height={300} objectFit="cover" />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
            <div className="connectme__user-services__more" >
                <Link href={`/${link}`} passHref>
                <motion.div className="" initial={{ x: -300, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} whileHover={{ scale: 1.1, x: 10 }}>
                    <BsArrowRight />
                </motion.div>
                </Link>
            </div>
            {showModal && (
                <Modal img={refinedData?.img} setModal={setShowModal} setIndex={setIndex} index={index} />
            )}
        </div>
    )
}

export default Port
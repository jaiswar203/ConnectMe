
import { SwiperSlide, Swiper } from 'swiper/react'
import { BsArrowRight } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import SwiperCore, { Autoplay } from 'swiper'
import Image from 'next/image'
import Modal from "../../modal/Modal"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from 'next/link'

const Port = ({ data, title, link = "", edit, openEditHandler }) => {
    const [showModal, setShowModal] = useState(false)
    const [index, setIndex] = useState(0)

    const newData = data
    var refinedData = newData[index]

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

    }, [showModal, index])
    useEffect(() => {

    }, [refinedData])


    if (index < 0) {
        setIndex(newData.length - 1)
    } else if (index > newData.length - 1) {
        setIndex(0)
        console.log("limit Reached")
    }

    if (data === null) {
        return null
    }

    return (
        <div className="connectme__user-services">
            <div className="connectme__user-services__title">
                <h1>{title && title}</h1>

            </div>
            <motion.div className="connectme__user-services__content" >
                <Swiper loop={true} slidesPerView={1} breakpoints={breakpoint} spaceBetween={50} autoplay speed={600} modules={[Autoplay]}>
                    {newData?.map((d, i) => (
                        <SwiperSlide key={d._id}>
                            <motion.div className="image" whileHover={{ scale: !edit && 1.1 }} onClick={() =>  {
                                !edit && setIndex(i)
                                !edit && setShowModal(true)
                            }
                            }>
                                {edit && (
                                    <div className="background" onClick={()=>openEditHandler(d.data,title,`${title?.toLowerCase()}`,{isSubDoc: true,_id:d._id})}>
                                        <FaEdit />
                                    </div>
                                )}
                                <Image src={d.data} width={300} height={300} objectFit="cover" />
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
                <Modal img={refinedData?.data} setModal={setShowModal} setIndex={setIndex} index={index} />
            )}
        </div>
    )
}

export default Port

import { SwiperSlide, Swiper } from 'swiper/react'
import { BsArrowRight } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import SwiperCore, { Autoplay } from 'swiper'
import Image from 'next/image'
import Modal from "../../modal/Modal"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from 'next/link'
import Edit from './Edit'
import { useDispatch } from 'react-redux'
import { deleteSubDocInProfileById } from '../../../../redux/action/Profile'

const Port = ({ data, title, link = "", edit, openEditHandler }) => {
    const [showModal, setShowModal] = useState(false)
    const [index, setIndex] = useState(0)

    const [editData, setEditData] = useState({})
    const [openEdit, setOpenEdit] = useState(false)

    const dispatch = useDispatch()

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

    }, [showModal, index,editData, openEdit])
    useEffect(() => {

    }, [refinedData])


    
    const addImageHandler = (addImage = true) => {
        setEditData({ fileUploader:{active:true,data:"image/*"}, title, addImage, query: title.toLowerCase() })
        setOpenEdit(true)
    }

    
    if (index < 0) {
        setIndex(newData.length - 1)
    } else if (index > newData.length - 1) {
        setIndex(0)
        console.log("limit Reached")
    }

    if (data === null) {
        return null
    }

    const deleteSubDoc = (id) => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

        console.log({ user, id })
        dispatch(deleteSubDocInProfileById({ subId: id, userId: user?._id }, user?.profile, title.toLowerCase()))
    }
    
    return (
        <div className="connectme__user-services">
            <div className="connectme__user-services__title">
                <h1>{title && title}</h1>
                {edit && (
                    <motion.div className="add" whileTap={{ scale: 1.1 }} onClick={() => addImageHandler(true)} >
                        <h2>Add {title}</h2>
                    </motion.div>
                )}
            </div>
            <motion.div className="connectme__user-services__content" >
                <Swiper loop={true} slidesPerView={1} breakpoints={breakpoint} spaceBetween={50} autoplay speed={600} modules={[Autoplay]}>
                    {newData?.map((d, i) => (
                        <SwiperSlide key={d._id}>
                            <motion.div className="image" whileHover={{ scale: !edit && 1.1 }} onClick={() => {
                                !edit && setIndex(i)
                                !edit && setShowModal(true)
                            }
                            }>
                                {edit && (
                                    <>
                                        <div className="background" onClick={() => openEditHandler(d.data, title, `${title?.toLowerCase()}`, { isSubDoc: true, _id: d._id }, { active: true, data: "image/*" })}>
                                            <FaEdit />
                                        </div>
                                        <div className="delete" onClick={() => deleteSubDoc(d._id)}>
                                            <MdDelete />
                                        </div>
                                    </>
                                )}
                                <Image src={d.data} width={400} height={400} objectFit="cover" />
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
            {
                openEdit && (
                    <Edit modal={setOpenEdit} data={editData} />
                )
            }
        </div>
    )
}

export default Port
import { GrGrid, GrGallery } from 'react-icons/gr'
import { AiFillPlayCircle } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Modal from '../../modal/Modal'
import { useEffect, useState } from 'react'

const Portfolio = ({edit}) => {
    console.log({edit})
    const [showModal, setShowModal] = useState(false)
    const [imgUrl, setimgUrl] = useState("")
    const [showNext, setShowNext] = useState(0)
    const [showBar, setShowBar] = useState(false)
    const itemData = [
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087937/connectme/photo-1644901441692-0ece88594153_tjnbn3.jpg',
            title: 'Breakfast',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087922/connectme/photo-1644462282294-49a0ce636223_ywwae3.jpg',
            title: 'Burger',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087895/connectme/photo-1644862742524-2d96acb5d739_ql1lfh.jpg',
            title: 'Camera',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087870/connectme/photo-1552413538-566f46b64b92_f7a6ud.jpg',
            title: 'Coffee',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087853/connectme/photo-1645002124895-009a4c3ea3af_a1loc6.jpg',
            title: 'Hats',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087937/connectme/photo-1644901441692-0ece88594153_tjnbn3.jpg',
            title: 'Breakfast',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087922/connectme/photo-1644462282294-49a0ce636223_ywwae3.jpg',
            title: 'Burger',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087895/connectme/photo-1644862742524-2d96acb5d739_ql1lfh.jpg',
            title: 'Camera',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087870/connectme/photo-1552413538-566f46b64b92_f7a6ud.jpg',
            title: 'Coffee',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087853/connectme/photo-1645002124895-009a4c3ea3af_a1loc6.jpg',
            title: 'Hats',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087870/connectme/photo-1552413538-566f46b64b92_f7a6ud.jpg',
            title: 'Coffee',
        },
        {
            img: 'https://res.cloudinary.com/redwine/image/upload/v1645087853/connectme/photo-1645002124895-009a4c3ea3af_a1loc6.jpg',
            title: 'Hats',
        },
    ];

    useEffect(() => {

    }, [showModal, imgUrl])

    const sectionItem = [

        {
            id: 1,
            item: <GrGrid />,
        },
        {
            id: 2,
            item: <GrGallery />,
        },
        {
            id: 3,
            item: <AiFillPlayCircle />,
        },
    ]

    console.log({ showModal, imgUrl })
    return (
        <div className="connectme__user-portfolio">
            <div className="connectme__user-portfolio__title">
                <h1>PortFolio</h1>
                {edit && (
                    <div className="background">
                        <FaEdit />
                    </div>
                )}
            </div>
            <div className="connectme__user-portfolio__content">
                <div className="connectme__user-portfolio__content__upper">
                    {
                        sectionItem.map((d, i) => (
                            <div className="item" key={d.id} onClick={() => setShowBar(true)}>
                                {d.item}
                                <span className={`${showBar & d.id === i && "show"}`}></span>
                            </div>
                        ))
                    }
                </div>
                <hr />
                <div className="connectme__user-portfolio__content__lower">
                    <motion.div className="grid" >
                        {itemData.map((d, i) => (
                            <motion.div className="grid__item" initial={{ scale: 1.1, opacity: 0 }} key={d.title} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * .4 }} onClick={() => {
                                setShowModal(true)
                                setimgUrl(d.img)
                            }}>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} >
                                    <Image src={d.img} width={300} height={300} objectFit="cover" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            {showModal && (
                <Modal img={imgUrl} setModal={setShowModal} />
            )}
        </div>

    )
}

export default Portfolio
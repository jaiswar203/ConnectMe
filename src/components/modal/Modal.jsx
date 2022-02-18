import Image from 'next/image'
import { FaTimesCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Modal = ({ img,setModal }) => {
    console.log({img})
    return (
        <div className="modal">
            <motion.div className="connectme__modal" >
                <motion.div className="connectme__modal-off" whileHover={{scale:1.1}}>
                    <FaTimesCircle onClick={()=>setModal(false)} />
                </motion.div>
                <motion.div className="connectme__modal-img" initial={{y:100,opacity:0}} whileInView={{y:0,opacity:1}}>
                    <Image src={img} width={1900} layout="responsive" height={1000} objectFit="contain" />
                </motion.div>
                <div className="connectme__modal-button">
                    <motion.div className="item" initial={{x:-100,opacity:0}} animate={{x:0,opacity:1}}>
                        <FaArrowLeft />
                    </motion.div>
                    <motion.div className="item" initial={{x:100,opacity:0}} animate={{x:0,opacity:1}}>
                        <FaArrowRight />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default Modal
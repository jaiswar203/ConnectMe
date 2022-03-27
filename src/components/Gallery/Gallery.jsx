import Image from "next/dist/client/image"
import { motion } from "framer-motion"
import Modal from "../modal/Modal"
import { useEffect, useState } from "react"

const Gallery = ({ data,title ,content}) => {

    const [modal, setModal] = useState(false)
    const [imgSrc, setImgSrc] = useState("")
    const [index, setIndex] = useState(0)

    const newData=data

    if (index < 0) {
        setIndex(newData?.length - 1)
    } else if (index > newData.length - 1) {
        setIndex(0)
        console.log("limit Reached")
    }

    const refinedData=newData[index]
    
    useEffect(()=>{
        
    },[modal,imgSrc,index,refinedData])
    
    
    return (
        <div className="connectme__gallery">
            <div className="connectme__gallery-title">
                <h1>{content} of {title}</h1>
            </div>
            <div className="border">
                <b className="hr anim"></b>
            </div>
            <div className="connectme__gallery-content" >
                {data.map((d,i) => (
                    <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{delay: i*.3}} key={d.data} onClick={()=>{
                        setIndex(i)
                        setModal(true)
                    }}>
                        <Image src={d.data} width={300} height={300} objectFit="contain" />
                    </motion.div>
                ))}
            </div>
            {modal && (
                <Modal img={refinedData?.data} setModal={setModal} index={index} setIndex={setIndex} />
            )}
        </div>
    )
}

export default Gallery
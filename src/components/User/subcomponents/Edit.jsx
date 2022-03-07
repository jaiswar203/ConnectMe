import { motion } from "framer-motion"
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { updateProfile, updateSubDocInProfileById } from "../../../../redux/action/Profile"
const Edit = ({ modal,data }) => {
    const dispatch=useDispatch()
    const [formData, setFormData] = useState({})
    
    console.log({data})

    useEffect(()=>{

    },[dispatch,formData])

    const handleSub=(e)=>{
        e.preventDefault()
        const user=JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile=JSON.parse(localStorage.getItem("profile"))?.data
        
        if(data?.isSubDoc?.isSubDoc){
            dispatch(updateSubDocInProfileById({subId: data?.isSubDoc?._id,userId: user?._id,newData: formData.data},profile?._id,data?.name))
        }else{
            dispatch(updateProfile({userId:user?._id ,data: formData},profile?._id))
        }
    }
    const handleChange=(e)=>{
        e.preventDefault()
        
        if(data?.isSubDoc?.isSubDoc){
            console.log("exec")
            setFormData({...formData,data:e.target.value})
        }else{
            setFormData({...formData,[e.target.name]:e.target.value})
        }
        console.log({formData})
    }
    return (
        <div className="connectme__edit">
            <motion.div className="connectme__edit-modal" whileInView={{y:0,opacity:1}} initial={{y:200,opacity:0}}>
                <motion.div className="connectme__edit-close" onClick={() => modal(false)} whileTap={{ scale: 1.1 }}>
                    <IoIosCloseCircleOutline />
                </motion.div>
                <div className="title">
                    <h1>{data?.title}</h1>
                </div>
                <form onSubmit={handleSub}>
                    <div className="content">
                        <input type="text" defaultValue={data?.data} name={data?.name}  onChange={handleChange} />
                        {/* <div className="edit">
                            <MdEdit />
                        </div> */}
                    </div>
                    <motion.div className="button" whileTap={{ scale: 1.1 }}>
                        <button type="submit" >Update</button>
                    </motion.div>

                </form>
            </motion.div>
        </div>
    )
}

export default Edit
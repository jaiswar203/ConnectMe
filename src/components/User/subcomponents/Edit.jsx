import { motion } from "framer-motion"
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { addImageInProfile, updateProfile, updateSubDocInProfileById } from "../../../../redux/action/Profile"
import axios from "axios"
import Router from "next/router"
const Edit = ({ modal, data }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({})
    const [cloudImage, setCloudImage] = useState("")

    console.log({ data })

    useEffect(() => {

    }, [dispatch, formData,cloudImage])

    const handleSub = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data
        
        if (data?.isSubDoc?.isSubDoc) {
            dispatch(updateSubDocInProfileById({ subId: data?.isSubDoc?._id, userId: user?._id, newData: formData.data }, profile?._id, data?.name))
        } else {
            dispatch(updateProfile({ userId: user?._id, data: formData }, profile?._id))
        }
    }
    const handleChange = (e) => {
        e.preventDefault()

        if (data?.isSubDoc?.isSubDoc) {
            console.log("exec")
            setFormData({ ...formData, data: e.target.value })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        console.log({ formData })
    }

    const uploadImage=()=>{
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        const file=new FormData()
        file.append('file',cloudImage)
        file.append('upload_preset','profile')
        axios.post("https://api.cloudinary.com/v1_1/redwine/image/upload",file).then((res)=>{
            
            if(data?.isSubDoc?.isSubDoc){
                
                dispatch(updateSubDocInProfileById({subId: data?.isSubDoc?._id,userId: user?._id,newData: res.data.secure_url},profile?._id,data?.name))
            }else if(data?.addImage){
                console.log(res.data.secure_url)
                dispatch(addImageInProfile({data: res.data.secure_url,userId: user?._id },profile?._id,data?.query))
            }else{
                dispatch(updateProfile({userId: user?._id,data: {[data?.name]: res.data.secure_url}},profile?._id))
            }
            Router.reload()
        })

    }
    return (
        <div className="connectme__edit">
            <motion.div className="connectme__edit-modal" whileInView={{ y: 0, opacity: 1 }} initial={{ y: 200, opacity: 0 }}>
                <motion.div className="connectme__edit-close" onClick={() => modal(false)} whileTap={{ scale: 1.1 }}>
                    <IoIosCloseCircleOutline />
                </motion.div>
                <div className="title">
                    <h1>{data?.title}</h1>
                </div>
                {
                    data?.fileUploader?.active ? (
                        <div className="uploader">
                            <input type="file" accept={`${data?.fileUploader?.data}`} name={data?.name} onChange={(e)=>setCloudImage(e.target.files[0])} />
                            <div className="uploader_button" onClick={uploadImage} >
                                <h1>Submit </h1>
                            </div>
                        </div>

                    ) : (

                        <form onSubmit={handleSub}>
                            <div className="content">
                                <input type="text" defaultValue={data?.data} name={data?.name} onChange={handleChange} />
                                {/* <div className="edit">
                            <MdEdit />
                        </div> */}
                            </div>
                            <motion.div className="button" whileTap={{ scale: 1.1 }}>
                                <button type="submit" >Update</button>
                            </motion.div>

                        </form>

                    )
                }
            </motion.div>
        </div>
    )
}

export default Edit
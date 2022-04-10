import { motion } from "framer-motion"
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { addImageInProfile, updateProfile, updateSubDocInProfileById } from "../../../../redux/action/Profile"
import axios from "axios"


import ClipLoader from "react-spinners/ClipLoader";
import Crop from "../../modal/crop"

const Edit = ({ modal, data, isLoading, usetextarea = false, state, multiple = false, crop = false, setCrop, setTextArea }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({})
    const [cloudImage, setCloudImage] = useState("")

    

    const [isSuccess, setIsSuccess] = useState(false)
    const [runFunction, setRunFunction] = useState(false)
    const profile = state

    const [cropUrl, setCropUrl] = useState("")
    const [enableCrop, setEnableCrop] = useState(false)

    const [vidUrl, setVidUrl] = useState("")

    // cropImage
    const [croppedUrl, setcroppedUrl] = useState("")

    const [progress, setProgress] = useState()

    const [multipleCounter, setMultipleCounter] = useState(0)

    useEffect(() => {

    }, [dispatch, formData, cloudImage])

    const handleSub = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        if (data?.isSubDoc?.isSubDoc) {
            dispatch(updateSubDocInProfileById({ subId: data?.isSubDoc?._id, userId: user?._id, newData: formData.data}, profile?._id, data?.name,data?.isSubDoc?.isSubDoc?.underneath ? true : false ))
        } else if (data?.isSubDoc?.testimonial) {
            dispatch(addImageInProfile({ data: formData?.data, userId: user?._id }, profile?._id, data?.name))
        } else {
            dispatch(updateProfile({ userId: user?._id, data: formData }, profile?._id))
        }
        setRunFunction(true)

    }
    
    const handleChange = (e) => {
        e.preventDefault()

        if (data?.isSubDoc?.isSubDoc) {
            
            setFormData({ ...formData, data: e.target.value })
        } else if (data?.isSubDoc?.testimonial) {
            setFormData({ ...formData, data: e.target.value.slice(17) })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        
    }

    const uploadImage = () => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        const file = new FormData()


        file.append('file', crop?.crop ? croppedUrl : cloudImage[0])
        file.append('upload_preset', 'profile')
        axios.post("https://api.cloudinary.com/v1_1/redwine/image/upload", file).then((res) => {
            
            if (data?.isSubDoc?.isSubDoc) {
                dispatch(updateSubDocInProfileById({ subId: data?.isSubDoc?._id, userId: user?._id, newData: res.data.secure_url }, profile?._id, data?.name))
            } else if (data?.addImage) {
                dispatch(addImageInProfile({ data: res.data.secure_url, userId: user?._id }, profile?._id, data?.query))
            } else {
                dispatch(updateProfile({ userId: user?._id, data: { [data?.name]: res.data.secure_url } }, profile?._id))
            }
        })
        setRunFunction(true)

    }

    useEffect(() => {
        if (profile?.success && runFunction) {
            setIsSuccess(true)
        }

    }, [state, isSuccess, runFunction, vidUrl, enableCrop, croppedUrl, progress, multipleCounter])



    const onCloseHandler = () => {
        setIsSuccess(false)
        setRunFunction(false)

        if (setTextArea) {
            setTextArea(false)
        }

        if (crop?.crop) {
            setCrop({ crop: false, w: null, h: null })
        }
        modal(false)

    }

    const addMultipleImage = () => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        const file = new FormData()

        for (let i = 0; i < cloudImage.length; i++) {
            setRunFunction(true)
            file.append('file', cloudImage[i])
            file.append('upload_preset', 'profile')
            axios.post("https://api.cloudinary.com/v1_1/redwine/image/upload", file).then((res) => {
                if (data?.addImage) {
                    setMultipleCounter(i+1)
                    dispatch(addImageInProfile({ data: res.data.secure_url, userId: user?._id }, profile?._id, data?.query))
                }
            })
        }
        setRunFunction(false)
        setMultipleCounter(0)
    }


    const onChangeHandler = (event) => {
        if (crop?.crop) {
            if (event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);
                setCropUrl(src)
                setEnableCrop(true)
            }
        } else {
            setCloudImage(event.target.files)
        }
    }
    return (
        <div className="connectme__edit">
            <motion.div className="connectme__edit-modal" whileInView={{ y: 0, opacity: 1 }} initial={{ y: 200, opacity: 0 }}>
                <motion.div className="connectme__edit-close" onClick={() => onCloseHandler()} whileTap={{ scale: 1.1 }}>
                    <IoIosCloseCircleOutline />
                </motion.div>
                <div className="title">
                    <h1>{data?.title}</h1>

                </div>
                {
                    data?.fileUploader?.active ? (
                        <div className="uploader">
                            <input type="file" accept={`${data?.fileUploader?.data}`} multiple={multiple} name={data?.name} onChange={(e) => onChangeHandler(e)} />
                            {isSuccess && (
                                <p style={{ color: "green" }} >{data?.title} Updated</p>
                            )}
                            {multipleCounter > 0 && (
                                <p>{multipleCounter} files uploaded </p>
                            )}

                            <motion.div className="uploader_button" onClick={multiple ? addMultipleImage : uploadImage} whileTap={{ scale: 1.1 }} style={{ cursor: "pointer" }}>
                                {isLoading ? (
                                    <ClipLoader size={35} color="#000" />
                                ) : (
                                    <h1>Submit </h1>
                                )}
                            </motion.div>
                        </div>

                    ) : (

                        <form onSubmit={handleSub}>
                            <div className="content">
                                {usetextarea ? (
                                    <textarea rows={5} defaultValue={data?.data} name={data?.name} onChange={handleChange} />

                                ) : (
                                    <input type="text" defaultValue={data?.data} name={data?.name} onChange={handleChange} />

                                )}
                                {isSuccess && (
                                    <p style={{ color: "green" }} >{data?.title} Updated</p>
                                )}
                            </div>
                            <motion.div className="button" whileTap={{ scale: 1.1 }}>
                                <button type="submit" >{
                                    isLoading ? (
                                        <ClipLoader size={15} color="#000" />
                                    ) : (
                                        "Update"
                                    )
                                }</button>
                            </motion.div>

                        </form>

                    )
                }
            </motion.div>
            {
                enableCrop && (
                    <Crop img={cropUrl} w={crop.w} h={crop.h} setcroppedUrl={setcroppedUrl} setModal={setEnableCrop} />
                )
            }
        </div>
    )
}

export default Edit
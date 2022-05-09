import { motion } from "framer-motion"
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { addImageInProfile, updateProfile, updateSubDocInProfileById } from "../../../../redux/action/Profile"
import axios from "axios"
import { ToastContainer, toast } from "react-toast"
import ProgressBar from "@ramonak/react-progress-bar";
import { MdOutlineDone } from 'react-icons/md'



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

    const [allImageUploaded, seAllImageUploaded] = useState(false)
    const [showLoading, setshowLoading] = useState(false)



    useEffect(() => {

    }, [dispatch, formData, cloudImage, showLoading])

    const placeholder = data?.isSubDoc && data?.isSubDoc?.placeholder
    const handleSub = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        setRunFunction(true)
        if (data?.isSubDoc?.isSubDoc) {
            console.log("rsika")
            dispatch(updateSubDocInProfileById({ subId: data?.isSubDoc?._id, userId: user?._id, newData: formData.data }, profile?._id, data?.name, data?.isSubDoc?.isSubDoc?.underneath ? true : false))
        } else if (data?.isSubDoc?.testimonial || data?.isSubDoc?.interests) {
            console.log("rujsj")
            dispatch(addImageInProfile({ data: formData?.data, userId: user?._id }, profile?._id, data?.name))
        } else {
            dispatch(updateProfile({ userId: user?._id, data: formData }, profile?._id))
        }
        setRunFunction(false)
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (data?.isSubDoc?.isSubDoc || data?.isSubDoc?.interests) {
            console.log("runn")
            setFormData({ ...formData, data: e.target.value })
        } else if (data?.isSubDoc?.testimonial) {
            console.log("runnadd")
            setFormData({ ...formData, data: e.target.value.slice(17) })
        } else {
            console.log("runnaddsss")
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }

    }
    console.log({ formData, data })

    const uploadImage = () => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        const file = new FormData()


        file.append('file', crop?.crop ? croppedUrl : cloudImage[0])
        file.append('upload_preset', 'profile')
        setRunFunction(true)
        axios.post("https://api.cloudinary.com/v1_1/redwine/image/upload", file, {
            onUploadProgress: (pro) => {
                const { loaded, total } = pro;
                let percent = Math.floor(loaded * 100 / total)
                setProgress(percent)
            }
        }).then((res) => {

            if (data?.isSubDoc?.isSubDoc) {
                dispatch(updateSubDocInProfileById({ subId: data?.isSubDoc?._id, userId: user?._id, newData: res.data.secure_url }, profile?._id, data?.name))
            } else if (data?.addImage) {
                dispatch(addImageInProfile({ data: res.data.secure_url, userId: user?._id }, profile?._id, data?.query))
            } else {
                dispatch(updateProfile({ userId: user?._id, data: { [data?.name]: res.data.secure_url } }, profile?._id))
            }
        })
        setRunFunction(false)

    }

    useEffect(() => {
        if (profile?.success) {
            setIsSuccess(true)

            setTimeout(()=>{
                setIsSuccess(false)
                profile.success=null
            },[3000])
        }
        

    }, [state, isSuccess, runFunction, vidUrl, enableCrop, croppedUrl, progress, allImageUploaded])


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


        if (cloudImage === '') {
            toast("Please Select an Image", {
                backgroundColor: "red",
                color: "white"
            })
        }

        seAllImageUploaded(false)
        setRunFunction(true)
        for (let i = 0; i < cloudImage.length; i++) {
            file.append('file', cloudImage[i])
            file.append('upload_preset', 'profile')
            setProgress(0)
            setshowLoading(true)
            axios.post("https://api.cloudinary.com/v1_1/redwine/image/upload", file, {
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

                    setProgress(percentCompleted)
                }
            }).then((res) => {

                dispatch(addImageInProfile({ data: res.data.secure_url, userId: user?._id }, profile?._id, data?.query))

                if (i + 1 === cloudImage.length) {
                    seAllImageUploaded(true)
                }

            }).catch((err) => {
                setRunFunction(false)
                console.log({ err })
            })
        }
        setRunFunction(false)
    }


    const onChangeHandler = (event) => {
        if (event.target.files.length > 5) {
            toast("You can't Upload more than 5 images", {
                backgroundColor: "red",
                color: "white"
            })
            setCloudImage("")
        } else if (crop?.crop) {
            if (event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);
                setCropUrl(src)
                setEnableCrop(true)
            }
        } else {
            setCloudImage(event.target.files)
        }
    }

    console.log({isSuccess})

    return (
        <div className="connectme__edit">
            <ToastContainer position="top-right" delay={2000} />
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

                            {/* {
                                multipleCounter.map((d) => (
                                    <>
                                        {cloudImage.length !== 1 && (
                                            <p style={{ display: "flex", justifyContent: "center" }}>
                                                {d.num + 1}. <ProgressBar completed={d.progress} height={3} isLabelVisible={false} width={100} customLabel="" margin=".7rem" /> {d.progress === 100 && (
                                                    <MdOutlineDone color="springgreen" />
                                                )}
                                            </p>
                                        )}
                                    </>
                                ))
                            } */}
                            {
                                showLoading && (
                                    <div className="progress__bar">
                                        {!allImageUploaded ? (
                                            <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <ProgressBar completed={progress} height={3} isLabelVisible={false} width={100} customLabel="" margin=".7rem" /> {progress === 100 && (
                                                    <MdOutlineDone color="springgreen" />
                                                )}
                                            </p>
                                        ) : (
                                            <p>{cloudImage.length === 1 ? "Image" : "All Images"} Uploaded</p>
                                        )}
                                    </div>
                                )
                            }

                            {
                                cloudImage.length > 5 && (
                                    <p> You Can&apos;t Upload More than 5 photos </p>
                                )
                            }
                            {
                                isSuccess && (
                                    <p>Image Uploaded Successfully</p>
                                )
                            }
                            {
                                data.name === "background" || data.name === "profileimg" ? null :    (
                                    <motion.div className="uploader_button" onClick={multiple ? addMultipleImage : uploadImage} whileTap={{ scale: 1.1 }} style={{ cursor: "pointer" }}>
                                        {!multiple && isLoading ? (
                                            <ClipLoader size={35} color="#000" />
                                        ) : (
                                            <h1>Submit </h1>
                                        )}
                                    </motion.div>
                                )
                            }
                        </div>
                    ) : (

                        <form onSubmit={handleSub}>
                            <div className="content">
                                {usetextarea ? (
                                    <textarea rows={7} defaultValue={data?.data} name={data?.name} onChange={handleChange} />

                                ) : (
                                    <input type="text" defaultValue={data?.data} name={data?.name} onChange={handleChange} placeholder={placeholder} />

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
                    <Crop img={cropUrl} w={crop.w} data={data} h={crop.h} uploadImage={uploadImage} setcroppedUrl={setcroppedUrl} setModal={setEnableCrop} />
                )
            }
        </div>
    )
}

export default Edit
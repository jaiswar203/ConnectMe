import { AiFillEye, AiOutlineLogin, AiOutlineShareAlt, AiOutlineSearch } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUserData } from '../../../redux/action/Auth'
import { RiLogoutCircleRFill } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import PopModal from '../modal/Popup'


const Footer = ({ edit, setShare, setShowRequesList, setSearchBar, view }) => {
    const router = useRouter()
    const state = useSelector((state) => state)
    const { profileReducer } = state
    const dispatch = useDispatch()
    const [reqCount, setReqCount] = useState(0)
    const [popUpModal, setpopUpModal] = useState(false)

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("profile"))?.data
        dispatch(getCurrentUserData())
        setReqCount(profile?.requests?.length)


    }, [dispatch, reqCount, profileReducer, popUpModal])

    const userData = state !== undefined && state.AuthRedu.user

    const editHandler = () => {
        if (edit) {
            router.push(`/${userData?.existingUser?.username}`)
        } else {
            router.push(`/edit/${userData?.existingUser?.username}`)
        }
    }

    const logouthandler=()=>{
        dispatch({type:"LOGOUT"})
        setpopUpModal(false)
    }

    return (
        <div className='center__footer'>
            <div className="connectme__footer">
                {!view && (
                    <motion.div className="connectme__footer-view" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={editHandler} >
                        {edit ? (
                            <AiFillEye />
                        ) : (
                            <FiEdit />
                        )}
                    </motion.div>
                )}
                <motion.div className="connectme__footer-share" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={() => setShare(true)}>
                    <AiOutlineShareAlt />
                </motion.div>
                <motion.div className="connectme__footer-search" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={() => setSearchBar(true)}>
                    <AiOutlineSearch />
                </motion.div>
                {
                    !view && (
                        <div className="connectme__footer-request" onClick={() => setShowRequesList(true)} >
                            <BsBell />
                            {reqCount > 0 && (
                                <div className="notify">
                                    <p>{reqCount}</p>
                                </div>
                            )}
                        </div>
                    )
                }
                {
                    !view ? (
                        <motion.div className="connectme__footer-logout" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={() => setpopUpModal(true)}>
                            <RiLogoutCircleRFill color='red' />
                        </motion.div>
                    ) : (
                        <motion.div className="connectme__footer-logout" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={() => router.push("/login")}>
                            <AiOutlineLogin color='springgreen' />
                        </motion.div>
                    )
                }
            </div>
            {
                popUpModal && (
                    <PopModal setModal={setpopUpModal} handler={logouthandler} title="Logout" message={"Are You sure you want to logout?"} confirm={true} success={false} />
                )
            }
        </div>
    )
}

export default Footer
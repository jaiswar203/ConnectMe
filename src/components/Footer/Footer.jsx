import { AiFillEye,AiFillBell, AiFillEyeInvisible, AiOutlineShareAlt, AiOutlineSearch } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUserData } from '../../../redux/action/Auth'
import {RiLogoutCircleRFill} from 'react-icons/ri'


const Footer = ({ edit, setShare, setShowRequesList, setSearchBar }) => {
    const router = useRouter()
    const state = useSelector((state) => state)
    const {profileReducer}=state
    const dispatch = useDispatch()
    const [reqCount, setReqCount] = useState(0)

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("profile"))?.data
        dispatch(getCurrentUserData())
        setReqCount(profile?.requests?.length)
        
        
    }, [dispatch, reqCount,profileReducer])

    const userData = state !== undefined && state.AuthRedu.user

    const editHandler = () => {
        if (edit) {
            router.push(`/${userData?.existingUser?.username}`)
        } else {
            router.push(`/edit/${userData?.existingUser?.username}`)
        }
    }



    return (
        <div className='center__footer'>
            <div className="connectme__footer">
                <motion.div className="connectme__footer-view" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={editHandler} >
                    {edit ? (
                        <AiFillEyeInvisible />
                    ) : (
                        <AiFillEye />
                    )}
                </motion.div>
                <motion.div className="connectme__footer-share" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={() => setShare(true)}>
                    <AiOutlineShareAlt />
                </motion.div>
                <div className="connectme__footer-request" onClick={() => setShowRequesList(true)} >
                    <BsBell />
                    {reqCount > 0 && (
                        <div className="notify">
                            <p>{reqCount}</p>
                        </div>
                    )}
                </div>
                <motion.div className="connectme__footer-search" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={() => setSearchBar(true)}>
                    <AiOutlineSearch />
                </motion.div>
                {/* <motion.div className="connectme__footer-logout" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }} onClick={() => setSearchBar(true)}>
                    <RiLogoutCircleRFill color='red' />
                </motion.div> */}
            </div>
        </div>
    )
}

export default Footer
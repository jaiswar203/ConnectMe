import Link from 'next/link'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { existingUserData } from '../../../redux/action/Auth';
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'
import { useRouter } from 'next/router';

const Navbar = () => {
    
    const state = useSelector((state) => state.AuthRedu)
    const authData=state?.authData
    const dispacth = useDispatch()
    const router = useRouter()

    const logout=()=>{
        dispacth({type:"LOGOUT"})
        router.push("/")

    }
    useEffect(() => {
        const data = localStorage.getItem("UserAuth")
        dispacth(existingUserData(JSON.parse(data)))

        const token=authData?.token

        if(token){
            const decodeToken=decode(token)
            if(decodeToken.exp * 1000 < new Date().getTime()) logout()
        }

    }, [dispacth])
    const { signup } = router.query

    const SignOutHandler = () => {
        dispacth({ type: "LOGOUT" })
    }
    console.log({ authData })
    

    return (
        <header className='connectme__header'>
            <div className="connectme__header-icon">
                <h1>ConnectMe</h1>
            </div>
            <div className="connectme__header-signup">
                {
                    !authData ? (
                        <Link href={`/login${signup ? "" : "?signup=true"}`}>
                            <motion.div className="box" whileHover={{ scale: 1.1 }}>
                                <p>{signup ? "Login" : "Sign Up"}</p>
                            </motion.div>
                        </Link>
                    ) : (
                        <>
                            <motion.div className="box" whileHover={{ scale: 1.1 }} onClick={SignOutHandler}>
                                <p>Sign Out</p>
                            </motion.div>
                        </>
                    )
                }
            </div>
        </header >
    );
};

export default Navbar;
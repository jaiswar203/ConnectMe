import { useRouter } from "next/router"
import { useEffect } from "react"
import { v4 as uuid } from 'uuid'
import Head from "next/head"
import { useSelector } from "react-redux"
import { User } from "../src/components"
import { useDispatch } from "react-redux"

import { viewProfile } from "../redux/action/Profile"

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const state = useSelector((state) => state)
  const authData = state?.AuthRedu.authData
  const profileData = state?.profileReducer && state?.profileReducer?.profile?.data
  const dispatch = useDispatch()

  const uniqueIdForVisitor = uuid()


  useEffect(() => {
    const is_cookie_exist = localStorage.getItem("unique")
 
    if (is_cookie_exist === null) {
      localStorage.setItem("unique", uniqueIdForVisitor)
    }
  }, [authData])

  useEffect(() => {

  }, [dispatch, router])
  

  return (
    <>
        {/* <Head>
          <meta property="og:title" content="hello World" key="ogTitlw" />
          <meta property="og:type" content="profile.image" key="ogType" />
          <meta property="og:site_name" content="ConnectMe" key="ogSitename" />
          <meta property="og:url" content={"https://connectme.co.in/"} key="ogUrl" />
          <meta property="og:image" content={profileData?.profileImg} key="ogimage" />
          <meta property="og:desc" content="Why to be King When You can be god" key="ogdesc" />
        </Head> */}
      <User edit={false} />
    </>
  )
}

export default Detail
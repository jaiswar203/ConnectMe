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
  console.log({ state, profileData })

  return (
    <div>
      <Head>
        <meta
          property="og:image"
          content={`https://connectme.co.in/api/og-image?name=${id}&stage=adopt`}
        />

      </Head>
      <User edit={false} />
    </div>
  )
}

export default Detail
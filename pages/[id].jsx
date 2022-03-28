import { useRouter } from "next/router"
import { useEffect } from "react"
import {v4 as uuid} from 'uuid'
import { useSelector } from "react-redux"
import { User } from "../src/components"

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const state = useSelector((state) => state.AuthRedu)
  const authData = state?.authData
  
  const uniqueIdForVisitor=uuid()

  
  useEffect(()=>{
    const is_cookie_exist=localStorage.getItem("unique")

    if(is_cookie_exist===null){
      localStorage.setItem("unique",uniqueIdForVisitor)
    }
  },[authData])
  return (
    <User edit={false} />
  )
}

export default Detail
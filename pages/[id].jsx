import { useRouter } from "next/router"
import { useEffect } from "react"
import {v4 as uuid} from 'uuid'
import { useSelector } from "react-redux"
import { User } from "../src/components"
import { useDispatch } from "react-redux"

import { viewProfile } from "../redux/action/Profile"

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const state = useSelector((state) => state.AuthRedu)
  const authData = state?.authData
  const dispatch=useDispatch()
  
  const uniqueIdForVisitor=uuid()

  
  useEffect(()=>{
    const is_cookie_exist=localStorage.getItem("unique")

    if(is_cookie_exist===null){
      localStorage.setItem("unique",uniqueIdForVisitor)
    }
  },[authData])

  useEffect(()=>{
    
  },[dispatch,router])
  
  return (
    <User edit={false} />
  )
}

export default Detail
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const state = useSelector((state) => state.AuthRedu)
  const authData = state?.authData
  console.log({ authData,state })

  useEffect(()=>{

  },[authData])
  return (
    <div>Detail</div>
  )
}

export default Detail
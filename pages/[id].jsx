

import Head from "next/head"
import axios from "axios"

import { User } from "../src/components"

const Detail = ({profile}) => {
  
  return (
    <>
        <Head>
          <meta property="og:title" content={`${profile?.data?.name}`} key="ogTitle" />
          <meta property="og:type" content={"profile.image"} key="ogType" />
          <meta property="og:site_name" content="ConnectMe" key="ogSitename" />
          <meta property="og:url" content={"https://connectme.co.in/"} key="ogUrl" />
          <meta property="og:image" content={profile?.data?.profileimg} key="ogimage" />
          <meta property="og:desc" content={`${profile?.data?.tagline}`} key="ogdesc" />
        </Head>
      <User edit={false}  />
    </>
  )
}

export default Detail


export async function getServerSideProps(context){

  const query=context.query
  const {data}=await axios.get(`https://connectmev2.herokuapp.com/profile/${query.id}`)
  
  
  return {
    props:{
      profile: data
    }
  }
}
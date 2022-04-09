import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from 'next/link'
import Head from "next/head"

import { deleteSubDocInProfileById, getCookieData, getProfileById, getProfileByUserName, likeProfile, profileRequests, updateProfile } from "../../../redux/action/Profile"
import Layout from '../Layout'

import Port from "./subcomponents/Port"
import Testimonial from './subcomponents/Testimonial'
import Modal from "./subcomponents/Modal"

import Instagram from "./logo/insta"
import { FaEdit } from "react-icons/fa"
import Gmail from "./logo/gmail"

import { VscFeedback } from 'react-icons/vsc'

import { IoIosDocument } from 'react-icons/io'
import { FcLike, FcLikePlaceholder, FcLock } from 'react-icons/fc'



// icons 
import Edit from "./subcomponents/Edit"
import PopupModal from "../modal/Popup"
import Facebook from "./logo/facebook"
import Twitter from "./logo/twitter"
import Linkedin from "./logo/linkedin"
import IMDB from "./logo/imdb"
import Website from "./logo/website"
import Phone from "./logo/phone"
import Youtube from "./logo/youtube"
import Wikipedia from "./logo/wikipedia"
import WhatsApp from "./logo/whatsapp"
import SMS from "./logo/Sms"
import ToggleSwitch from "./subcomponents/Toggle"
import { MdDelete } from "react-icons/md"
import Request from "./subcomponents/Request"
import Share from "../Footer/Share"
import SearchBar from "../Footer/SearchBar"


const User = ({ edit }) => {
  const [width, setWidth] = useState(1000)
  const state = useSelector((state) => state)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [imgProp, setImgProp] = useState({ w: 200, h: 250 })
  const dispatch = useDispatch()
  const { profile, error, isLoading, profcookie } = state.profileReducer
  const router = useRouter()
  const profileData = profile !== null ? profile?.data : []
  // edititable content
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ title: "", name: "", data: null })
  const [isUserLikeProfile, setIsUserLikeProfile] = useState(false)
  const [isCrop, setIsCrop] = useState({ crop: false, w: null, h: null })

  const [isPrivate, setIsPrivate] = useState(null)

  const { query } = router

  // editable
  const [privacyModal, setPrivacyModal] = useState(false)
  const [popUpData, setPopUpData] = useState({
    success: null, setModal: null, message: "", title: "", handler: null
  })

  const [showPop, setShowPop] = useState(false)

  const [showEditOptionOnViewSide, setShowEditOptionOnViewSide] = useState(false)

  // toggle 
  const [pdfData, setPdfData] = useState(false)

  const [showRequesList, setShowRequesList] = useState(false)


  const [userName, setUserName] = useState("")

  const [textArea, setTextArea] = useState(false)

  // share 
  const [share, setShare] = useState(false)
  // search
  const [searchBar, setSearchBar] = useState(false)
  // repositioning in social handle
  // const [rePos, setRePos] = useState({from:null,})

  useEffect(() => {

    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    })

    setWidth(window.innerWidth)

    if (width < 1000 & width > 750) {
      setBannerHeight(600)
      setImgProp({ ...imgProp, w: 150, h: 200 })
    } else if (width < 750 & width > 500) {
      setBannerHeight(700)
      setImgProp({ ...imgProp, w: 125, h: 175 })
    } else if (width < 500) {
      setBannerHeight(700)
      setImgProp({ ...imgProp, w: 120, h: 160 })
    } else {
      setBannerHeight(500)
      setImgProp({ ...imgProp, w: 200, h: 250 })
    }
  }, [width, bannerHeight, share, searchBar])

  useEffect(() => {

  }, [imgProp.w, imgProp.h, showPop, showRequesList, textArea])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))
    const cookie = localStorage.getItem("unique")
    if (edit || !edit && router.query.id === data?.existingUser?.username) {
      dispatch(getProfileById({ email: data?.existingUser?.email }, data?.existingUser?.profile))
    }
    // if(!edit && router.query.id=== data?.existingUser?.username){
    //   dispatch(getProfileById({ email: data?.existingUser?.email }, data?.existingUser?.profile))
    // }
    if (!edit) {
      if (data !== null && cookie) {
        dispatch(getProfileByUserName(query?.id, { userId: data?.existingUser._id }, true, cookie))
      } else if (cookie) {
        dispatch(getProfileByUserName(query?.id, { userId: data?.existingUser._id }, false, cookie))
      }
    }


    if (data) {
      setUserName(data?.existingUser?.username)
    }

    if (profileData?._id === data?.existingUser?.profile) {

    }


    const profileData = JSON.parse(localStorage.getItem("profile"))

    if (profileData) {
      setPdfData(profileData?.data?.document?.active)
    }

    if (profileData !== null && !profileData?.isUserAdmin) {
      // router.push("/?not-authorized")
      return (
        <h1>
          You Are not the account admin
        </h1>
      )
    }


    if (data) {
      if (edit && router.query.id !== data?.existingUser?.username) {
        router.push(`/edit/${data?.existingUser?.username}`)
        return null
      }
    }

    if (!data && edit) {
      router.push("/login")
    }

  }, [showModal, dispatch, router.query, popUpData])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))

    if (data !== undefined && query && !edit) {
      if (data?.existingUser?.username === query.id) {
        setShowEditOptionOnViewSide(true)
      } else {
        setShowEditOptionOnViewSide(false)
      }
    }


  }, [editData, openEdit, userName, showEditOptionOnViewSide, router])


  console.log({ profcookie })


  const logout = () => {
    dispatch({ type: "LOGOUT" })
    router.push("/")
  }


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserAuth"))
    // const profile = JSON.parse(localStorage.getItem("profile"))?.data

    /* Disabling Logout , if want to unable simply just uncomment below lines */

    // const data = user?.token

    // if (data) {
    //   const decodedData = jwtDecode(data)
    //   if (decodedData.exp * 1000 < new Date().getTime()) return logout()

    //   const date=new Date().getTime()
    //   console.log({decodedData,date})
    // }

    const userData = user?.existingUser

    if (profile && user) {
      const is_user_liked_this_profile = profileData.likes.find((d) => d === userData?._id)

      if (is_user_liked_this_profile) {
        setIsUserLikeProfile(true)
      } else if (is_user_liked_this_profile === undefined) {
        setIsUserLikeProfile(false)
      }
    }

    if (user?.existingUser?._id !== profileData?.createdBy) {
      profileData.requests = []

    }

    dispatch(getCookieData())
  }, [dispatch, isUserLikeProfile, profile, popUpData, profileData, error, isCrop])


  const parentVariantForInterests = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8
      }
    },
    hidden: {
      opacity: 0
    }
  }
  const childVariantForSocial = {
    visible: {
      x: 0,
      opacity: 1,
      speed: 50,

    },
    hidden: {
      x: 100,
      opacity: 0,
    }
  }
  const childVariantForConnect = {
    visible: {
      x: 0,
      opacity: 1,
      speed: 50,
    },
    hidden: {
      x: 100,
      y: 0,
      opacity: 0,
    }
  }


  const connects = [
    {
      item: <WhatsApp />,
      name: "Whatsapp",
      link: `https://wa.me/${profileData?.personal?.whatsapp}`,
      forupdate: profileData?.personal?.whatsapp
    },
    {
      item: <Phone />,
      name: "Call",
      link: `tel:${profileData?.personal?.phone}`,
      forupdate: profileData?.personal?.phone
    },
    {
      item: <Gmail />,
      name: "Mail",
      link: `mailto:${profileData?.personal?.mail}`,
      forupdate: profileData?.personal?.mail
    },
    {
      item: <SMS />,
      name: "SMS",
      link: `sms:${profileData?.personal?.message}`,
      forupdate: profileData?.personal?.mail
    },
  ]



  const BorderComp = () => {
    return (
      <div className="border">
        <b className="hr anim"></b>
      </div>
    )
  }

  const userDetail = [
    {
      id: 0,
      name: "Profession",
      item: profileData?.additional?.profession,
      editable: true
    },
    {
      id: 1,
      name: "Likes",
      item: `${profileData?.likes?.length} Likes`,
      editable: false
    },
    {
      id: 2,
      name: "Views",
      item: `${profileData?.views?.length} view`,
      editable: false
    },
  ]



  const childForDetail = {
    hidden: {
      x: 50,

      opacity: 0,
      scale: 1.2

    },
    visible: {
      x: 0,
      y: [-50, 50, -50, 0],
      opacity: 1,
      transition: {
        ease: "easeIn",
        duration: 2
      },
      scale: 1
    }
  }

  const ReadMore = ({ children }) => {
    const text = children
    const [readMore, setReadMore] = useState(false)

    const toggleReadMore = () => {
      setReadMore(!readMore)
    }

    function shorten(str, maxLen, separator = ' ') {
      if (str.length <= maxLen) return str;
      return str.substr(0, str.lastIndexOf(separator, maxLen));
    }

    return (
      <p>
        {!readMore ? shorten(text, 250) : text}

        {
          text.length > 250 && (

            <span onClick={toggleReadMore}>
              {readMore ? "less" : "more"}
            </span>
          )
        }
      </p>
    )
  }



  const socialHandle = [
    {
      item: <Instagram />,
      name: "Instagram",
      link: profileData?.social?.insta
    },
    {
      item: <Facebook />,
      name: "Facebook",
      link: profileData?.social?.facebook
    },
    {
      item: <Twitter />,
      name: "Twitter",
      link: profileData?.social?.twitter
    },
    {
      item: <Linkedin />,
      name: "Linkedin",
      link: profileData?.social?.linkedin
    },
    {
      item: <Youtube />,
      name: "Youtube",
      link: profileData?.social?.youtube
    },
    {
      item: <Website />,
      name: "WebSite",
      link: profileData?.social?.website
    },
    {
      item: <Wikipedia />,
      name: "WikiPedia",
      link: profileData?.social?.wikipedia
    },
    {
      item: <IMDB />,
      name: "IMDB",
      link: profileData?.social?.imdb
    },
  ]


  if (error?.type === "EXIST_ERROR") {
    return (
      <PopupModal success={false} title={"Data Not Found"} message={"No User with this Id"} />
    )
  }

  if (profile === null) {
    return (
      <PopupModal success={false} title={"Fetching"} message={"Wait While Fetching Data"} />
    )
  }

  const openEditHandler = (data, title, name, isSubDoc = {}, fileUploader = false) => {
    setEditData({ ...editData, title: title, name: name, data: data, isSubDoc, fileUploader })
    setOpenEdit(true)
  }


  const privacyHandler = () => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

    const info = profileData?.isPrivate ? false : true

    dispatch(updateProfile({ userId: data?._id, data: { isPrivate: info } }, data?.profile))
    setShowPop(false)
  }

  const likeHandler = () => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

    dispatch(likeProfile(profileData?._id, data?._id))

  }

  const deleteSubDoc = (id, item) => {
    const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
    dispatch(deleteSubDocInProfileById({ subId: id, userId: user?._id }, user?.profile, item))
  }


  const connectsClick = (d) => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
    if (edit) {
      return null
    } else if (profileData?.isPrivate && !profile.access && profileData?._id !== data?.profile) {
      return null
    } else {
      return d.link
    }
  }



  const connectsChildren = (d) => {
    return (
      <motion.div variants={childVariantForConnect} viewport={{ once: true }} whileHover={{ y: !edit && -20, scale: !edit && 1.1 }} >
        {edit && (
          <div className="background" onClick={() => openEditHandler(d.forupdate, "Personal Connects", `personal.${d.name.toLowerCase()}`)} >
            <FaEdit />
          </div>
        )}
        {d.item}
      </motion.div>
    )
  }


  const requestHandler = () => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

    dispatch(profileRequests({ userId: data?._id }, profileData?._id))

    setShowPop(false)
  }


  const isUserAllowed = () => {
    if (profile.access) {
      return true
    } else {
      return false
    }
  }

  function socialHandleFilter(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }


  console.log({ k: Object.keys(profileData?.social), val: Object.values(profileData?.social) })


  function footerData() {
    const data = JSON.parse(localStorage.getItem("UserAuth"))

    if (!data) {
      return false
    } else {
      return true
    }
  }

  console.log({ profileData })
  return (
    <>
      <Head>
        <meta property="og:title" content="Create Awesome Film Debut Profile" />
        <meta property="og:image" content={profileData?.profileimg} />
        <meta property="og:image:secure_url" content={profileData?.profileimg} />
        <meta property="og:url" content="https://www.connectme.co.in" />
        <meta property="og:description" content={`Profile of ${profileData?.name}`} />
        <meta property="og:type" content="profile:username" />
      </Head>
      <Layout title={router.query.id} description={profileData.about} navbar={false} footer={footerData()} edit={edit} setShare={setShare} ogImg={profileData?.profileimg} setShowRequesList={setShowRequesList} setSearchBar={setSearchBar} name={profileData?.name} share={!edit && true} >

        <div className="connectme__user">
          <motion.div className="connectme__user-background" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <Image src={profileData?.background} width={1900} height={bannerHeight} layout="responsive" objectFit="cover" />
            {edit && (
              <motion.div className="background" onClick={() => {
                openEditHandler(profileData?.background, "Background Image", "background", { isSubdoc: false }, { active: true, data: "image/*" })
                setIsCrop({ crop: true, w: 540, h: 164 })
              }} whileTap={{ scale: 1.1 }}>
                <FaEdit />
              </motion.div>
            )}
          </motion.div>
          <motion.div className="connectme__user-profile" initial={{ y: 100, opacity: 0 }} animate={{ translateY: edit ? -75 : -40, y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, delay: .6, duration: 1.3 }}>
            {edit && (
              <motion.div className="background" onClick={() => {
                openEditHandler(profileData?.profileimg, "Profile Image", "profileimg", { isSubdoc: false }, { active: true, data: "image/*" })
                setIsCrop({ crop: true, w: 200, h: 250 })
              }} whileTap={{ scale: 1.1 }}>
                <FaEdit />
              </motion.div>
            )}
            <Image src={profileData?.profileimg} width={imgProp.w} height={imgProp.h} objectFit="cover" />
            <div className="info">
              <div className="info__name">
                <h2>{profileData?.name}</h2>
                {edit && (
                  <motion.div className="background-name" onClick={() => openEditHandler(profileData?.name, "Name", "name")} whileTap={{ scale: 1.1 }}>
                    <FaEdit />
                  </motion.div>
                )}
              </div>
              <div className="info__city">
                <p>{profileData?.city}</p>
                {edit && (
                  <motion.div className="background-city" onClick={() =>
                    openEditHandler(profileData?.city, "City", "city")
                  } whileTap={{ scale: 1.1 }}>
                    <FaEdit />
                  </motion.div>
                )}
              </div>
              {profileData?.tagline && (
                <div className="info__tagline">
                  <h4>
                    <span className="quotes">&quot; </span>{profileData.tagline}<span className="quotes">&quot;</span>
                  </h4>
                  {edit && (
                    <motion.div className="background__tagline" onClick={() => {
                      setTextArea(true)
                      openEditHandler(profileData?.tagline, "Tagline", "tagline")
                    }
                    } whileTap={{ scale: 1.1 }}>
                      <FaEdit />
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <div className="lower__sec">
            <motion.div className="connectme__user-detail" variants={parentVariantForInterests} initial="hidden" animate="visible">
              {userDetail.map((d) => (
                <motion.div className="connectme__user-detail__item" key={d.name} variants={childForDetail} >
                  {edit && d.editable && (
                    <motion.div className="background" onClick={() => edit && openEditHandler(d.item, `${d.name}`, `additional.${d.name.toLowerCase()}`, true)} whileTap={{ scale: 1.1 }}>
                      <FaEdit />
                    </motion.div>
                  )}
                  <p>{d.name}</p>
                  <h3>{d.item}</h3>
                </motion.div>
              ))}
            </motion.div>

            {
              !edit && JSON.parse(localStorage.getItem("UserAuth")) && (
                <div className="connectme__user-like">
                  <div className="like__button" onClick={likeHandler}>
                    {
                      isUserLikeProfile ? (
                        <FcLike />
                      ) : (
                        <FcLikePlaceholder />
                      )
                    }
                    <h3>{isUserLikeProfile ? "Dislike" : "Like"} This Profile</h3>
                  </div>
                </div>
              )
            }

            <BorderComp />
            <div className="connectme__user-about">
              {!edit && (
                <h1>About Me</h1>
              )}
              {edit && (
                <motion.div className="background" whileTap={{ scale: 1.1 }}>
                  <h1>About Me</h1>
                  <FaEdit onClick={() => {
                    setTextArea(true)
                    openEditHandler(profileData?.about, "About", "about")
                  }
                  } />
                </motion.div>
              )}
              <ReadMore>
                {profileData?.about}
              </ReadMore>
            </div>
            <BorderComp />

            <div className="connectme__user-interests">
              <div className="connectme__user-interests__title">
                <h1>Interests</h1>
                {edit && (
                  <motion.div className="add" whileTap={{ scale: 1.1 }} onClick={() => openEditHandler(null, "Interests", `interests`, { testimonial: true })} >
                    <h2>Add Interest</h2>
                  </motion.div>
                )}
              </div>
              <motion.div className="connectme__user-interests__info" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }} >
                {profileData?.interests.map((d) => (
                  <div className="bodies" key={d._id}  >
                    {
                      edit && (
                        <div className="background" onClick={() => deleteSubDoc(d._id, "interests")}>
                          <MdDelete />
                        </div>
                      )
                    }
                    <p>{d.data}</p>
                    {
                      edit && (
                        <div className="background" onClick={() => openEditHandler(d.data, "Interests", 'interests', { isSubDoc: true, _id: d._id })}>
                          <FaEdit />
                        </div>
                      )
                    }
                  </div>
                ))}

              </motion.div>
            </div>
            <BorderComp />

            <div className="connectme__user-social">
              <div className="connectme__user-social__title">
                <h1>Social Handles</h1>
              </div>
              <motion.div className="connectme__user-social__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {socialHandle.map((d, i) => i < 6 && (
                  <a href={edit ? null : d.link} target="_blank" key={d.name} rel="noreferrer" >
                    <motion.div className="item" variants={childVariantForSocial} viewport={{ once: true }} whileHover={{ scale: 1.2, color: "red" }} >
                      {d.item}
                      {edit && (
                        <div className="background" onClick={() => openEditHandler(d.link, "Social Handles", `social.${d.name.toLowerCase()}`)}>
                          <FaEdit />
                        </div>
                      )}
                      <motion.p> {d.name}</motion.p>
                    </motion.div>
                  </a>
                ))}
              </motion.div>
            </div>
            <BorderComp />
            <div className="connectme__user-connects">
              <div className="connectme__user-connects__title">
                {
                  profileData?._id === JSON.parse(localStorage.getItem("UserAuth"))?.existingUser?.profile && (

                    <ToggleSwitch isPrivate={true} profile={profileData} profileId={profileData?._id} />
                  )
                }
                <h1>ConnectMe</h1>
              </div>
              <motion.div className="connectme__user-connects__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {
                  connects.map((d) => profileData?.isPrivate && !profile?.access && profileData?._id !== JSON.parse(localStorage.getItem("UserAuth"))?.existingUser?.profile ? (
                    <div className="privacy" onClick={() => {
                      setShowPop(true)
                      setPopUpData({ ...popUpData, success: false, confirm: true, setModal: setShowPop, message: "You are not allowed to access this Information ,Send Request to Owner", handler: requestHandler })
                    }}
                    >
                      {connectsChildren(d)}
                    </div>
                  ) : (
                    <a href={connectsClick(d)} key={d.name} target="_blank" rel="noreferrer"   >
                      {connectsChildren(d)}
                    </a>
                  ))
                }
              </motion.div>
            </div>
            <BorderComp />

            <Testimonial edit={edit} data={profileData?.testimonial} openEditHandler={openEditHandler} />

            <BorderComp />
            <Port data={profileData?.portfolio} title={"PortFolio"} link={`/gallery/${userName}?content=portfolio`} edit={edit} openEditHandler={openEditHandler} />
            <BorderComp />

            <Port data={profileData?.services} title={"Services"} link={`/gallery/${userName}?content=services`} edit={edit} openEditHandler={openEditHandler} />

            {
              profileData?._id === JSON.parse(localStorage.getItem("UserAuth"))?.existingUser?.profile && edit ? (
                <>
                  <BorderComp />
                  <div className="connectme__user-personal">
                    <div className="connectme__user-personal__title">
                      <ToggleSwitch profile={profileData} profileId={profileData?._id} info={true} />
                      <h1>Personal Info</h1>
                    </div>
                    <div className="connectme__user-personal__content">
                      <motion.div className="button" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} onClick={() => setShowModal(true)}>
                        <FcLock />
                        <h3>Get Perosnal Info</h3>
                      </motion.div>
                    </div>
                  </div>
                </>
              ) : profileData?.userInfo?.access && (
                <>
                  <BorderComp />
                  <div className="connectme__user-personal">
                    <div className="connectme__user-personal__title">
                      <h1>Personal Info</h1>
                    </div>
                    <div className="connectme__user-personal__content">
                      <motion.div className="button" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} onClick={() => setShowModal(true)}>
                        <FcLock />
                        <h3>Get Perosnal Info</h3>
                      </motion.div>
                    </div>
                  </div>
                </>
              )
            }
            {profileData?.document.active && !edit ? (
              <>
                <BorderComp />
                <div className="connectme__user-document">
                  <div className="connectme__user-document__title">
                    <h1>Documentation</h1>
                  </div>
                  <div className="connectme__user-document__content">
                    <motion.div className="button" whileTap={{ scale: 1.1 }} onClick={() => window.open(profileData?.document?.data, "_blank")}>
                      <IoIosDocument />
                      <h3>Get PDF</h3>
                    </motion.div>
                  </div>
                </div>
              </>
            ) : edit && (
              <>
                <BorderComp />
                <div className="connectme__user-document">
                  <div className="connectme__user-document__title">
                    <h1>Documentation</h1>
                    <ToggleSwitch label={"hel"} data={pdfData} setHandler={setPdfData} profileId={profileData?._id} profile={profileData} apiId="document.active" />
                  </div>
                  <div className="connectme__user-document__content" onClick={() => openEditHandler(profileData?.document?.data, "Documents", `document.data`, { isSubDoc: false }, { active: true, data: "application/pdf" })} >
                    <motion.div className="button" whileTap={{ scale: 1.1 }} >
                      <IoIosDocument />
                      <h3>Get PDF</h3>
                    </motion.div>
                    {edit &&
                      (<div className="background" >
                        <FaEdit />
                      </div>)
                    }
                  </div>
                </div>
              </>
            )}

            {!edit && userName !== JSON.parse(localStorage.getItem("UserAuth"))?.existingUser?.username
              ? (
                <>
                  <BorderComp />
                  <div className="connectme__user-footer">
                    <div className="text" >
                      <h3>Create Your Professional/Personal Profile for Free!</h3>
                    </div>
                    <div className="content">
                      <Link href={"login?signup=true"} passHref>
                        <motion.div className="content__button" whileTap={{ scale: 1.1 }}>
                          <h3>Create Now</h3>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </>
              ) : null}
            {
              showModal && (
                <Modal setModal={setShowModal} edit={edit} data={profileData?.userInfo?.data} openEditHandler={openEditHandler} />
              )
            }
          </div>
          {
            openEdit && (
              <Edit modal={setOpenEdit} data={editData} isLoading={isLoading} state={profile} crop={isCrop} setCrop={setIsCrop} usetextarea={textArea} setTextArea={setTextArea} />
            )
          }
          {privacyModal && (
            <PopupModal success={true} message={`Your Account is  ${isPrivate ? "Public " : "Private"} Now`} title={`Privacy`} setModal={setPrivacyModal} handler={privacyHandler} />
          )}
          {
            showPop && (
              <PopupModal {...popUpData} />
            )
          }
          {
            showRequesList && (
              <Request data={profcookie?.data?.requests} setModal={setShowRequesList} />
            )
          }
          {
            share && (
              <Share setShare={setShare} username={router.query.id} />
            )
          }
          {
            searchBar && (
              <SearchBar setSearchBar={setSearchBar} />
            )
          }
          <BorderComp />
          <div className="connectme__user-feedback">
            <a href="mailto:info@connectme.com">
              <motion.div className="feedback" whileTap={{ scale: 1.1 }}>
                <VscFeedback />
                <h3>Offer FeedBack</h3>
              </motion.div>
            </a>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default User
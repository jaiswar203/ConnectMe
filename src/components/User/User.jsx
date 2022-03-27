import Image from "next/image"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaEdit } from "react-icons/fa"


import Instagram from "./logo/insta"
import Gmail from "./logo/gmail"

import Port from "./subcomponents/Port"
import Testimonial from './subcomponents/Testimonial'
import Modal from "./subcomponents/Modal"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'
import { AiFillSetting } from 'react-icons/ai'
import { VscFeedback } from 'react-icons/vsc'
import { BsInfoCircle } from 'react-icons/bs'
import { IoIosDocument } from 'react-icons/io'

import { getProfileById, getProfileByUserName, profileRequests, updateProfile } from "../../../redux/action/Profile"

// icons 
import Edit from "./subcomponents/Edit"
import jwtDecode from "jwt-decode"
import PopupModal from "../modal/Popup"
import Facebook from "./logo/facebook"
import Twitter from "./logo/twitter"
import Linkedin from "./logo/linkedin"
import IMDB from "./logo/imdb"
import Website from "./logo/website"
import Phone from "./logo/phone"
import WhatsApp from "./logo/whatsapp"
import SMS from "./logo/Sms"
import ToggleSwitch from "./subcomponents/Toggle"


const User = ({ edit }) => {
  const [width, setWidth] = useState(1000)
  const state = useSelector((state) => state)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [imgProp, setImgProp] = useState({ w: 200, h: 250 })
  const dispatch = useDispatch()
  const { profile, error } = state.profileReducer
  const router = useRouter()
  const profileData = profile !== null ? profile?.data : []
  // edititable content
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ title: "", name: "", data: null })

  const [isPrivate, setIsPrivate] = useState(null)

  const { query } = router

  // editable
  const [privacyModal, setPrivacyModal] = useState(false)
  const [popUpData, setPopUpData] = useState({
    success: null, setModal: null, message: "", title: "", handler: null
  })

  const [showEditOptionOnViewSide, setShowEditOptionOnViewSide] = useState(false)

  // toggle 
  const [pdfData, setPdfData] = useState(false)

  const [userName, setUserName] = useState("")
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
      setBannerHeight(1000)
      setImgProp({ ...imgProp, w: 140, h: 180 })
    } else {
      setBannerHeight(500)
      setImgProp({ ...imgProp, w: 200, h: 250 })
    }
  }, [width, bannerHeight])

  useEffect(() => {

  }, [imgProp.w, imgProp.h])



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
  const childVariantForInterests = {
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        ease: [.5, .01, -0.05, .95],
        duration: 2
      }
    },
    hidden: {
      y: -100,
      x: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
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
  console.log({ profile, error })


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))
    if (edit) {
      dispatch(getProfileById({ email: data?.existingUser?.email }, data?.existingUser?.profile))
    }
    if (!edit) {
      if (data !== null) {
        console.log("runn", data)
        dispatch(getProfileByUserName(query?.id, { userId: data?.existingUser._id }, true))
      } else {
        console.log("runn nit")
        dispatch(getProfileByUserName(query?.id, { userId: data?.existingUser._id }, false))
      }
    }


    if (data) {
      setUserName(data?.existingUser?.username)
    }

    const profileData = JSON.parse(localStorage.getItem("profile"))

    if (profileData) {
      setPdfData(profileData?.data?.document?.active)
    }

    if (profileData !== null && !profileData?.isUserAdmin) {
      router.push("/?not-authorized")
      return (
        <h1>
          You Are not the account admin
        </h1>
      )
    }


    if (edit && router.query.id !== data?.existingUser?.username) {
      router.push(`/edit/${data?.existingUser?.username}`)
      return null
    }
    if (edit && data === null) {
      router.push("/login")
    }
  }, [showModal, dispatch, router.query, pdfData])
  console.log({ pdfData })

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
      item: profileData?.additional?.profession
    },
    {
      id: 1,
      name: "Speciality",
      item: profileData?.additional?.speciality
    },
    {
      id: 2,
      name: "BirthDate",
      item: profileData?.additional?.birthdate
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
        <span onClick={toggleReadMore}>
          {readMore ? "less" : "more"}
        </span>
      </p>
    )
  }

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



  const logout = () => {
    dispatch({ type: "LOGOUT" })
    router.push("/")
  }
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))?.token
    const profile = JSON.parse(localStorage.getItem("profile"))?.data

    if (data) {
      const decodedData = jwtDecode(data)
      if (decodedData.exp * 1000 < new Date().getTime()) return logout()

    }
    if (profile !== undefined) {
      setIsPrivate(profile?.isPrivate)
      console.log({ isPrivate })
    }


  }, [dispatch, isPrivate])


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
      item: <IMDB />,
      name: "IMDB",
      link: profileData?.social?.imdb
    },
    {
      item: <Website />,
      name: "WebSite",
      link: profileData?.social?.website
    },
  ]

  // if (error) {
  //   return (
  //     <h1>{error?.message}</h1>
  //   )
  // }
  // const sendRequestHandler=()=>{
  //   const data=JSON.parse(localStorage.getItem("UserAuth"))
  //   dispatch(profileRequests({userId: data?._id},query?.id))
  // }
  // if(error){
  //   return (
  //     <PopupModal success={false} confirm={true} message={error?.message} title={error.title} handler={sendRequestHandler}  />
  //   )
  // }
  if (profile === null) {
    return <h1>..waiting</h1>
  }

  const openEditHandler = (data, title, name, isSubDoc = {}, fileUploader = false) => {
    setEditData({ ...editData, title: title, name: name, data: data, isSubDoc, fileUploader })
    setOpenEdit(true)
  }


  const privacyHandler = (decision) => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
    console.log({ decision })
    dispatch(updateProfile({ userId: data?._id, data: decision }, data?.profile))
    setPrivacyModal(true)
  }

  return (
    <div className="connectme__user">
      <motion.div className="connectme__user-background" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
        <Image src={profileData?.background} width={1900} height={bannerHeight} layout="responsive" objectFit="cover" />
        {edit && (
          <motion.div className="background" onClick={() => edit && openEditHandler(profileData?.background, "Background Image", "background", { isSubdoc: false }, { active: true, data: "image/*" })} whileTap={{ scale: 1.1 }}>
            <FaEdit />
          </motion.div>
        )}
      </motion.div>
      <motion.div className="connectme__user-profile" initial={{ y: 100, opacity: 0 }} animate={{ translateY: -100, y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, delay: .6, duration: 1.3 }}>
        {edit && (
          <motion.div className="background" onClick={() => edit && openEditHandler(profileData?.profileimg, "Profile Image", "profileimg", { isSubdoc: false }, { active: true, data: "image/*" })} whileTap={{ scale: 1.1 }}>
            <FaEdit />
          </motion.div>
        )}
        <Image src={profileData?.profileimg} width={imgProp.w} height={imgProp.h} objectFit="cover" />
        <div className="info">
          <div className="info__name">
            <h2>{profileData?.name}</h2>
            {edit && (
              <motion.div className="background-name" onClick={() => edit && openEditHandler(profileData?.name, "Name", "name")} whileTap={{ scale: 1.1 }}>
                <FaEdit />
              </motion.div>
            )}
          </div>
          <div className="info__city">
            <p>{profileData?.city}</p>
            {edit && (
              <motion.div className="background-city" onClick={() => edit && openEditHandler(profileData?.city, "City", "city")} whileTap={{ scale: 1.1 }}>
                <FaEdit />
              </motion.div>
            )}
          </div>
          {profileData?.tagline && (
            <div className="info__tagline">
              <h4> <span className="quotes">&quot; </span>{profileData.tagline}<span className="quotes">&quot;</span> </h4>
            </div>
          )}
        </div>
      </motion.div>



      <motion.div className="connectme__user-edit__button" whileTap={{ scale: 1.1 }} onClick={() => { showEditOptionOnViewSide ? router.push(`/edit/${userName}`) : router.push(`/${userName}`) }}>
        <div className="edit__button">
          <AiFillSetting />
          <div className="text">
            <h3>{showEditOptionOnViewSide ? "Edit" : "View"}</h3>
          </div>
        </div>
      </motion.div>

      <div className="lower__sec">
        <motion.div className="connectme__user-detail" variants={parentVariantForInterests} initial="hidden" animate="visible">
          {userDetail.map((d) => (
            <motion.div className="connectme__user-detail__item" key={d.name} variants={childForDetail} >

              {edit && (
                <motion.div className="background" onClick={() => edit && openEditHandler(d.item, `${d.name}`, `additional.${d.name.toLowerCase()}`, true)} whileTap={{ scale: 1.1 }}>
                  <FaEdit />
                </motion.div>
              )}
              <p>{d.name}</p>
              <h3>{d.item}</h3>
            </motion.div>
          ))}
        </motion.div>
        <BorderComp />
        <div className="connectme__user-about">
          {!edit && (
            <h1>About Me</h1>
          )}
          {edit && (
            <motion.div className="background" whileTap={{ scale: 1.1 }}>
              <h1>About Me</h1>
              <FaEdit onClick={() => edit && openEditHandler(profileData?.about, "About", "about")} />
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
          </div>
          <motion.div className="connectme__user-interests__info" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }} >
            {profileData?.interests.map((d) => (
              <motion.div className="bodies" key={d._id} variants={childVariantForInterests} viewport={{ once: true }} >
                <p>{d.data}</p>
                {
                  edit && (
                    <div className="background" onClick={() => openEditHandler(d.data, "Interests", 'interests', { isSubDoc: true, _id: d._id })}>
                      <FaEdit />
                    </div>
                  )
                }
              </motion.div>
            ))}
          </motion.div>
        </div>
        <BorderComp />

        <div className="connectme__user-social">
          <div className="connectme__user-social__title">
            <h1>Social Handles</h1>
          </div>
          <motion.div className="connectme__user-social__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {socialHandle.map((d) => (
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
            <h1>ConnectMe</h1>
          </div>
          <motion.div className="connectme__user-connects__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {
              connects.map((d) => (
                <a href={edit ? null : d.link} key={d.name} target="_blank" rel="noreferrer"  >
                  <motion.div variants={childVariantForConnect} viewport={{ once: true }} whileHover={{ y: !edit && -20, scale: !edit && 1.1 }} >
                    {edit && (
                      <div className="background" onClick={() => openEditHandler(d.forupdate, "Personal Connects", `personal.${d.name.toLowerCase()}`)} >
                        <FaEdit />
                      </div>
                    )}
                    {d.item}
                  </motion.div>
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
        <BorderComp />

        <div className="connectme__user-personal">
          <div className="connectme__user-personal__title">
            <h1>Personal Info</h1>
          </div>
          <div className="connectme__user-personal__content">
            <motion.div className="button" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} onClick={() => setShowModal(true)}>
              <BsInfoCircle />
              <h3>Get Perosnal Info</h3>
            </motion.div>
          </div>
        </div>
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
                <ToggleSwitch label={"hel"} data={pdfData} setHandler={setPdfData} profileId={profileData?._id} apiId="document.active" />
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
        {!edit
          && (
            <>
              <BorderComp />
              <div className="connectme__user-footer">
                <div className="text">
                  <h3>Want to create amazing profile like this?</h3>
                </div>
                <div className="content">
                  <Link href={"login?signup=true"} passHref>
                    <motion.div className="content__button" whileTap={{ scale: 1.1 }}>
                      <h3>Why Not</h3>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </>
          )}
        {
          showModal && (
            <Modal setModal={setShowModal} edit={edit} data={profileData?.userInfo} openEditHandler={openEditHandler} />
          )
        }
      </div>
      {
        openEdit && (
          <Edit modal={setOpenEdit} data={editData} />
        )
      }
      {/* {edit && (
        <div className="connectme__user-setting">
          <div className="private" >
            <h3>Make Account {profileData?.isPrivate ? "Public" : "Private"}</h3>
          </div>
          <motion.div className="request" whileTap={{ scale: 1.1 }} initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
            <h3>Requests</h3>
          </motion.div>
        </div>
      )} */}
      {privacyModal && (
        <PopupModal success={true} message={`Your Account is  ${isPrivate ? "Public " : "Private"} Now`} title={`Privacy`} setModal={setPrivacyModal} handler={privacyHandler} />
      )}
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
  )
}

export default User
import Image from "next/image"
import { useEffect, useState } from "react"
import { m, motion } from "framer-motion"
import { FaInstagram, FaEdit, FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaImdb } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { CgWebsite } from 'react-icons/cg'
import Testimonial from "./subcomponents/Testimonial"
import { data } from "../../db/data"
import Port from "./subcomponents/Port"
import Modal from "./subcomponents/Modal"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'
// import { getProfileById } from "../../../api"
import { getProfileById } from "../../../redux/action/Profile"
import Edit from "./subcomponents/Edit"


const User = ({ edit }) => {
  const [width, setWidth] = useState(1000)
  const state = useSelector((state) => state)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [imgProp, setImgProp] = useState({ w: 200, h: 250 })
  const dispatch = useDispatch()
  const { profile } = state.profileReducer
  const router = useRouter()
  const profileData = profile !== null ? profile?.data : []
  // edititable content
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ title: "", name: "", data: null })


  // editable
  const [editModal, setEditModal] = useState(edit)

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

  const interests = [
    "Music", "Singing", "Reading", "Dancing", "Music", "Singing", "Reading", "Dancing"
  ]

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
      item: <FaWhatsapp />,
      name: "Whatsapp",
      link: `https://wa.me/${profileData?.personal?.whatsapp}`,
      forupdate: profileData?.personal?.whatsapp
    },
    {
      item: <FaPhone />,
      name: "Call",
      link: `tel:${profileData?.personal?.phone}`,
      forupdate: profileData?.personal?.phone 
    },
    {
      item: <FaEnvelope />,
      name: "Mail",
      link: `mailto:${profileData?.personal?.mail}`,
      forupdate: profileData?.personal?.mail 
    },
    {
      item: <AiFillMessage />,
      name: "SMS",
      link: `sms:${profileData?.personal?.message}`,
      forupdate: profileData?.personal?.mail 
    },
  ]

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserAuth"))
    if (edit && data) {
      dispatch(getProfileById({ email: data?.existingUser?.email }, data?.existingUser?.profile))
    }
    const profileData = JSON.parse(localStorage.getItem("profile"))
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
  }, [showModal, dispatch, router.query])

  const BorderComp = () => {
    return (
      <div className="border">
        <span></span>
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
        {!readMore ? shorten(text, 150) : text}
        <span onClick={toggleReadMore}>
          {readMore ? "less" : "more"}
        </span>
      </p>
    )
  }

  useEffect(() => {

  }, [editData, openEdit])

  
  const logout=()=>{
    dispatch({type:"LOGOUT"})
    router.push("/")
  }
  useEffect(()=>{
    const data=localStorage.getItem("UserAuth")?.token

    if(data){
      const decodedData=decode(data)
      if(decodedData.exp * 1000 < new Date().getTime()) return logout()

    }
  },[dispatch])

  const socialHandle = [
    {
      item: <FaInstagram />,
      name: "Instagram",
      link: profileData?.social?.insta
    },
    {
      item: <FaFacebook />,
      name: "Facebook",
      link: profileData?.social?.facebook
    },
    {
      item: <FaTwitter />,
      name: "Twitter",
      link: profileData?.social?.twitter
    },
    {
      item: <FaLinkedin />,
      name: "Linkedin",
      link: profileData?.social?.linkedin
    },
    {
      item: <FaImdb />,
      name: "IMDB",
      link: profileData?.social?.imdb
    },
    {
      item: <CgWebsite />,
      name: "WebSite",
      link: profileData?.social?.website
    },
  ]

  if (profile === null) {
    return <h1>..waiting</h1>
  }

  const openEditHandler = (data, title, name, isSubDoc = {}) => {
    setEditData({ ...editData, title: title, name: name, data: data, isSubDoc })
    setOpenEdit(true)
  }
  return (
    <div className="connectme__user">
      <motion.div className="connectme__user-background" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
        <Image src={profileData?.background} width={1900} height={bannerHeight} layout="responsive" objectFit="cover" />
        {edit && (
          <motion.div className="background" onClick={() => edit && openEditHandler(profileData?.background, "Background Image", "background")} whileTap={{ scale: 1.1 }}>
            <FaEdit />
          </motion.div>
        )}
      </motion.div>
      <motion.div className="connectme__user-profile" initial={{ y: 100, opacity: 0 }} animate={{ translateY: -100, y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, delay: .6, duration: 1.3 }}>
        {edit && (
          <motion.div className="background" onClick={() => edit && openEditHandler(profileData?.profileimg, "Profile Image", "profileimg")} whileTap={{ scale: 1.1 }}>
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
                <div className="background" onClick={() => edit && openEditHandler(d.data, "Interests", 'interests', { isSubDoc: true, _id: d._id })}>
                  <FaEdit />
                </div>
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
                <motion.div className="item" variants={childVariantForSocial} viewport={{ once: true }} whileHover={{ scale: 1.2, color: "red" }} onClick={() => openEditHandler(d.link, "Social Handles", `social.${d.name.toLowerCase()}`)}>
                  {d.item}
                  {edit && (
                    <div className="background">
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

            <h1>Personal Connects</h1>
          </div>
          <motion.div className="connectme__user-connects__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {
              connects.map((d) => (
                <a href={ edit? null : d.link} key={d.name} target="_blank" rel="noreferrer"  >
                  <motion.div variants={childVariantForConnect} viewport={{ once: true }} whileHover={{ y: !edit && -20, scale: !edit && 1.1 }}  onClick={() => openEditHandler(d.forupdate, "Personal Connects", `personal.${d.name.toLowerCase()}`)} >
                    {edit && (
                      <div className="background">
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
        <Port data={profileData?.portfolio} title={"PortFolio"} link="portfolio" edit={edit} openEditHandler={openEditHandler} />
        <BorderComp />
        <Port data={profileData?.services} title={"Services"} link="services" edit={edit} openEditHandler={openEditHandler} />
        <BorderComp />
        <div className="connectme__user-personal">
          <div className="connectme__user-personal__title">
            <h1>Personal Info</h1>
          </div>
          <div className="connectme__user-personal__content">
            <motion.div className="button" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} onClick={() => setShowModal(true)}>
              <h3>Get Perosnal Info</h3>
            </motion.div>
          </div>
        </div>
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
    </div>
  )
}

export default User



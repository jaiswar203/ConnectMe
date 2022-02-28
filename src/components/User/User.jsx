import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaInstagram, FaEdit, FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaImdb } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { CgWebsite } from 'react-icons/cg'
import Testimonial from "./subcomponents/Testimonial"
import { data } from "../../db/data"
import Port from "./subcomponents/Port"
import Modal from "./subcomponents/Modal"
import { useDispatch, useSelector } from "react-redux"


const User = ({ edit }) => {
  const [width, setWidth] = useState(1000)
  const state=useSelector((state)=>state)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [imgProp, setImgProp] = useState({ w: 200, h: 250 })


  // editable
  const [editModal, setEditModal] = useState(edit)
  console.log({editModal})

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

  const socialHandle = [
    {
      item: <FaInstagram />,
      name: "Instagram"
    },
    {
      item: <FaFacebook />,
      name: "Facebook"
    },
    {
      item: <FaTwitter />,
      name: "Twitter"
    },
    {
      item: <FaLinkedin />,
      name: "Linkedin"
    },
    {
      item: <FaImdb />,
      name: "IMDB"
    },
    {
      item: <CgWebsite />,
      name: "WebSite"
    },
  ]

  const connects = [
    {
      item: <FaWhatsapp />,
      name: "Whatsapp",
      link: "https://wa.me/394997499"
    },
    {
      item: <FaPhone />,
      name: "Call",
      link: "tel:771894974"
    },
    {
      item: <FaEnvelope />,
      name: "Mail",
      link: "mailto:zeus@zeus.com"
    },
    {
      item: <AiFillMessage />,
      name: "SMS",
      link: "sms:+917715969989"
    },
  ]

  useEffect(() => {

  }, [showModal])

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
      item: "Entertainment"
    },
    {
      id: 1,
      name: "Speciality",
      item: "Actor"
    },
    {
      id: 2,
      name: "BirthDate",
      item: "June 10,1986"
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


  
  return (
    <div className="connectme__user">
      <motion.div className="connectme__user-background" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
        <Image src={"https://res.cloudinary.com/redwine/image/upload/v1644848677/1000_cka9mr.jpg"} width={1900} height={bannerHeight} layout="responsive" objectFit="cover" />
        {edit && (
          <div className="background">
            <FaEdit />
          </div>
        )}
      </motion.div>
      <motion.div className="connectme__user-profile" initial={{ y: 100, opacity: 0 }} animate={{ translateY: -100, y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, delay: .6, duration: 1.3 }}>
        {edit && (
          <div className="background">
            <FaEdit />
          </div>
        )}
        <Image src={"https://res.cloudinary.com/redwine/image/upload/v1644848807/photo-1494790108377-be9c29b29330_zrapqv.jpg"} width={imgProp.w} height={imgProp.h} objectFit="cover" />
        <div className="info">
          <h2>Billy Gomez</h2>
          <p>New York,USA</p>
        </div>
      </motion.div>
      <div className="lower__sec">
        <motion.div className="connectme__user-detail" variants={parentVariantForInterests} initial="hidden" animate="visible">
          {userDetail.map((d) => (
            <motion.div className="connectme__user-detail__item" key={d.name} variants={childForDetail} >
              {edit && (
                <div className="background">
                  <FaEdit />
                </div>
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
            <div className="background">
              <h1>About Me</h1>
              <FaEdit />
            </div>
          )}
          <ReadMore>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam veritatis velit repudiandae odio aut quo suscipit, sit ut ad voluptates ipsam sapiente corporis neque aspernatur dolor dolore, inventore minima tempore.
            Error doloremque accusamus quas, officia maiores, quidem a architecto quis veniam iste debitis? Quibusdam et itaque quae quasi excepturi hic aperiam temporibus minus vitae modi, enim ullam alias deleniti? Commodi
          </ReadMore>
        </div>
        <BorderComp />
        <div className="connectme__user-interests">
          <div className="connectme__user-interests__title">
            {edit && (
              <div className="background">
                <FaEdit />
              </div>
            )}
            <h1>Interests</h1>
          </div>
          <motion.div className="connectme__user-interests__info" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }} >
            {interests.map((d) => (
              <motion.div className="bodies" key={d} variants={childVariantForInterests} viewport={{ once: true }}>
                <p>{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <BorderComp />
        <div className="connectme__user-social">
          <div className="connectme__user-social__title">
            <h1>Social Handles</h1>
            {edit && (
              <div className="background">
                <FaEdit />
              </div>
            )}
          </div>
          <motion.div className="connectme__user-social__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {socialHandle.map((d) => (
              <a href="#" target="_blank" key={d.name} rel="noreferrer">
                <motion.div className="item" variants={childVariantForSocial} viewport={{ once: true }} whileHover={{ scale: 1.2, color: "red" }}>
                  {d.item}
                  <motion.p> {d.name}</motion.p>
                </motion.div>
              </a>
            ))}
          </motion.div>
        </div>
        <BorderComp />
        <div className="connectme__user-connects">
          <div className="connectme__user-connects__title">
            {edit && (
              <div className="background">
                <FaEdit />
              </div>
            )}
            
            <h1>Personal Connects</h1>
          </div>
          <motion.div className="connectme__user-connects__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {
              connects.map((d) => (
                <a href={d.link} key={d.name} target="_blank" rel="noreferrer"  >
                  <motion.div variants={childVariantForConnect} viewport={{ once: true }} whileHover={{ y: -20, scale: 1.1 }} >
                    {d.item}
                  </motion.div>
                </a>
              ))
            }
          </motion.div>
        </div>
        <BorderComp />
        <Testimonial edit={edit} />
        <BorderComp />
        <Port data={data.portfolioData} title={"PortFolio"} link="portfolio" edit={edit} />
        <BorderComp />
        <Port data={data.portfolioData} title={"Services"} link="services" edit={edit} />
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
            <Modal setModal={setShowModal} edit={edit} />
          )
        }
      </div>
    </div>
  )
}

export default User
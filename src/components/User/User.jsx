import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaImdb } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { CgWebsite } from 'react-icons/cg'
import Testimonial from "./subcomponents/Testimonial"
import Portfolio from "./subcomponents/Portfolio"

const User = () => {
  const [width, setWidth] = useState(1000)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [imgProp, setImgProp] = useState({ w: 200, h: 250 })

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
      opacity: 1,
      speed: 50,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    hidden: {
      y: 100,
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
      transition: {
        type: "spring",
        stiffness: 300
      },
    },
    hidden: {
      x: 100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  }
  const childVariantForConnect = {
    visible: {
      x: 0,
      opacity: 1,
      speed: 50,
      transition: {
        type: "spring",
        stiffness: 300
      },
    },
    hidden: {
      x: 100,
      y: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
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
  return (
    <div className="connectme__user">
      <motion.div className="connectme__user-background" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
        <Image src={"https://res.cloudinary.com/redwine/image/upload/v1644848677/1000_cka9mr.jpg"} width={1900} height={bannerHeight} layout="responsive" objectFit="cover" />
      </motion.div>
      <motion.div className="connectme__user-profile" initial={{ y: 100, opacity: 0 }} animate={{ translateY: -100, y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, delay: .6, duration: 1.3 }}>
        <Image src={"https://res.cloudinary.com/redwine/image/upload/v1644848807/photo-1494790108377-be9c29b29330_zrapqv.jpg"} width={imgProp.w} height={imgProp.h} objectFit="cover" />
        <div className="info">
          <h2>Billy Gomez</h2>
          <p>New York,USA</p>
        </div>
      </motion.div>
      <div className="lower__sec">
        <div className="connectme__user-detail">
          <div className="connectme__user-detail__one">
            <p>Speciality</p>
            <h3>Designer</h3>
          </div>
          <div className="connectme__user-detail__two">
            <p>Born</p>
            <h3>June 10, 1986</h3>
          </div>
          <div className="connectme__user-detail__three">
            <p>Height</p>
            <h3>186 cm</h3>
          </div>
        </div>
        <div className="connectme__user-about">
          <h1>About Me</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam veritatis velit repudiandae odio aut quo suscipit, sit ut ad voluptates ipsam sapiente corporis neque aspernatur dolor dolore, inventore minima tempore.
            Error doloremque accusamus quas, officia maiores, quidem a architecto quis veniam iste debitis? Quibusdam et itaque quae quasi excepturi hic aperiam temporibus minus vitae modi, enim ullam alias deleniti? Commodi.</p>
        </div>
        <div className="connectme__user-interests">
          <div className="connectme__user-interests__title">
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
        <div className="connectme__user-social">
          <div className="connectme__user-social__title">
            <h1>Social Handles</h1>
          </div>
          <motion.div className="connectme__user-social__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {socialHandle.map((d) => (
              <a href="#" target="_blank" key={d.name}>
                <motion.div className="item" variants={childVariantForSocial} viewport={{ once: true }} whileHover={{ scale: 1.2, color: "red" }}>
                  {d.item}
                  <motion.p> {d.name}</motion.p>
                </motion.div>
              </a>
            ))}
          </motion.div>
        </div>
        <div className="connectme__user-connects">
          <div className="connectme__user-connects__title">
            <h1>Personal Connects</h1>
          </div>
          <motion.div className="connectme__user-connects__content" variants={parentVariantForInterests} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {
              connects.map((d) => (
                <a href={d.link} key={d.name} target="_blank"   >
                  <motion.div variants={childVariantForConnect} viewport={{ once: true }} whileHover={{ y: -20, scale: 1.1 }} >
                    {d.item}
                  </motion.div>
                </a>
              ))
            }
          </motion.div>
        </div>
        <Testimonial />
        {/* <Portfolio /> */}
      </div>
    </div>
  )
}

export default User
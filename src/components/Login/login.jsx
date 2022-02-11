import { TextField, InputAdornment, IconButton } from "@mui/material";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineArrowRight, AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";


import { getAllUser, signInUser, signUpUser } from "../../../redux/action/Auth";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";



const login = () => {
  const [icon, setIcon] = useState(true);
  const { handleSubmit, formState: { errors }, register, reset } = useForm()
  const { authData } = useSelector((state) => state.AuthRedu)
  const dispacth = useDispatch()
  const router = useRouter()


  const { signup: SignUp } = router.query

  useEffect(() => {

  }, [icon])


  const onSubmit = async (data) => {
    if (Boolean(SignUp)) {
      dispacth(signUpUser(data, router))
    } else {
      dispacth(signInUser(data, router))
    }
  }

  useEffect(() => {
    dispacth(getAllUser())
  }, [dispacth])

  const googleSuccess = async (res) => {
    const { name, email } = res?.profileObj
    const token = res?.tokenId
    try {
      const { data: { existingUser } } = await axios.post("/api/auth/auth", { name, email })
      dispacth({ type: "AUTH", data: { existingUser, token } })
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (err) => {
    console.log("Sign In Failed", { err })
  }

  if (authData) {
    router.push("/")
    return (
      <h1>Redirecting to Home</h1>
    )
  }

  return (
    <div className='connectme__login'>
      <div className="connectme__login-intro">
        <motion.h1 initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>Login To Your Account</motion.h1>
        <motion.p initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, delay: .8 }}>Create Awesome Intro for your film debut</motion.p>
      </div>
      <div className="connectme__login-content">
        <motion.form className="connectme__login-content__manual" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, duration: 1 }} onSubmit={handleSubmit(onSubmit)}>
          {SignUp && (
            <div className="name">
              <TextField variant="outlined" style={{ marginRight: "5px" }} label="First Name" focused={errors?.name && true} type="text" fullWidth color={errors?.name ? "secondary" : "primary"} {...register("name", { required: true })} />
              <TextField variant="outlined" label="Last Name" focused={errors?.name && true} type="text" fullWidth color={errors?.name ? "secondary" : "primary"} {...register("lname", { required: true })} />
            </div>
          )}
          <div className="email">
            <TextField variant="outlined" label="Email" focused={errors?.email && true} type="email" fullWidth color={errors?.email ? "secondary" : "primary"} {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
            {/* <span>{errors?.email?.type = "required" && "Pls Enter Your Email"}</span> */}
          </div>
          <div className="password">
            <TextField variant="outlined" label="Password" focused={errors?.password} type={icon ? "password" : "text"} color={errors?.password ? "secondary" : "primary"} {...register("password", { required: true })} fullWidth InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIcon(!icon)}>
                    {icon ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>

                </InputAdornment>
              )
            }} />
            {/* <span>{errors?.password?.type = "required" && "Pls Enter Your Password"}</span> */}
          </div>
          <motion.button type="submit" whileHover={{ x: 5, y: -5, background: "white", color: "black", border: "1px solid black" }} className="submit">
            <h3>Submit</h3>
          </motion.button>
          <GoogleLogin
            clientId="997233871583-5eppubk9g40htsamhqs4t15mcer7ejk0.apps.googleusercontent.com"
            render={(renderprops) => (
              <motion.div className="connectme__login-content__social__google" initial={{ x: 200, opacity: 0,border: "1px solid black" }} animate={{ x: 0, opacity: 1 }} whileHover={{  x: 5, y: -5, background: "black", color: "white", border: "1px solid black" }} onClick={renderprops.onClick} >
                <AiFillGoogleCircle />
                <p>{SignUp ? "SignUp" : "SignIn"} With Google</p>
              </motion.div>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin" />
        </motion.form>
      </div>
    </div>
  );
};

export default login;

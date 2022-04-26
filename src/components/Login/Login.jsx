import { TextField, InputAdornment, IconButton } from "@mui/material";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillGoogleCircle, AiOutlineMinus } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Gmail from "../User/logo/gmail";

import ClipLoader from "react-spinners/ClipLoader";


import { getAllUser, signInUser, signUpUser } from "../../../redux/action/Auth";
import GoogleLogin from "react-google-login";
import axios from "axios";

import { createProfile } from '../../../redux/action/Profile'
import { demoProfile } from '../../db/demo'

const Login = () => {
  const [icon, setIcon] = useState(true);
  const [askUserName, setaskUserName] = useState("")
  const [askUserNamePermission, setAskUserNamePermission] = useState(false)
  const { handleSubmit, formState: { errors }, register, reset } = useForm()
  const state = useSelector((state) => state.AuthRedu)
  const modalData = useSelector((state) => state.modal)
  const authData = state?.authData
  const dispatch = useDispatch()
  const router = useRouter()


  const { signup: SignUp } = router.query

  useEffect(() => {

  }, [icon])


  const onSubmit = async (data) => {
    if (Boolean(SignUp)) {
      dispatch(signUpUser(data, router))
    } else {
      dispatch(signInUser(data, router))
    }
  }



  const googleSuccess = async (res) => {
    const { name, email } = res?.profileObj
    const token = res?.tokenId
    if (SignUp) {
      try {
        const { data: { existingUser } } = await axios.post("/api/auth/auth", { name, email, username: askUserName })
        dispatch({ type: "AUTH", data: { existingUser, token } })
      } catch (error) {
        dispatch({ type: "USER_ERROR", error: error.response })
      }
    } else {
      try {
        const { data: { existingUser } } = await axios.post("/api/auth/signin", { email })
        dispatch({ type: "AUTH", data: { existingUser, token } })
      } catch (error) {
        dispatch({ type: "USER_ERROR", error: error.response })
      }
    }
  }

  const googleFailure = (err) => {
    console.log(err)
  }

  useEffect(() => {

  }, [askUserName])

  useEffect(() => {
    dispatch(getAllUser())
    if (authData && !SignUp) {
      if (authData?.existingUser?.isVerified && authData?.existingUser?.profile) {
        router.push(`/edit/${authData?.existingUser?.username}`)
      } else if (!authData?.existingUser?.profile) {
        dispatch({ type: "MESSAGE", data: { type: "error", message: "Your Profile Doen't Created , Please Wait while creating your Profile" } })
        dispatch(
          createProfile({
            ...demoProfile,
            createdBy: authData?.existingUser?._id,
            name: authData?.existingUser?.name
          })
        );
      } else {
        dispatch({ type: "MESSAGE", data: { type: "error", message: "Your account isn't verified" } })
        dispatch({ type: "LOGOUT" })
      }
    } else if (authData && SignUp) {
      router.push(`/confirm/${authData?.existingUser?.username}?confirmyourmail=true`)
    }
  }, [dispatch, authData, SignUp, router])



  console.log({error: state?.error?.data})
  return (
    <div className='connectme__login'>
      <div className="connectme__login-intro">
        <motion.h1 initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>{SignUp ? "Create" : "Login to "} Your Account</motion.h1>
        <motion.p initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, delay: .8 }}>Create Awesome Intro for your film debut</motion.p>
      </div>
      <div className="connectme__login-content">
        <motion.form className="connectme__login-content__manual" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, duration: 1 }} onSubmit={handleSubmit(onSubmit)}>
          {SignUp && (
            <>
              <TextField variant="outlined" style={{ marginRight: "5px",marginBottom:"1rem" }} label="UserName" focused={errors?.username && true} type="text" fullWidth color={errors?.username || state?.error?.data ? "secondary" : "primary"} {...register("username", { required: true })} />
              {
                errors?.username?.type==="required" && (
                  <span style={{marginTop:"-1rem"}}>Please Enter your Username</span>
                )
              }
              {state?.error?.data?.message === "Username Already Exist" && (
                <span style={{marginTop:"-1rem"}}> {"UserName Already Taken"}  </span>
              )}
              <div className="name">
                <div className="name__firstname">
                  <TextField variant="outlined" style={{ marginRight: "5px" }} label="First Name" focused={errors?.name && true} type="text" fullWidth color={errors?.name ? "secondary" : "primary"} {...register("name", { required: true })} />
                  <span>{errors?.name?.type==="required" && "Please Enter Your FirstName"}</span>
                </div>
                <div className="name__lastname">
                  <TextField variant="outlined" label="Last Name" focused={errors?.name && true} type="text" fullWidth color={errors?.name ? "secondary" : "primary"} {...register("lname", { required: true })} />
                  <span>{errors?.lname?.type==="required" && "Please Enter Your LastName"}</span>
                </div>
              </div>
            </>
          )}
          <div className="email">
            <TextField variant="outlined" label="Email" focused={errors?.email && true} type="email" fullWidth color={errors?.email && SignUp ? "secondary" : "primary"} {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
            {SignUp && (
              <span>{errors?.email?.type === "required" && "Please Enter Your Email"}</span>
            )}
            {
              errors?.email?.type === "required" ? null : state?.error?.data?.message === "User Already Exist" && (
                <span>User Already Exist</span>
              )
            }

            {
              !SignUp ?
                state?.error?.status === 404 && (
                  <span>No User Founded</span>
                ) : null
            }
          </div>
          <div className="password">
            <TextField variant="outlined" label="Password" focused={errors?.password} type={icon ? "password" : "text"} color={errors?.password && SignUp ? "secondary" : "primary"} {...register("password", { required: true, minLength: 8 })} fullWidth InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIcon(!icon)}>
                    {icon ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              )
            }} />
            {SignUp && (
              <>
                <span>{errors?.password?.type === "required" && "Please Enter Your Password"}</span>
                <span>{errors?.password?.type === "minLength" && "PassWord should be greater than 8 digit"}</span>
              </>
            )}
            {
              state?.error?.status === 400 && (
                <span>Wrong Password or username</span>
              )
            }
          </div>
          <motion.button type="submit" className="submit">
            {
              state.isLoading ? (
                <ClipLoader color="#000" size={25} />
              ) : (
                <h2>Submit</h2>
              )
            }
          </motion.button>
        </motion.form>
        <div className="divider">
          <span>
            <AiOutlineMinus />
          </span>
          <h2>
            OR
          </h2>
          <span>
            <AiOutlineMinus />
          </span>
        </div>
        <div className="auth">
          {SignUp ? (
            <motion.div className="google" initial={{ x: 200, opacity: 0, border: "1px solid black" }} animate={{ x: 0, opacity: 1 }} whileHover={{ x: 5, y: -5, border: "1px solid black" }} onClick={() => setAskUserNamePermission(!askUserNamePermission)} >
              <Gmail w={33} h={33} />
              <p>{SignUp ? "SignUp" : "SignIn"} With Google</p>
            </motion.div>

          ) : (
            <GoogleLogin
              clientId="997233871583-5eppubk9g40htsamhqs4t15mcer7ejk0.apps.googleusercontent.com"
              render={(renderprops) => (
                <motion.div className="google" initial={{ x: 200, opacity: 0, border: "1px solid black" }} animate={{ x: 0, opacity: 1 }} whileHover={{ x: 5, y: -5, background: "black", color: "#3080C0", border: "1px solid #3080C0" }} onClick={renderprops.onClick} >
                  <Gmail w={33} h={33} />
                  <p>{SignUp ? "SignUp" : "SignIn"} With Google</p>
                </motion.div>
              )}
              onRequest={() => { console.log("Request Maded") }}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin" />

          )}

        </div>
      </div>
      {
        SignUp && (

          askUserNamePermission && (

            <div className="connectme__login-model">
              <div className="cross" onClick={() => setAskUserNamePermission(!askUserNamePermission)}>
                <FaTimes />
              </div>
              <motion.div className="connectme__login-model__data" initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <TextField variant="outlined" label="UserName" color={state?.error?.status === 404 ? "error" : "primary"} type="text" className="username" onChange={(e) => setaskUserName(e.target.value)} fullWidth />
                {state?.error?.status === 404 && !SignUp && askUserNamePermission ? (
                  <span>
                    User Already Exist  
                  </span>
                ) : null}
                <GoogleLogin
                  clientId="997233871583-5eppubk9g40htsamhqs4t15mcer7ejk0.apps.googleusercontent.com"
                  render={(renderprops) => (
                    <motion.button className="google" disabled={askUserName === "" ? true : false} style={{ background: askUserName === '' ? "gray" : "white" }} whileHover={{ background: "#3080C0", color: "white" }} initial={{ x: 200, opacity: 0, border: "1px solid black" }} animate={{ x: 0, opacity: 1 }} whileTap={{ scale: 1.02 }} onClick={renderprops.onClick} >
                      <p>SignUp With Google</p>
                    </motion.button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin" />
              </motion.div>
            </div>
          )
        )
      }
    </div>
  );
};

export default Login;
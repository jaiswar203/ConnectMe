import { TextField, InputAdornment, IconButton } from "@mui/material";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillGoogleCircle, AiOutlineMinus } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";


import { getAllUser, signInUser, signUpUser } from "../../../redux/action/Auth";
import GoogleLogin from "react-google-login";
import axios from "axios";



const Login = () => {
  const [icon, setIcon] = useState(true);
  const { handleSubmit, formState: { errors }, register, reset } = useForm()
  const [askUserNamePermission, setAskUserNamePermission] = useState(false)
  const state = useSelector((state) => state.AuthRedu)
  const authData = state?.authData
  const dispacth = useDispatch()
  const router = useRouter()
  const [askUserName, setaskUserName] = useState("")

  console.log({ state })

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
    // console.log(name + "__" + Math.random().toString(36).substr(2, 9),{ data: res.profileObj})
    if (SignUp) {
      try {
        const { data: { existingUser } } = await axios.post("/api/auth/auth", { name, email, username: askUserName })
        dispacth({ type: "AUTH", data: { existingUser, token } })
      } catch (error) {
        dispacth({ type: "USER_ERROR", error: error.response })
      }
    }else{
      try {
        const { data: { existingUser } } = await axios.post("/api/auth/signin", { email })
        dispacth({ type: "AUTH", data: { existingUser, token } })
      } catch (error) {
        if(error?.response?.status===404){
          const { data: { existingUser } } = await axios.post("/api/auth/auth", { name, email, username: askUserName })
          dispacth({ type: "AUTH", data: { existingUser, token } })
        }
      }
    }
  }

  const googleFailure = (err) => {

  }

  if (authData?.status === 200) {
    router.push(`/${authData?.data?.User?.username}`)
  }

  // if (authData) {
  //   router.push("/")
  //   return (
  //     <h1>Redirecting to Home</h1>
  //   )
  // }
  useEffect(() => {

  }, [askUserName])
  console.log({ askUserName })
  return (
    <div className='connectme__login'>
      <div className="connectme__login-intro">
        <motion.h1 initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>{SignUp ? "Create" : "Login to Your"} Your Account</motion.h1>
        <motion.p initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, delay: .8 }}>Create Awesome Intro for your film debut</motion.p>
      </div>
      <div className="connectme__login-content">
        <motion.form className="connectme__login-content__manual" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, duration: 1 }} onSubmit={handleSubmit(onSubmit)}>
          {SignUp && (
            <>
              <TextField variant="outlined" style={{ marginRight: "5px" }} label="UserName" focused={errors?.name && true} type="text" fullWidth color={errors?.name ? "secondary" : "primary"} {...register("username", { required: true })} />
              {state?.error?.message === "Username Already Exist" && (
                <span > {"UserName Already Taken"}  </span>
              )}
              <div className="name">
                <TextField variant="outlined" style={{ marginRight: "5px" }} label="First Name" focused={errors?.name && true} type="text" fullWidth color={errors?.name ? "secondary" : "primary"} {...register("name", { required: true })} />
                <TextField variant="outlined" label="Last Name" focused={errors?.name && true} type="text" fullWidth color={errors?.name ? "secondary" : "primary"} {...register("lname", { required: true })} />
              </div>
            </>
          )}
          <div className="email">
            <TextField variant="outlined" label="Email" focused={errors?.email && true} type="email" fullWidth color={errors?.email || SignUp ? "secondary" : "primary"} {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
            {SignUp && (
              <span>{errors?.email?.type === "required" && "Pls Enter Your Email"}</span>
            )}
            {
              state?.error?.message === "User Already Exist" && (
                <span>User Already Exist</span>
              )
            }
            {
              state?.error?.status === 404 && (
                <span>No User Founded</span>
              )
            }
          </div>
          <div className="password">
            <TextField variant="outlined" label="Password" focused={errors?.password } type={icon ? "password" : "text"} color={errors?.password || SignUp ? "secondary" : "primary"} {...register("password", { required: true, minLength: 8 })} fullWidth InputProps={{
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
                <span>{errors?.password?.type === "required" && "Pls Enter Your Password"}</span>
                <span>{errors?.password?.type === "minLength" && "PassWord should be greater than 8 digit"}</span>
              </>
            )}
            {
              state?.error?.status === 400 && (
                <span>Wrong Password or username</span>
              )
            }
          </div>
          <motion.button type="submit" whileHover={{ x: 5, y: -5, background: "white", color: "black", border: "1px solid black" }} className="submit">
            <h3>Submit</h3>
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
            <motion.div className="google" initial={{ x: 200, opacity: 0, border: "1px solid black" }} animate={{ x: 0, opacity: 1 }} whileHover={{ x: 5, y: -5, background: "black", color: "white", border: "1px solid black" }} onClick={() => setAskUserNamePermission(!askUserNamePermission)} >
              <AiFillGoogleCircle />
              <p>{SignUp ? "SignUp" : "SignIn"} With Google</p>
            </motion.div>

          ) : (
            <GoogleLogin
              clientId="997233871583-5eppubk9g40htsamhqs4t15mcer7ejk0.apps.googleusercontent.com"
              render={(renderprops) => (
                <motion.div className="google" initial={{ x: 200, opacity: 0, border: "1px solid black" }} animate={{ x: 0, opacity: 1 }} whileHover={{ x: 5, y: -5, background: "black", color: "white", border: "1px solid black" }} onClick={renderprops.onClick} >
                  <AiFillGoogleCircle />
                  <p>{SignUp ? "SignUp" : "SignIn"} With Google</p>
                </motion.div>
              )}
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
                {state?.error?.status === 404 & askUserNamePermission ? (
                  <span>
                    User Already Exist
                  </span>
                ) : null}
                <GoogleLogin
                  clientId="997233871583-5eppubk9g40htsamhqs4t15mcer7ejk0.apps.googleusercontent.com"
                  render={(renderprops) => (
                    <motion.button className="google" disabled={askUserName === "" ? true : false} style={{ background: askUserName === '' ? "gray" : "white" }} initial={{ x: 200, opacity: 0, border: "1px solid black" }} animate={{ x: 0, opacity: 1 }} whileTap={{ scale: 1.02 }} onClick={renderprops.onClick} >
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

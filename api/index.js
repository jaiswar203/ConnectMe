import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem("UserAuth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("UserAuth"))?.token
    }`;
  }
  return req;
});

export const createUser = (data) => API.post("/user/signup", data);
export const loginUser = (data) =>API.post("/user/signin", data);

export const getAllUser = () => API.get("/user",{
  headers:{
    "Authorization":`Bearer ${JSON.parse(localStorage.getItem("UserAuth"))?.token}`
  }
});

export const getUserById=(id)=>API.get(`/user/${id}`)


export const createProfile=(data)=>API.post("/profile",data)
export const getAllProfile=()=>API.get("/profile")
export const getProfileById=(data,id)=>API.post(`/profile/${id}`,data)
export const updateProfileById=(data,id)=>API.patch(`/profile/${id}`,data)
export const updateSubDocInProfileById=(data,id,subdoc)=>API.patch(`/profile/sub/${id}?sub=${subdoc}`,data)
export const deleteProfileById=(id)=>API.delete(`/profile/${id}`)
export const askForPrivateProfile=(data,id)=>API.post(`/profile/ask-for-profile/${id}`,data)
export const getProfileByUsername=(data,id)=>API.get(`/profile/search/${id}`)
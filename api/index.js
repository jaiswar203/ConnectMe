import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem("UserData")) {
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

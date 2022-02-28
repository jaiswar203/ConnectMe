import * as api from '../../api'

export const signInUser=(formData)=>async(dispatch)=>{
    try {
        const {data}=await api.loginUser(formData)
        dispatch({type:"AUTH",data})
    } catch (error) {
        dispatch({type:"USER_ERROR",error: error?.response})
    }
}

export const signUpUser=(formData)=>async(dispatch)=>{
    try {
        const {data: {User,token,message}}=await api.createUser(formData)
        dispatch({type:"AUTH",data:{existingUser: User,message,token}})
        
    } catch (error) {
        dispatch({type:"USER_ERROR",error: error?.response?.data})
    }
}

export const getAllUser=()=>async(dispatch)=>{
    try {
        const {data}=await api.getAllUser()
        dispatch({type:"FETCH",data})
    } catch (error) {
        console.log(error)
    }
}

export const existingUserData=(data)=>async(dispatch)=>{
    try {
        dispatch({type:"GET_ALL",data})
    } catch (error) {
        console.log(error)
    }
}

export const getUserById=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.getUserById(id)
        dispatch({type:"GET_USER_BY_ID",data})
    } catch (error) {
        console.log({error})
    }
}
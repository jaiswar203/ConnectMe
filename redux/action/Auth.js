import * as api from '../../api'

export const signInUser=(formData,history)=>async(dispatch)=>{
    try {
        const {data}=await api.loginUser(formData)
        dispatch({type:"AUTH",data})
        history.push("/")
    } catch (error) {
        console.log(error)
    }
}

export const signUpUser=(formData,history)=>async(dispatch)=>{
    try {
        const {data}=await api.createUser(formData)
        dispatch({type:"AUTH",data})
        history.push("/")
    } catch (error) {
        console.log(error)
    }
}

export const getAllUser=()=>async(dispatch)=>{
    try {
        const {data}=await api.getAllUser()
        console.log({data})
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
import * as api from '../../api'

export const createProfile=(formData)=>async(dispatch) =>{
    try {
        const {data}= await api.createProfile(formData) 
        dispatch({type:"CREATE_PROFILE",data})
    } catch (error) {
        console.log({error})
    }   
}

export const getProfileById=(formData,id)=>async(dispatch)=>{
    try {
        const {data}=await api.getProfileById(formData,id)
        dispatch({type:"FETCH_PROFILE_BY_ID",data})
    } catch (error) {
        console.log(error)
    }
}
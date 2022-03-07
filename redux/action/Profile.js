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

export const updateProfile=(formData,id)=>async(dispatch)=>{
    try {
        const {data}=await api.updateProfileById(formData,id)
        dispatch({type:"UPDATE_PROFILE",data})
    } catch (error) {
        console.log(error)
    }
}

export const updateSubDocInProfileById=(formData,id,subdoc)=>async(dispatch)=>{
    try {
        const {data}=await api.updateSubDocInProfileById(formData,id,subdoc)
        dispatch({type:"UPDATE_SUBDOC_IN_PROFILE",data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProfile=(formData,id)=>async(dispatch)=>{
    try {
        const {data}=await api.deleteProfileById(formData,id)
        dispatch({type:"DELETE_PROFILE",data})
    } catch (error) {
        console.log(error)
    }
}


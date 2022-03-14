const profileReducer=(state={profile:null,error:null},action)=>{
    switch (action.type) {
        case "CREATE_PROFILE":
            return {...state,profile: action?.data}
        case "FETCH_PROFILE_BY_ID":
            localStorage.setItem("profile",JSON.stringify(action?.data))
            return {...state,profile: action.data}
        case "FETCH_PROFILE_BY_USERNAME":
            return {...state,profile: action.data}
        case "UPDATE_PROFILE":
            return {...state,updateData:action?.data }
        case "UPDATE_SUBDOC_IN_PROFILE":
            return {...state,updateData:action?.data}
        case "PROFILE_ERROR":
            return {...state,error: action.data}
        case "ADD_IMAGE":
            return {...state,added: action?.data}
        case "PROFILE_REQUEST":
            return {...state,requests: action?.data}
        case "DELETE_SUBDOC_IN_PROFILE_BY_ID":
            return {...state,succes: action?.data}
        default:
            return state
    }
}

export default profileReducer
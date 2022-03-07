const profileReducer=(state={profile:null},action)=>{
    switch (action.type) {
        case "CREATE_PROFILE":
            return {...state,profile: action?.data}
        case "FETCH_PROFILE_BY_ID":
            localStorage.setItem("profile",JSON.stringify(action?.data))
            return {...state,profile: action.data}
        case "UPDATE_PROFILE":
            return {...state,updateData:action?.data }
        case "UPDATE_SUBDOC_IN_PROFILE":
            return {...state,updateData:action?.data}
        default:
            return state
    }
}

export default profileReducer
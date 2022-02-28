const profileReducer=(state={profile:null},action)=>{
    switch (action) {
        case "CREATE_PROFILE":
            return {...state,profile: action?.data}
        case "FETCH_PROFILE_BY_ID":
            return {...state,profileData: action?.data}
        default:
            return state
    }
}
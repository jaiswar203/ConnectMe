const authReducer=(state={allUser:null},action)=>{
    switch (action.type) {
        case "AUTH":
            localStorage.setItem('UserAuth',JSON.stringify({...action?.data}))
            return {...state,authData: action?.data}
        case "LOGOUT":{
            localStorage.removeItem("UserAuth")
            localStorage.removeItem("profile")
            return {...state,authData:null}
        }
        case "FETCH":
            return {...state,allUser: action?.data}
        case "GET_ALL":
            return {...state,authData: action?.data}
        case "USER_ERROR":
            return {...state,error: action?.error}
        case "GET_USER_BY_ID":
            localStorage.setItem("UserAuth",JSON.stringify({...action?.data}))
            return {...state,data: action?.data}
        default:
            return state
    }
}

export default authReducer
const userReducer = (state = localStorage.getItem("token")?true:false
, action) => {
    switch(action.type){
        case "LOG_OUT":
            return state=false;
        case "LOG_IN":
            return state=true;
        default:
            return state;
    }
}

export default userReducer;
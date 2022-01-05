import { loginStatus, cart } from "../action/actionType"

const initialState = {
    isLogin : false
}

export const userReducer = (state = initialState, action)=>{
    switch(action.type) {
        case loginStatus:
            return {
                isLogin : action.status
            }
        default:
            return state
    }
}
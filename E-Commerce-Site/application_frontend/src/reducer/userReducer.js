import { loginStatus, cart } from "../action/actionType"

const initialState = {
    isLogin : false,
    userDetails : []
}

export const userReducer = (state = initialState, action)=>{
    switch(action.type) {
        case loginStatus:
            return {
                ...state,
                isLogin : action.status,
                userDetails  : action.payload
            }
        default:
            return state
    }
}
import { loginStatus, checkAuth } from "../action/actionType"

const initialState = {
    isAuthenticated : false,
    userDetails : []
}

export const userReducer = (state = initialState, action)=>{
    switch(action.type) {
        case loginStatus:
            return {
                ...state,
                userDetails  : action.payload
            }
        case checkAuth:
            return {
                ...state,
                isAuthenticated : action.status
            }
        default:
            return state
    }
}
import { getUser } from "../core/apiCalls/user"
import { accessToken, checkAuth, loginStatus } from "./actionType"

const loginAction = (data) => {
    return {
        type : loginStatus,
        payload : data
    }
}

export const verifyAuth = (value) => {
    return {
        type : checkAuth,
        status : value
    }
}

export const setAccessToken = (value) => {
    return {
        type : accessToken,
        token : value
    }
}

export const fetchUser = () => {
    return (dispatch) => {
        getUser()
        .then(res => dispatch(loginAction(res)))
    }
}
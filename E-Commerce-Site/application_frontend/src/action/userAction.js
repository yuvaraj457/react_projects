import { getUser } from "../core/apiCalls/user"
import { loginStatus } from "./actionType"

const loginAction = (setStatus, data) => {
    return {
        type : loginStatus,
        status : setStatus,
        payload : data
    }
}

export const fetchUser = () => {
    return (dispatch) => {
        getUser()
        .then(res => dispatch(loginAction(true, res)))
    }
}
import { loginStatus } from "./actionType"

export const loginAction = (payload) => {
    return {
        type : loginStatus,
        status : payload
    }
}
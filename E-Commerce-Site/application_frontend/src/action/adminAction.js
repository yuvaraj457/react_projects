import { getAllUsers } from '../core/apiCalls/admin'
import { getAllusers } from './actionType'

const userAction = (data) => {
    return {
        type: getAllusers,
        payload: data
    }
}

export const fetchAllUsers = () => {
    return (dispatch) => {
        getAllUsers()
            .then((res) => dispatch(userAction(res)))
    }
}

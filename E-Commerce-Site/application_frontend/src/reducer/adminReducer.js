import { getAllusers } from "../action/actionType"

const inititalState = {
    users : []
}

export const adminReducer = (state=inititalState, action) => {
    switch(action.type){
        case getAllusers:
            return {
                users : action.payload
            }
        default:
            return state
    }

}
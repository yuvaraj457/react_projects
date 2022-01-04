import { errorOccured, product } from "../action/actionType"

const initialState = {
    products : [],
    error : ''
}

export const productsReducer = (state=initialState, action) => {
    switch(action.type){
        case product:
            return {
                products : action.payload
            }
        case errorOccured:
            return {
                error : action.errorMessage
            }
        default:
            return state
    }
}
import { cart } from "../action/actionType"

const initialState = {
    cartProducts : null
}

export const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case cart:
            return {
                cartProducts : action.payload
            }
        default :
            return state
    }
}
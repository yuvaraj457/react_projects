import { getCartProducts } from "../core/apiCalls/products"
import { cart, errorOccured } from "./actionType"

const cartAction = (data) => {
    return {
        type : cart,
        payload : data
    }
}

const cartErrorAction = error => {
    return {
        type : errorOccured,
        errorMessage : error
    }
}

export const fetchCartProducts = () => {
    return (dispatch) => {
        getCartProducts()
        .then(res => dispatch(cartAction(res)))
        .catch(error => dispatch(cartErrorAction(error)))
    }
}
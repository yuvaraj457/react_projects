import { addToCart, getCartProducts } from "../core/apiCalls/products"
import { cart, errorOccured, productDecrement, productIncrement } from "./actionType"

const cartAction = (data) => {
    return {
        type : cart,
        payload : data,

    }
}

const cartErrorAction = error => {
    return {
        type : errorOccured,
        errorMessage : error
    }
}

export const productIncrementAction = (id) => {
    return {
        type : productIncrement,
        productId : id
    }
}

export const productDecrementAction = (id) => {
    return {
        type : productDecrement,
        productId : id
    }
}

export const fetchCartProducts = () => {
    return (dispatch) => {
        getCartProducts()
        .then(res => dispatch(cartAction(res)))
        .catch(error => dispatch(cartErrorAction(error)))
    }
}

export const addCartProducts = (productId, quantity) => {
    return (dispatch) => {
        addToCart(productId, quantity)
        .then(dispatch(fetchCartProducts()))
    }
}


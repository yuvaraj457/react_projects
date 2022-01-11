import { addToCart, getCartProducts, getProductDetails } from "../core/apiCalls/products"
import { cart, cartDetails, errorOccured, productDecrement, productIncrement } from "./actionType"

const cartAction = (data) => {
    return {
        type : cart,
        payload : data,
    }
}

const cartProductDetailsAction = (data) => {
    return {
        type : cartDetails,
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

// export const fetchCartProducts = () => {
//     return (dispatch) => {
//         getCartProducts()
//         .then(res => dispatch(cartAction(res)))
//         .catch(error => dispatch(cartErrorAction(error)))
//     }
// }

export const fetchCartProducts = () => {
    return async(dispatch) => {
        const cartProductIds = await getCartProducts()
        dispatch(cartAction(cartProductIds))
        
        const cartProducts = await cartProductIds.map(item =>  getProductDetails(item.productId))
        Promise.all(cartProducts)
        .then(res =>  dispatch(cartProductDetailsAction(res)))
        .catch(error => dispatch(cartErrorAction(error)))
    }
}


export const addCartProducts = (productId, quantity) => {
    return (dispatch) => {
        addToCart(productId, quantity)
        .then(dispatch(fetchCartProducts()))
    }
}


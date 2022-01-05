import { getProducts } from "../core/apiCalls/products"
import { errorOccured, product } from "./actionType"

const productAction = (data) => {
    return {
        type : product,
        payload : data
    }
}

const productErrorAction = error => {
    return {
        type : errorOccured,
        errorMessage : error
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
        getProducts()
        .then((res) => dispatch(productAction(res)))
        .catch((error) => productErrorAction(error))
    }
}
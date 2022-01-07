import { cart, productIncrement } from "../action/actionType"

const initialState = {
    cartProducts: []
}

export const cartReducer = (state = initialState, action) => {
     switch (action.type) {
        case cart:
            return {
                cartProducts: action.payload
            }

        // case productIncrement:
        //     const indexProduct = state.cartProducts.find((item) => item.productId === action.productId)
        //     return {
        //         cartProducts : [
        //             ...state.cartProducts.filter(product => product !== indexProduct), 
        //             {...indexProduct, quantity : indexProduct.quantity +1 }
        //         ]
        //     }
        case productIncrement:
            const indexProduct = state.cartProducts.findIndex((item) => item.productId === action.productId)
            const product = state.cartProducts.find((item) => item.productId === action.productId)
            return {
                cartProducts: [
                    ...state.cartProducts.slice(0, indexProduct),
                    {
                        ...state.cartProducts[indexProduct],
                        quantity : product.quantity + 1
                    },
                    ...state.cartProducts.slice(indexProduct + 1)
                ]
            }
        default:
            return state
    }
}
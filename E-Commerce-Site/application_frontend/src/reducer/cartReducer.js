import { cart, cartDetails, productDecrement, productIncrement } from "../action/actionType"

const initialState = {
    cartProducts: [],
    cartProductDetails : []
}

export const cartReducer = (state = initialState, action) => {
     switch (action.type) {
        case cart:
            return {
                ...state,
                cartProducts: action.payload
            }

        case productIncrement:
            const indexProduct = state.cartProducts.findIndex((item) => item.productId === action.productId)
            const product = state.cartProducts.find((item) => item.productId === action.productId)
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts.slice(0, indexProduct),
                    {
                        ...state.cartProducts[indexProduct],
                        quantity : product.quantity + 1
                    },
                    ...state.cartProducts.slice(indexProduct + 1)
                ]
            }
        
        case productDecrement:
            const indexProduct2 = state.cartProducts.findIndex((item) => item.productId === action.productId)
            const product2 = state.cartProducts.find((item) => item.productId === action.productId)
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts.slice(0, indexProduct2),
                    {
                        ...state.cartProducts[indexProduct2],
                        quantity : product2.quantity - 1
                    },
                    ...state.cartProducts.slice(indexProduct2 + 1)
                ]
            }
        case cartDetails:
            return {
                ...state,
                cartProductDetails : action.payload
            }

        default:
            return state
    }
}
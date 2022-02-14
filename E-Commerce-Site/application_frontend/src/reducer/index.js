import {combineReducers} from 'redux'
import {productsReducer} from './productsReducer'
import {userReducer} from './userReducer'
import {cartReducer} from './cartReducer'
import {adminReducer} from './adminReducer'

export default combineReducers({
    productsReducer,
    userReducer,
    cartReducer,
    adminReducer
})
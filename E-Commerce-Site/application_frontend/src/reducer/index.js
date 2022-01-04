import {combineReducers} from 'redux'
import {productsReducer} from './productsReducer'
import {userReducer} from './userReducer'

export default combineReducers({
    productsReducer,
    userReducer
})
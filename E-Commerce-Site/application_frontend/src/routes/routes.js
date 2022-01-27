import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../components/homePage/home'
import {ProductDetailedViewContainer} from '../containers/productsContainer/productDetailedViewContainer'

import {MensProduct} from '../components/products/mensProduct'

import {LoginContainer} from '../containers/userContainer/loginContainer'
import {SignupContainer} from '../containers/userContainer/signupContainer'

import { getAuthToken } from '../shared/authToken'
import { WomensProduct } from '../components/products/womensProduct'
import { ElectronicsProduct } from '../components/products/electronicsProduct'
import {CartDataContainer} from '../containers/cartContainer/cartDataContainer'
import {UserProfileContainer} from '../containers/userContainer/userProfileContainer'
import {EditProfileContainer} from '../containers/userContainer/editProfileContainer'
import { Logout } from '../components/logoutPage/logout'
import { useSelector } from 'react-redux'


const PrivateRoutes = ({children}) => {
    const {isLogin} = useSelector(state => state.userReducer)
    return(
        isLogin ? children : <Navigate to='/login'/>
    )
}

export default function AppRouter() {
    
    return (
            <Routes>
                <Route path='/login' element = {<LoginContainer />}/>
                <Route path='/signup' element = {<SignupContainer/>} />
                <Route path='/' element = {<Home/>} />
                <Route path='/mens/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/womens/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/electronics/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/Mens' element = {<MensProduct/>}/>
                <Route path='/Womens' element = {<WomensProduct/>}/>
                <Route path = '/Electronics' element = {<ElectronicsProduct/>} />
                <Route path='/cart' element = {<PrivateRoutes><CartDataContainer/></PrivateRoutes>}/>
                <Route path='/MyAccount' element = {<UserProfileContainer/>}/>
                <Route path='/edit/:field' element = {<EditProfileContainer/>}/>
                <Route path='/Logout' element = {<Logout/>}/>
            </Routes>
    )
}


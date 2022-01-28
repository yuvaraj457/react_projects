import React, { useEffect, useState } from 'react'
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
import { authenticate } from '../core/apiCalls/user'
import { NavBar } from '../shared/navBar'
import { verifyAuth } from '../action/userAction'
import { useDispatch, useSelector } from 'react-redux'


const PrivateRoutes = ({children, isAuthenticated}) => {
    console.log(isAuthenticated)
    return (
        isAuthenticated ? children : <Navigate to='/login'/>
    )
}

export default function AppRouter() {
    const [loading, setLoading] = useState(false)
    
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector(state => state.userReducer)

    useEffect(() => {
        authenticate()
    .then(() => {
      dispatch(verifyAuth(true))
    })
    setTimeout(()=> setLoading(true), 1000)
    
    }, [])

    
    return (
        <>
        <NavBar/>
            {
                loading &&
            <Routes>
                <Route path='/login' element = {<LoginContainer/>}/>
                <Route path='/signup' element = {<SignupContainer/>} />
                <Route path='/' element = {<Home/>} />
                <Route path='/mens/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/womens/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/electronics/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/Mens' element = {<MensProduct/>}/>
                <Route path='/Womens' element = {<WomensProduct/>}/>
                <Route path = '/Electronics' element = {<ElectronicsProduct/>}/>
                <Route path='/cart' element = {<PrivateRoutes isAuthenticated={isAuthenticated}><CartDataContainer/></PrivateRoutes>}/>
                <Route path='/MyAccount' element = {<UserProfileContainer/>}/>
                <Route path='/edit/:field' element = {<EditProfileContainer/>}/>
                <Route path='/Logout' element = {<Logout/>}/>
            </Routes>
}
            </>
    )
}


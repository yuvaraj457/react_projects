import React, { useEffect, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../components/homePage/home'
import {ProductDetailedViewContainer} from '../containers/productsContainer/productDetailedViewContainer'

import {MensProduct} from '../components/products/mensProduct'

import {LoginContainer} from '../containers/userContainer/loginContainer'
import {SignupContainer} from '../containers/userContainer/signupContainer'

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
import ProductFilterViewContainer from '../containers/productsContainer/productFilterViewContainer'
import {ProductUploadContainer} from '../containers/adminContainer/productUploadContainer'
import CheckoutContainer from '../containers/userContainer/checkoutContainer'
import DebitCard from '../components/checkoutPage/payments/debitCard'
import { ProductEditContainer } from '../containers/adminContainer/productEditContainer'


const PrivateRoutes = ({children, isAuthenticated}) => {
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
    
    }, [dispatch])

    
    return (
        <>
        <NavBar/>
            {
                loading &&
            <Routes>
                <Route path='/login' element = {!isAuthenticated? <LoginContainer/> : <Navigate to='/'/> }/>
                <Route path='/signup' element = {<SignupContainer/>} />
                <Route path='/' element = {<Home/>} />
                <Route path='/mens/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/womens/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/electronics/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/Mens' element = {<MensProduct/>}/>
                <Route path='/Womens' element = {<WomensProduct/>}/>
                <Route path='/Electronics' element = {<ElectronicsProduct/>}/>
                <Route path='productType/:field' element = {<ProductFilterViewContainer/>} />
                <Route path='/cart' element = {<PrivateRoutes isAuthenticated={isAuthenticated}><CartDataContainer/></PrivateRoutes>}/>
                <Route path='/MyAccount' element = {<UserProfileContainer/>}/>
                <Route path='/edit/:field' element = {<EditProfileContainer/>}/>
                <Route path='/Logout' element = {<Logout/>}/>
                <Route path='/Product%20Upload' element = {<ProductUploadContainer/>}/>
                <Route path='/checkout' element = {<CheckoutContainer/>}/>
                <Route path='/payment' element = {<DebitCard/>}/>
                <Route path='/product%20Edit' element = {<ProductEditContainer/>}/>
            </Routes>
}
            </>
    )
}


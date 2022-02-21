import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import Home from '../components/homePage/home'
import { ProductDetailedViewContainer } from '../containers/productsContainer/productDetailedViewContainer'
import { LoginContainer } from '../containers/userContainer/loginContainer'
import { SignupContainer } from '../containers/userContainer/signupContainer'
import { CartDataContainer } from '../containers/cartContainer/cartDataContainer'
import { UserProfileContainer } from '../containers/userContainer/userProfileContainer'
import { EditProfileContainer } from '../containers/userContainer/editProfileContainer'
import { Logout } from '../components/logoutPage/logout'
import { authenticate } from '../core/apiCalls/user'
import { NavBar } from '../shared/navBar'
import { verifyAuth } from '../action/userAction'
import ProductFilterViewContainer from '../containers/productsContainer/productFilterViewContainer'
import { ProductUploadContainer } from '../containers/adminContainer/productUploadContainer'
import CheckoutContainer from '../containers/userContainer/checkoutContainer'
import DebitCard from '../components/checkoutPage/payments/debitCard'
import { ProductEditContainer } from '../containers/adminContainer/productEditContainer'
import { UserEditContainer } from '../containers/adminContainer/userEditContainer'
import { checkuserpermission } from '../utlis/checkUserPermission'


const PrivateRoutes = ({ children, isAuthenticated, userType, path }) => {
    const allowAcess = checkuserpermission(userType, path)
    return (
        isAuthenticated && allowAcess ? children : <Navigate to='/login'/>
    )
}

export default function AppRouter() {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()
    const { isAuthenticated, userDetails } = useSelector(state => state.userReducer)

    useEffect(() => {
        authenticate()
            .then(() => {
                dispatch(verifyAuth(true))
            })
        setTimeout(() => setLoading(true), 1000)

    }, [dispatch])


    return (
        <>
            <NavBar />
            {
                loading &&
                <Routes>
                    <Route path='/login' element={!isAuthenticated ? <LoginContainer /> : <Navigate to='/' />} />
                    <Route path='/signup' element={<SignupContainer />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/productDetails/:productId' element={<ProductDetailedViewContainer />} />
                    <Route path='/productType/:field' element={<ProductFilterViewContainer />} />
                    <Route path='/cart' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><CartDataContainer /></PrivateRoutes>} />
                    <Route path='/MyAccount' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><UserProfileContainer /></PrivateRoutes>} />
                    <Route path='/editProfile/:field' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><EditProfileContainer /></PrivateRoutes>} />
                    <Route path='/Logout' element={<Logout />} />
                    <Route path='/Product%20Upload' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><ProductUploadContainer /></PrivateRoutes>} />
                    <Route path='/checkout' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><CheckoutContainer /></PrivateRoutes>} />
                    <Route path='/checkout/:productId' element={<CheckoutContainer />} />
                    <Route path='/payment' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><DebitCard /></PrivateRoutes>} />
                    <Route path='/product%20Edit' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><ProductEditContainer /></PrivateRoutes>} />
                    <Route path='/Manage%20Users' element={<PrivateRoutes isAuthenticated={isAuthenticated} path={location.pathname} userType={userDetails.userType}><UserEditContainer /></PrivateRoutes>} />
                </Routes>
            }
        </>
    )
}


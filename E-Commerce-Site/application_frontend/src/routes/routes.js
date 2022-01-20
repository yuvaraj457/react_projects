import React from 'react'
import {Routes, Route, Navigate,  useNavigate} from 'react-router-dom'
import Home from '../components/homePage/home'
import {ProductDetailedViewContainer} from '../containers/productsContainer/productDetailedViewContainer'

import {MensProduct} from '../components/products/mensProduct'

import LoginContainer from '../containers/userContainer/loginContainer'
import SignupContainer from '../containers/userContainer/signupContainer'

import { getAuthToken } from '../shared/authToken'
import { WomensProduct } from '../components/products/womensProduct'
import { ElectronicsProduct } from '../components/products/electronicsProduct'
import {CartDataContainer} from '../containers/cartContainer/cartDataContainer'
import UserProfileContainer from '../containers/userContainer/userProfileContainer'
import {EditProfileContainer} from '../containers/userContainer/editProfileContainer'
import AutoGridNoWrap from '../components/userAccount/addressListCard'

const PrivateRoutes = ({children}) => {
    return(
        getAuthToken() ? children : <Navigate to='/login'/>
    )
}

export default function AppRouter() {
    const navigate = useNavigate()
    return (
            <Routes>
                <Route path='/login' element = {<LoginContainer navigate={navigate} />}/>
                <Route path='/signup' element = {<SignupContainer/>} />
                <Route path='/' element = {<PrivateRoutes><Home/></PrivateRoutes>} />
                <Route path='/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
                <Route path='/Mens' element = {<MensProduct/>}/>
                <Route path='/Womens' element = {<WomensProduct/>}/>
                <Route path = '/Electronics' element = {<ElectronicsProduct/>} />
                <Route path='/cart' element = {<CartDataContainer/>}/>
                <Route path='/MyAccount' element = {<UserProfileContainer/>}/>
                <Route path='/edit/:field' element = {<EditProfileContainer/>}/>
                <Route path='/card' element = {<AutoGridNoWrap/>} />
            </Routes>
    )
}


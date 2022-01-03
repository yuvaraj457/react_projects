import React from 'react'
import {Routes, Route, Navigate,  useNavigate, useParams} from 'react-router-dom'
import Home from '../components/homePage/home'
import {ProductDetailedViewContainer} from '../containers/productsContainer/productDetailedViewContainer'
import ProductsDataContainer from '../containers/productsContainer/productsDataContainer'

import LoginContainer from '../containers/userContainer/loginContainer'
import SignupContainer from '../containers/userContainer/signupContainer'

import { getAuthToken } from '../shared/authToken'

const PrivateRoutes = ({children}) => {
    return(
        getAuthToken() ? children : <Navigate to='/login'/>
    )
}

export default function AppRouter() {
    const navigate = useNavigate()
    const params = useParams()
    return (
            <Routes>
                <Route path='/login' element = {<LoginContainer navigate={navigate} />}/>
                <Route path='/signup' element = {<SignupContainer/>} />
                <Route path='/' element = {<PrivateRoutes><Home/></PrivateRoutes>} />
                 <Route path='/productDetails/:productId' element = {<ProductDetailedViewContainer/>}/>
            </Routes>
    )
}


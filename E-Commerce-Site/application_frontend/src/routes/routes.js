import React from 'react'
import {Routes, Route, Navigate,  useNavigate} from 'react-router-dom'
import Home from '../components/homePage/home'
import ProductCard from '../components/products/productCard'

import LoginContainer from '../containers/userContainer/loginContainer'
import SignupContainer from '../containers/userContainer/signupContainer'

import { getAuthToken } from '../shared/authToken'

const PrivateRoutes = ({children}) => {
    return(
        getAuthToken() ? children : <Navigate to='/login'/>
    )
}

export default function AppRouter() {
    return (
            <Routes>
                <Route path='/login' element={<LoginContainer/>}/>
                <Route path='/signup' element={<SignupContainer/>}/>
                <Route path='/' element={<PrivateRoutes><Home/></PrivateRoutes>}/>
            </Routes>
    )
}


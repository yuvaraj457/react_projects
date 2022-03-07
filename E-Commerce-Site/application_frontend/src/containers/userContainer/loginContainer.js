import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import Login from '../../components/loginPage/login'
import { login } from '../../core/apiCalls/user'

import {fetchUser, setAccessToken, verifyAuth} from '../../action/userAction'
import {  useNavigate } from 'react-router-dom'
import { fetchCartProducts } from '../../action/cartAction'
import  tokenManger  from '../../shared/authService'


export const LoginContainer = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    console.log(tokenManger.getAccessToken())
    const onChange = e => {
            setFormData({
                ...formData,
                [e.target.name] : e.target.value
            }) 
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(formData)
        .then((res) => {
            dispatch(verifyAuth(true))
            tokenManger.setAccessToken(res.accessToken)
            dispatch(fetchUser())
            dispatch(fetchCartProducts())
            navigate('/')
        })
        .catch(error => {
            const errors =  error.response.data
            const errorLst = {}
            errors.map(item => errorLst[item.path[0]] = item.message)
            setErrors(errorLst)
        })
      }

        return (
            <Login onChange = {onChange} handleSubmit={handleSubmit} errors={errors}/>
        )
}


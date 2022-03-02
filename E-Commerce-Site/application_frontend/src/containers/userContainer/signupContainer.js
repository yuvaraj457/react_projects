import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SignUp } from '../../components/signupPage/signup'
import { emailVerification, getUserByToken, signup } from '../../core/apiCalls/user'

export const SignupContainer= () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const onChange = e => {
            setFormData ({
                ...formData,
                [e.target.name] : e.target.value
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signup(formData)
        .then(() => navigate('/login'))
        .catch( err => {
         const errors =  err.response.data
         const errorLst = {}
         errors.map(item => errorLst[item.path[0]] = item.message)
         setErrors(errorLst)
        })
    }

    const emailVerifyHandler = (email) => {
        emailVerification(formData.email)
        .then((res) => {
            setMessage('verification link sent')
            setFormData({...formData, token : res})
        })
    }

    useEffect(() => {
        if(formData.token){
            getUserByToken(formData.token)
            .then(res => setMessage('email verified'))
        }
    },[formData])

        return (
            <SignUp 
                onChange = {onChange} 
                handleSubmit={handleSubmit} 
                errors={errors} 
                emailVerifyHandler={emailVerifyHandler}
                message={message}
            />
        )
}
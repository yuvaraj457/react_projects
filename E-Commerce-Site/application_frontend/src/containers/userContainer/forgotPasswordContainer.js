import { Alert } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ForgotPasswordCard from '../../components/userAccount/forgotPasswordCard'
import { forgotPassword } from '../../core/apiCalls/user'

export default function ForgotPasswordContainer() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState({})


    const emailHandler = e => {
        setEmail(e.target.value)
    }

    const submitHandler = () => {
        forgotPassword(email)
        .then(res => setMessage({type : 'success', text : res}))
        .catch(error => setMessage({type : 'error', text : error.response.data}))
    }

    return (
        <>
        <ForgetPasswordCard emailHandler={emailHandler} submitHandler={submitHandler} message={message}/>
        
        </>
    )
}

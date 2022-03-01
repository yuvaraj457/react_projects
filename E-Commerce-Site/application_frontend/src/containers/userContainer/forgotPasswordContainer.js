import React, { useState } from 'react'


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
        .then(res => setMessage({type : 'success', text : res.message}))
        .catch(error => setMessage({type : 'error', text : error.response.data.message}))
    }

    return (
        <>
            <ForgotPasswordCard emailHandler={emailHandler} submitHandler={submitHandler} message={message}/>
        </>
    )
}

import React, { useState } from 'react'
import ForgetPasswordCard from '../../components/userAccount/forgetPasswordCard'
import { forgotPassword } from '../../core/apiCalls/user'

export default function ForgetPasswordContainer() {
    const [email, setEmail] = useState('')

    const emailHandler = e => {
        setEmail(e.target.value)
    }

    const submitHandler = () => {
        forgotPassword(email)
        .then(res => console.log(res))
    }

    return (
        <ForgetPasswordCard emailHandler={emailHandler} submitHandler={submitHandler}/>
    )
}

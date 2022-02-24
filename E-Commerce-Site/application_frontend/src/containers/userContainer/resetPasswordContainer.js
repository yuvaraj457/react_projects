import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import {ResetPasswordCard} from '../../components/userAccount/resetPasswordCard'
import { resetPassword } from '../../core/apiCalls/user';

export const ResetPasswordContainer = () => {
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState({})

    const {token} = useParams()

    useEffect(() => {
        resetPassword(token)
        .then(res => setMessage({type : 'success', text : res}))
        .catch(error => setMessage({type : 'error', text : error.response.data}))
    },[])

    const passwordHandler = e => {
        setFormData(
            {...formData, [e.target.name] : e.target.value}
        )
    }

    return (
        Object.keys(message).length > 0 && message.type === 'success'?
        <ResetPasswordCard passwordHandler={passwordHandler}/>
        :
        Object.keys(message).length > 0 && <h2>{message.text}</h2>
    )
}

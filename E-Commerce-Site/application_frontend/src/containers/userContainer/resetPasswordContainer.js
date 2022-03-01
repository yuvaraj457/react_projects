import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import {ResetPasswordCard} from '../../components/userAccount/resetPasswordCard'
import { resetPassword, resetPasswordViaEmailToken } from '../../core/apiCalls/user';

export const ResetPasswordContainer = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState({})
    const [message, setMessage] = useState({})
    const [user, setUser] = useState({})
    const {token} = useParams()

    useEffect(() => {
        resetPassword(token)
        .then(res => {
            setMessage({type : 'success', text : res})
            setUser(res.id)
        })
        .catch(error => setMessage({type : 'error', text : error.response.data}))
    },[token])

    const passwordHandler = e => {
        setFormData(
            {...formData, [e.target.name] : e.target.value}
        )
    }

    const submitHandler = () => {
        resetPasswordViaEmailToken(user, formData.newPassword, formData.retypedNewPassword)
        .then(res => setMessage({type : 'resetted', text : res}))
        .catch(error => {
            const errorItems = error.response.data
            const errorLst = {}
            errorItems.map(item => errorLst[item.path[0]] = item.message)
            setError(errorLst)
        })
    }

    return (
        Object.keys(message).length > 0 && message.type === 'success'?
        <ResetPasswordCard passwordHandler={passwordHandler} submitHandler={submitHandler} error={error}/>
        :
        Object.keys(message).length > 0 && message.type === 'resetted' ? <Alert severity='success'>{message.text}</Alert> : Object.keys(message).length > 0 && <h2>{message.text}</h2>
    )
}

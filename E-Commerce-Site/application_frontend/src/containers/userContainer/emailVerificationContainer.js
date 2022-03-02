import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { verifyUserViaEmail } from '../../core/apiCalls/user'

export const EmailVerificationContainer = () => {
    const {token} = useParams()

    const [message, setMessage] = useState('')

    useEffect(() => {
        verifyUserViaEmail(token)
        .then(res => setMessage(res))
    },[token, message])

  return (
    message && <Alert severity='success'>{message}</Alert>
  )
}

import { Alert, Button, Container, Grid, Snackbar, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordCard } from '../../components/userAccount/changePasswordCard'
import { changePassword } from '../../core/apiCalls/user'

export default function ChangePasswordContainer() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const currentPasswordHandler = e => {
        setCurrentPassword(e.target.value)
    }

    const newPasswordHandler = e => {
        setNewPassword(e.target.value)
    }

    const submitHandler = () => {
        changePassword(currentPassword, newPassword)
            .then(res => {
                setMessage(res)
                setOpen(true)
                setErrors({})
                setTimeout(() => navigate('/logout'), 4000)
            })
            .catch(error => {
                const errorItems = error.response.data
                console.log(errorItems)
                const errorLst = {}
                errorItems.map(item => errorLst[item.path[0]] = item.message)
                if(errorLst.invalidPassword){
                    setMessage(errorLst.invalidPassword)
                    setOpen(true)
                }
                setErrors(errorLst)
                setTimeout(() => setOpen(false), 4000)
            })
    }

    return (
        <Container>
            <ChangePasswordCard currentPasswordHandler={currentPasswordHandler} newPasswordHandler={newPasswordHandler} submitHandler={submitHandler} errors={errors}/>
            <Snackbar open={open} >
                <Alert  severity={errors.invalidPassword?"error":"success"} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyAuth } from '../../action/userAction';
import { logout } from '../../core/apiCalls/user';

export const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        logout()
        .then(() => {
            dispatch(verifyAuth(false))
            setTimeout(() => navigate('/login'), 2000)
        })
    },[dispatch, navigate])

  return  <Alert severity="success">Logout Successfull</Alert>
}

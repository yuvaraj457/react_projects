import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyAuth } from '../../action/userAction';
import { logout } from '../../core/apiCalls/user';
import  tokenManger  from '../../services/authService';

export const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        logout()
        .then(() => {
            tokenManger.deleteAccessToken()
            dispatch(verifyAuth(false))
            setTimeout(() => navigate('/login'), 2000)
        })
    },[dispatch, navigate])

  return  <Alert severity="success">{location.state ? location.state  : 'Logout Successfull'}</Alert>
}

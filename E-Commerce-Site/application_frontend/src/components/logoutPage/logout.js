import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyAuth } from '../../action/userAction';
import { logout } from '../../core/apiCalls/user';
import { clearAuthToken } from '../../shared/authToken';

export const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        logout()
        .then(() => {
            dispatch(verifyAuth(false))
            setTimeout(() => navigate('/login'), 2000)
        })
    },[])

  return  <Alert severity="success">Logout Successfull</Alert>
}

import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../core/apiCalls/user';
import { clearAuthToken } from '../../shared/authToken';

export const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        logout()
        .then(() => {
            clearAuthToken()
            setTimeout(() => navigate('/login'), 2000)
        })
    },[])

  return  <Alert severity="success">Logout Successfull</Alert>
}

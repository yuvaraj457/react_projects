import axios from 'axios';

import {apiTarget}  from '../config';
import  tokenManager  from '../services/authService';
import { refreshToken } from './apiCalls/user';


export const axiosInstance = axios.create({
    baseURL: apiTarget,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = tokenManager.getAccessToken() || null
      if (accessToken) {
        config.headers["Authorization"] = accessToken;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true
            refreshToken()
            .then(data => tokenManager.setAccessToken(data.accessToken))
            
            return axios(originalRequest)
        }
        return Promise.reject(error);
        }
)



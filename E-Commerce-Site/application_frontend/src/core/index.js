import axios from 'axios';
import { useSelector } from 'react-redux';
import {apiTarget}  from '../config';
import  tokenManger  from '../shared/authService';


export const axiosInstance = axios.create({
    baseURL: apiTarget,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = tokenManger.getAccessToken() || null
      console.log(accessToken)
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
            const {data} = await axiosInstance.get('/auth/refreshToken')
            // Cookies.set('access_token', data, {httpOnly : true})
            console.log(data)
            // return axios(originalRequest)
        }
        }
)



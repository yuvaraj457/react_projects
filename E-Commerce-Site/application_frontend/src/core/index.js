import axios from 'axios';
import {apiTarget}  from '../config';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    baseURL: apiTarget,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true
            axiosInstance.get('/auth/refreshToken')
            .then((res) => 
            {
                if (res.status === 200) {
                console.log("Access token refreshed!");
                return axios(originalRequest);
            }
        })
        }
    }
)



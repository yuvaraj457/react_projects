import axios from 'axios';
import {apiTarget}  from '../config';

export const axiosInstance = axios.create({
    baseURL: apiTarget,
});




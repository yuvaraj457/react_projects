import axios from "axios"
import {axiosInstance} from ".."
import {url} from "../../config"

export const signup = async (formData) => {
    const data = await axiosInstance.post(url.signup, formData)
    return data
}

export const login = async (formData) => {
    const {data} = await axiosInstance.post(url.login, formData)
    return data
}


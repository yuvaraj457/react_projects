import {axiosInstance} from ".."
import {url} from "../../config"

export const signup = async (formData) => {
    const data = await axiosInstance.post(url.signup, formData)
    console.log(data)
    return data
}

export const login = async (formData) => {
    const {data} = await axiosInstance.post(url.login, formData)
    return data
}

export const getUser = async () => {
    const {data} = await axiosInstance.get(url.getUser)
    return data
}

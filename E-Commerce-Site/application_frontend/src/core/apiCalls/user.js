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

export const authenticate =  async() => {
    
    const {data} = await axiosInstance.get(url.authenticate)
    return data
 
}
export const getUser = async () => {
    const {data} = await axiosInstance.get(url.getUser)
    return data
}

export const editPhone = async (e) => {
    const {data} = await axiosInstance.post(url.editPhone, {phone : e})
    return data
}

export const editAddress = async(e) => {
    const {data} = await axiosInstance.post(url.editAddress, e)
    return data
}

export const activeAddress = async (e) => {
    const {data} = await axiosInstance.post(url.activeAddress, {activeAddress : e})
    return data
}

export const deleteAddress = async (e) => {
    const {data} = await axiosInstance.post(url.deleteAddress, {address : e})
    return data
}

export const changePassword = async (currentPassword, newPassword) => {
    const {data} = await axiosInstance.post(url.changePassword, {currentPassword, newPassword})
    return data
}

export const forgotPassword = async (email) => {
    const {data} = await axiosInstance.post(url.forgotPassword, {email})
    return data
}

export const resetPassword = async (token) => {
    const {data} = await axiosInstance.post(url.resetPassword, {token})
    return data
}

export const resetPasswordViaEmailToken = async (_id, newPassword, retypedNewPassword) => {
    const {data} = await axiosInstance.post(url.resetPasswordViaEmailToken, {_id, newPassword, retypedNewPassword})
    return data
}

export const logout = async () => {
    await axiosInstance.get(url.logout)
}
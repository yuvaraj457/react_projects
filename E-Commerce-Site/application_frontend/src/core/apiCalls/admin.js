import { axiosInstance } from ".."
import {url} from "../../config"

export const productUpload = async (product) => {
    const formData = new FormData()
    Object.keys(product).forEach(key => {
        formData.append(
            key,
            product[key]
          )
    });
    
    const {data} = await axiosInstance.post(url.productUpload, formData)
    return data
}

export const productUpdate = async (product) => {
    const formData = new FormData()
    Object.keys(product).forEach(key => {
        formData.append(
            key,
            product[key]
          )
    })

    const {data} = await axiosInstance.post(url.productUpdate, formData)
    return data
}

export const productDelete = async (_id) => {
    const {data} = await axiosInstance.post(url.productDelete, {_id})
    return data
}

export const getAllUsers = async () => {
    const {data} = await axiosInstance.get(url.getAllUsers)
    return data
}
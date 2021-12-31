import { axiosInstance } from ".."

export const getProducts = async () => {
    const {data} = await axiosInstance.get('/products',{withCredentials: true})
    return data
}
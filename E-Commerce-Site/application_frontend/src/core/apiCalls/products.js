import { axiosInstance } from ".."

export const getProducts = async () => {
    const {data} = await axiosInstance.get('/products',{withCredentials: true})
    return data
}

export const getProductDetails = async (id) => {
    const {data} = await axiosInstance.get('/productDetails' ,{ params: { productId: id } })
    return data
}

export const addToCart = async (id) => {
    const {data} = await axiosInstance.post('/addToCart', {productId: id})
}
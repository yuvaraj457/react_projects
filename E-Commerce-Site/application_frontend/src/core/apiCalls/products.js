import { axiosInstance } from ".."

export const getProducts = async () => {
    const {data} = await axiosInstance.get('/products',{withCredentials: true})
    return data
}

export const getProductDetails = async (id) => {
    const {data} = await axiosInstance.get('/productDetails' ,{ params: { productId: id } })
    return data
}

export const getCartProducts = async () => {
    const {data} = await axiosInstance.get('/getCartProducts')
    return data
}

export const addToCart = async (id) => {
    const {data} = await axiosInstance.post('/addToCart', {productId: id})
    return data
}

export const deleteCartProduct = async(id) => {
    const {data} = await axiosInstance.post('/deleteCartProduct', {productId: id})
    return data
}
export const productQuantityUpdate = async (id, quantity) => {
    const {data} = await axiosInstance.post('/productQuantityUpdate', {productId: id, quantity})
    return data
}



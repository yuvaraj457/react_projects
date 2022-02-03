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
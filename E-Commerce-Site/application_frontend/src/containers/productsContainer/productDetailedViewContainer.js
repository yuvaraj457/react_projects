import { useParams } from "react-router-dom"

import ProductDetailedViewCard from '../../components/products/productDetailedViewCard'

import React, { useEffect, useState } from 'react'
import { getProductDetails } from "../../core/apiCalls/products"

export const ProductDetailedViewContainer = () => {
    const [product, setProduct] = useState([])
    const {productId} = useParams()

    useEffect(()=>{
        const fetchData = () => {
            getProductDetails(productId)
        .then(res => setProduct([res]))
        .catch(error => console.log(error))
        }
        fetchData()
    },[])

    
    return (
        product.length > 0 && <ProductDetailedViewCard product={product[0]}/>
    )
}


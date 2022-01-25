import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'

import ProductDetailedViewCard from '../../components/products/productDetailedViewCard'
import { getProductDetails } from "../../core/apiCalls/products"
import { addCartProducts } from "../../action/cartAction"
import { useDispatch } from "react-redux"

export const ProductDetailedViewContainer = () => {
    const [product, setProduct] = useState([])
    const {productId} = useParams()
    const dispatch = useDispatch()

    const addToCartHandler = (id) => {
        dispatch(addCartProducts(id))
      }

    useEffect(() => {
            getProductDetails(productId)
        .then(res => setProduct([res]))
        .catch(error => console.log(error))
    },[productId])

    
    return (
        product.length > 0 && <ProductDetailedViewCard product={product[0]} addToCartHandler={addToCartHandler}/>
    )
}


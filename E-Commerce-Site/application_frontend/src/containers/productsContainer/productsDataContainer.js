import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Grid } from '@mui/material'

import { addCartProducts } from '../../action/cartAction'
import {fetchProducts} from '../../action/productAction'
import ProductCard from '../../components/products/productCard'

 export const ProductsDataContainer = () => {
    const {products} = useSelector(state => state.productsReducer)
    const [filteredProduct, setFilteredProduct] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const sWord = params.get('search')

    useEffect(() => {
        if(sWord){
        const filterProduct = products.filter(item => {
            const productName = item.productName.toLowerCase().split(' ')
            if(productName.includes(sWord)){
                return item
            }
        })
        setFilteredProduct(filterProduct)
    }
    },[sWord, products])

    const addToCartHandler = (id) => {
    dispatch(addCartProducts(id))
    }

    const checkoutHandler = (id) => {
        navigate(`/checkout/${id}`)
    }

        useEffect(() => {
            dispatch(fetchProducts())
        },[dispatch])

        return (
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3} sx={{ mb: 2 }}>
                    {
                        sWord && location.pathname === '/filteredProducts/'?
                        filteredProduct.length > 0  && filteredProduct.map((item, index) => <Grid item key={index} ><ProductCard product={item} addToCartHandler={addToCartHandler} checkoutHandler={checkoutHandler}/></Grid>)
                        :
                        products.length > 0  && products.map((item, index) => <Grid item key={index} ><ProductCard product={item} addToCartHandler={addToCartHandler} checkoutHandler={checkoutHandler}/></Grid>)
                    }
                    
                </Grid>
            </Grid>
        )
}

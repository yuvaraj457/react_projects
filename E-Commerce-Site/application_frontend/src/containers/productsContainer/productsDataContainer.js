import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartProducts } from '../../action/cartAction'

import {fetchProducts} from '../../action/productAction'
import ProductCard from '../../components/products/productCard'

 export const ProductsDataContainer = () => {
     const {products} = useSelector(state => state.productsReducer)
     const dispatch = useDispatch()

     const addToCartHandler = (id) => {
        dispatch(addCartProducts(id))
      }

        useEffect(() => {
            dispatch(fetchProducts())
        },[dispatch])

        return (
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3} sx={{ mb: 2 }}>
                    {products.length > 0  && products.map((item, index) => <Grid item key={index} ><ProductCard product={item} addToCartHandler={addToCartHandler}/></Grid>)}
                </Grid>
            </Grid>
        )
}

import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../action/productAction'
import ProductCard from './productCard'

export const MensProduct = () => {
    const { products } = useSelector(state => state.productsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!(products.length > 0)) {
            dispatch(fetchProducts())
        }
    }, [])

    return (
        <Grid item xs={12}>
            <Grid container justifyContent="space-around" spacing={3} sx={{ mb: 2, mt : 2 }}>
                {products.length > 0 && products.map((item, index) => item.productType === 'mens' && <Grid item key={index} ><ProductCard product={item} /></Grid>)}
            </Grid>
        </Grid>
    )
}

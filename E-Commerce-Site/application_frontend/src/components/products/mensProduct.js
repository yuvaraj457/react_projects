import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../action/productAction'
import ProductCard from './productCard'

export const MensProduct = ({products, addToCartHandler}) => {
    return (
        <Grid item xs={12}>
            <Grid container justifyContent="space-around" spacing={3} sx={{ mb: 2, mt : 2 }}>
                {products.length > 0 && products.map((item, index) => item.productType === 'mens' && <Grid item key={index} ><ProductCard product={item} addToCartHandler={addToCartHandler}/></Grid>)}
            </Grid>
        </Grid>
    )
}

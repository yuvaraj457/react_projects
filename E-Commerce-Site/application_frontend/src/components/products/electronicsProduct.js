import { Grid } from '@mui/material'
import React from 'react'

import ProductCard from './productCard'

export const ElectronicsProduct = ({products, addToCartHandler}) => {

    return (
        <Grid item xs={12}>
            <Grid container justifyContent="space-around" spacing={3} sx={{ mb: 2, mt : 2 }}>
                {products.length > 0 && products.map((item, index) => item.productType === 'electronics' && <Grid item key={index} ><ProductCard product={item} addToCartHandler={addToCartHandler} /></Grid>)}
            </Grid>
        </Grid>
    )
}

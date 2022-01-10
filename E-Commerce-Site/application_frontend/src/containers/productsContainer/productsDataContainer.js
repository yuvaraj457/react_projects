import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {connect} from 'react-redux'

import {fetchProducts} from '../../action/productAction'
import ProductCard from '../../components/products/productCard'

 export const ProductsDataContainer = () => {
     const {products} = useSelector(state => state.productsReducer)
     const dispatch = useDispatch()

        useEffect(() => {
            dispatch(fetchProducts())
        },[dispatch])

        return (
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2} sx={{ mb: 2 }}>
                    {products.length > 0  && products.map((item, index) => <Grid item key={index} ><ProductCard product={item}/></Grid>)}
                </Grid>
            </Grid>
        )
}

// const mapStateToProps = state =>  ({products : state.products})
    
// const mapDispatchToProps = (dispatch) => {
//     return {
//         productsDispatch : () => dispatch(fetchProducts())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductsDataContainer)
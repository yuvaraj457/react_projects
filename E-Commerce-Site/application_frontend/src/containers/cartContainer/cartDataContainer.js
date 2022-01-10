import React, { useEffect, useState } from 'react'
import { Cart } from '../../components/cartProducts/cart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartProducts, productDecrementAction, productIncrementAction } from '../../action/cartAction'
import { Box, Grid, Paper } from '@mui/material'
import { productQuantityUpdate } from '../../core/apiCalls/products'
import CartTable from '../../components/cartProducts/cartProductsTotal'

export const CartDataContainer = () => {
    const [id, setId] = useState('')
    const [quantity, setQuantity] = useState(0)
    const cartProducts = useSelector(state => state.cartReducer.cartProductDetails)
    const productIds = useSelector(state => state.cartReducer.cartProducts)
    console.log(cartProducts)
    const dispatch = useDispatch()
    useEffect(() => {
        if (productIds && !productIds.length) {
            dispatch(fetchCartProducts())
        }
        if(id){
            const product = productIds.find((item) => item.productId === id)
            productQuantityUpdate(id, product.quantity)
            setId('')
        }
        
    }, [dispatch, productIds, id])

    const productIncrementHandler = (id) => {
        dispatch(productIncrementAction(id))
        setId(id)
    }

    const productDecrementHandler = (id) => {
        dispatch(productDecrementAction(id))
        setId(id)
    }

    const productQuantityHandler = (value) => {
        setQuantity(value)
    }
    return (
        <Box sx={{mt: 2}}>
            {/* <Paper sx={{ mt: 2, p: 2 }}> */}
                <Grid container spacing={1}>
                    <Grid item container xs={8}  direction="column">
                        {cartProducts && cartProducts.map((item, index) => 
                        <Cart 
                            key = {index} 
                            product = {item}
                            productIds = {productIds}
                            productIncrementHandler = {productIncrementHandler}
                            productDecrementHandler = {productDecrementHandler}
                            productQuantityHandler={productQuantityHandler}
                        />
                        )}
                    </Grid>
                    <Grid item xs={4} container sm direction="column" >
                        <Paper>
                            <CartTable cartProducts={cartProducts} quantity={quantity}/>
                        </Paper>
                    </Grid>
                </Grid>
            {/* </Paper> */}
        </Box>
    )
}

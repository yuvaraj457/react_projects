import React, { useEffect, useState } from 'react'
import { Cart } from '../../components/cartProducts/cart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartProducts, productIncrementAction } from '../../action/cartAction'
import { Box, Grid, Paper } from '@mui/material'
import { productQuantityUpdate } from '../../core/apiCalls/products'

export const CartDataContainer = () => {
    const [id, setId] = useState('')
    const {cartProducts} = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (cartProducts && !cartProducts.length) {
            dispatch(fetchCartProducts())
        }
        if(id){
            const product = cartProducts.find((item) => item.productId === id)
            productQuantityUpdate(id, product.quantity)
            setId('')
        }
        
    }, [dispatch, cartProducts, id])

    const productIncrementHandler = (id) => {
        dispatch(productIncrementAction(id))
        setId(id)
    }

    return (
        <Box>
            <Paper sx={{ mt: 2, p: 2 }}>
                <Grid container >
                    <Grid item container xs={8}  direction="column">
                        {cartProducts && cartProducts.map((item, index) => 
                        <Cart 
                            key={index} 
                            productId={item.productId} 
                            quantity={item.quantity}
                            productIncrementHandler = {productIncrementHandler}
                        />
                        )}
                    </Grid>
                    <Grid item xs={4} container sm direction="column">
                        ....pro
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

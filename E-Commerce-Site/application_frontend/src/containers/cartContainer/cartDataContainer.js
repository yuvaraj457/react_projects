import React, { useEffect } from 'react'
import { Cart } from '../../components/cartProducts/cart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartProducts } from '../../action/cartAction'
import { Box, Grid, Paper } from '@mui/material'

export const CartDataContainer = () => {
    const state = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!state.cartProducts) {
            dispatch(fetchCartProducts())
        }
    }, [])

    return (
        <Box>
            <Paper sx={{ mt: 2, p: 2 }}>
                <Grid container >
                    <Grid item container xs={8}  direction="column">
                        {state.cartProducts && state.cartProducts.map((item, index) => <Cart key={index} productId={item} />)}
                    </Grid>
                    <Grid item xs={4} container sm direction="column">
                        ....pro
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

import React, { useEffect, useState } from 'react'
import { Cart } from '../../components/cartProducts/cart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartProducts, productDecrementAction, productIncrementAction } from '../../action/cartAction'
import { Alert, Box, Grid, Paper } from '@mui/material'
import { deleteCartProduct, productQuantityUpdate } from '../../core/apiCalls/products'
import CartTable from '../../components/cartProducts/cartProductsTotal'

export const CartDataContainer = () => {
    const [id, setId] = useState('')
    const [alertMessage, setAlertMessage] = useState(false)
    const cartProducts = useSelector(state => state.cartReducer.cartProductDetails)
    const productIds = useSelector(state => state.cartReducer.cartProducts)
  
    const dispatch = useDispatch()
    useEffect(() => {
        // if (productIds.length) {
            dispatch(fetchCartProducts())
        // }
        
    }, [alertMessage])

    if(id){
        const product = productIds.find((item) => item.productId === id)
        productQuantityUpdate(id, product.quantity)
        setId('')
    }

    const productIncrementHandler = (id) => {
        dispatch(productIncrementAction(id))
        setId(id)
    }

    const productDecrementHandler = (id) => {
        dispatch(productDecrementAction(id))
        setId(id)
    }

    const productQuantityHandler = (value) => {
        if(alertMessage){
            return 1
        }
        const {quantity} =  productIds.filter(item => item.productId === value)[0]
        return quantity
        
        
    }

    const deleteCartProductHandler = (id) => {
        deleteCartProduct(id)
        .then((res) => setAlertMessage(res))
        setTimeout(() => setAlertMessage(false), 8000)
    }



    let show =  alertMessage ? <Alert severity="success">{alertMessage}</Alert> : ''

    return (
        productIds.length > 0 ? 
        <Box sx={{m: 2}}>
                <Grid container spacing={1}>
                    <Grid item container xs={8}  direction="column">
                        {show}
                        {cartProducts && cartProducts.map((item, index) => 
                        <Cart 
                            key = {index} 
                            product = {item}
                            productIncrementHandler = {productIncrementHandler}
                            productDecrementHandler = {productDecrementHandler}
                            productQuantityHandler={productQuantityHandler}
                            alertMessage = {alertMessage}
                            deleteCartProductHandler = {deleteCartProductHandler}
                        />
                        )}
                    </Grid>
                    <Grid item xs={4} container sm direction="column" >
                        <Paper>
                            <CartTable cartProducts={cartProducts} productQuantityHandler={productQuantityHandler}/>
                        </Paper>
                    </Grid>
                </Grid>
        </Box>
        :
        <Alert severity="info">Your Cart Is Empty</Alert>
    )
}

import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { AddressField } from '../../components/checkoutPage/addressField';
import CartProducts from '../../components/checkoutPage/cartProducts';
import PaymentField from '../../components/checkoutPage/paymentField';

export default function CheckoutContainer() {
    const { cartProductDetails } = useSelector(state => state.cartReducer)
    const { cartProducts } = useSelector(state => state.cartReducer)
    const {activeAddress} = useSelector(state => state.userReducer.userDetails)

  
    return (
        <>
            <Container component="main" >
                <Box
                    sx={{
                       
                        marginTop: 4,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                       
                    }}
                >
                    {cartProductDetails.map((product, index) => {
                        const { quantity } = cartProducts.find(item => item.productId === product._id)
                        product.quantity = quantity
                        return <CartProducts key={index} product={product} />
                    })}
            
                    <AddressField address={activeAddress}/>
                    <PaymentField/>
                </Box>
            </Container>
        </>
    )

}

import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../action/userAction';
import { AddressField } from '../../components/checkoutPage/addressField';
import CartProducts from '../../components/checkoutPage/cartProducts';
import PaymentField from '../../components/checkoutPage/paymentField';
import { PhoneNumberField } from '../../components/checkoutPage/phoneNumberField';
import { getProductDetails } from '../../core/apiCalls/products';

export default function CheckoutContainer() {
    const {productId} = useParams()
    console.log(productId)
    const { cartProductDetails } = useSelector(state => state.cartReducer)
    const { cartProducts } = useSelector(state => state.cartReducer)
    const {activeAddress, phone} = useSelector(state => state.userReducer.userDetails)
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if(productId){
        getProductDetails(productId)
        .then(res => setProduct([res]))
        .catch(error => console.log(error))}
    },[])

    const renderUser = () => {
        dispatch(fetchUser())
    }


    if(!productId)
    {   
    
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
                        <PhoneNumberField phone={phone}/>
                        <AddressField address={activeAddress} renderUser={renderUser}/>
                        <PaymentField/>
                    </Box>
                </Container>
            </>
        )
    }
    else{
        return (
            <Container component="main" >
                    <Box
                        sx={{
                        
                            marginTop: 4,
                            marginBottom: 8,
                            display: 'flex',
                            flexDirection: 'column',
                        
                        }}
                    >
                       { product.length > 0 && 
                        <>
                        {
                        product.map((item) => {
                        item.quantity = 1
                        return <CartProducts product={product[0]}/> 
                        })
                        }
                        <AddressField address={activeAddress} renderUser={renderUser}/>
                        <PaymentField/>
                        </>
                        }
                    </Box>
                </Container>
        )
    }

}

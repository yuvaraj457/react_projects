import { Container, CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ProductEdit } from '../../components/admin/productEdit';
import { getProductDetails } from '../../core/apiCalls/products';

export const ProductEditContainer = (e) => {
    const [value, setValue] = useState('')
    const [product, setProduct] = useState([])

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getProductDetails(value)
        .then(res => setProduct(res))
    }

    return <Container component="main"  >
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& button' : {mt:2}
            }}
        >
            <ProductEdit handleChange={handleChange} value={value} handleSubmit={handleSubmit} product={product}/>
        </Box>
    </Container>
}

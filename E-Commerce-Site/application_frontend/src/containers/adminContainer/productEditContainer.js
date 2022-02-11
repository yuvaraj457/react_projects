import { Container, CssBaseline, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ProductEdit } from '../../components/admin/productEdit';
import { ProductEditForm } from '../../components/admin/productEditForm';
import { productUpdate } from '../../core/apiCalls/admin';
import { getProductDetails } from '../../core/apiCalls/products';

export const ProductEditContainer = (e) => {
    const [value, setValue] = useState('')
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const productPrice = formData.productMRP - (formData.productMRP * formData.productDiscount / 100)

    const productIdHandler = (e) => {
        setValue(e.target.value)
    }

    const productDataHandler = (e) => {
        e.preventDefault()
        getProductDetails(value)
            .then(res => setFormData(res))
    }

    const inputHandler = (e, value, r) => {
        console.log(e.target.value)
        if (r === 'reset') {
            if (value === '') {
                return null
            }

            const name = e.target.id.split('-')[0]
            setFormData({
                ...formData,
                [name]: value
            })
        }
        else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }

    const fileHandler = ({ target }) => {
        setFormData({
            ...formData,
            productImage: target.files[0]
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        formData.productPrice = productPrice
        productUpdate(formData)
            .then(res => setMessage(res))
            .catch((err) => {
                console.log(err)
                const errors = err.response.data
                const errorLst = {}
                errors.map(item => errorLst[item.path[0]] = item.message)
                setErrors(errorLst)
            })
        setTimeout(() => setMessage(''), 2000)
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
                '& button': { mt: 2 }
            }}
        >
            <Grid container justifyContent={'center'}>
                <ProductEdit productIdHandler={productIdHandler} value={value} productDataHandler={productDataHandler} />
            {Object.keys(formData).length > 0 &&
                <Grid item xs={6}>
                    <ProductEditForm
                        formData={formData}
                        submitHandler={submitHandler}
                        inputHandler={inputHandler}
                        errors={errors}
                        productPrice={isNaN(productPrice) ? 0 : productPrice}
                        fileHandler={fileHandler}
                    />
                </Grid>}
            </Grid>
        </Box>
    </Container>
}

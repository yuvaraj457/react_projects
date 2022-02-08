import { Container, CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ProductEdit } from '../../components/admin/productEdit';

export const ProductEditContainer = (e) => {
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return <Container component="main" maxWidth="xs" >
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
            <ProductEdit handleChange={handleChange} value={value}/>
        </Box>
    </Container>
}

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import Alert from '@mui/material/Alert';
import { Autocomplete, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';

export const ProductEditForm = ({formData, submitHandler, inputHandler, errors, productPrice, fileHandler}) => {
    const productData = (data = null) => data ? (
        {
            value: data,
        }
    ) :
        ({})
    const options = ['mens', 'womens', 'electronics'];
    console.log(formData)
    return (
        <Box component="form" noValidate mt={2} onSubmit={(e) => submitHandler(e)}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        focused
                        id="standard-basic"
                        value={formData.productName}
                        // {...productData(formData.productName)}
                        fullWidth
                        name="productName"
                        label="Product Name"
                        variant="standard"
                        onChange={e => inputHandler(e)}
                        error={!errors.productName ? false : true}
                        helperText={!errors.productName ? '' : errors.productName}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="standard-adornment-amount">MRP</InputLabel>
                    <Input
                        fullWidth
                        type="number"
                        id="standard-adornment-amount"
                        name="productMRP"
                        value={formData.productMRP}
                        // {...productData(formData.productMRP)}
                        onChange={e => inputHandler(e)}
                        error={!errors.productMRP ? false : true}
                        // helperText={!errors.productMRP ? '' : errors.productMRP}
                        startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="standard-adornment-amount">Discount</InputLabel>
                    <Input
                        fullWidth
                        type="number"
                        id="standard-adornment-amount"
                        name="productDiscount"
                        value={formData.productDiscount}
                        // {...productData(formData.productDiscount)}
                        onChange={e => inputHandler(e)}
                        error={!errors.productDiscount ? false : true}
                        // helperText={!errors.productDiscount ? '' : errors.productDiscount}
                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                    <Input
                        fullWidth
                        name="productPrice"
                        id="standard-adornment-amount"
                        value={productPrice}
                        error={!errors.productPrice ? false : true}
                        // helperText={!errors.productPrice ? '' : errors.productPrice}
                        startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                    />

                </Grid>
                <Grid item xs={12}>
                    {/* <Autocomplete
                        {...flatProps}
                        // defaultValue= {formData.productType ? formData.productType:''}
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={formData.productType}
                        // value = {formData.productType ? formData.productType:''}
                        onInputChange={(e, value, r) => onChange(e, value, r)}
                        // {...productData(formData.productType)}
                        id="productType"
                        disableClearable
                        renderInput={(params) => (
                            <TextField {...params} value={formData.productType} label="ProductType" variant="standard" />
                        )}
                    /> */}
                    <Autocomplete
                        options={options}
                        value={formData.productType}
                        inputValue={formData.productType}
                        onInputChange={(e, value, r) => inputHandler(e, value, r)}
                        id="productType"
                        disableClearable
                        renderInput={(params) => <TextField {...params} label="ProductType" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="standard-adornment-amount">Product Star</InputLabel>
                    <Input
                        fullWidth
                        type="number"
                        id="standard-adornment-amount"
                        name="productStar"
                        value={formData.productStar}
                        // {...productData(formData.productStar)}
                        onChange={e => inputHandler(e)}
                        error={!errors.productStar ? false : true}
                    // helperText={!errors.productStar ? '' : errors.productStar}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="standard-adornment-amount">product Quantity</InputLabel>
                    <Input
                        fullWidth
                        type="number"
                        id="standard-adornment-amount"
                        name="productQuantity"
                        value={formData.productQuantity}
                        // {...productData(formData.productQuantity)}
                        onChange={e => inputHandler(e)}
                        error={!errors.productQuantity ? false : true}
                    // helperText={!errors.productQuantity ? '' : errors.productQuantity}
                    />
                </Grid>

                <Grid item xs={12}>
                    <label htmlFor="icon-button-file">
                        <input style={{ display: 'none' }} onChange={fileHandler} accept="image/*" id="icon-button-file" type="file" />
                        <IconButton color={!errors.productImage ? "primary" : "secondary"} aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Grid>
                        {formData.productImage}
                    </Grid>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                update
            </Button>
        </Box>
    )
}

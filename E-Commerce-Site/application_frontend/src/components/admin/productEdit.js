import { Button, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import {ProductUploadContainer} from '../../containers/adminContainer/productUploadContainer'
export const ProductEdit = ({ productIdHandler, value, productDataHandler }) => {

    return (
        <>
                <Grid item xs={6}> 
                    <h4>Enter the id</h4>
                    <FormControl component='form' onSubmit={(e) => productDataHandler(e)}>
                        <InputLabel htmlFor="component-outlined">Id</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={value}
                            onChange={productIdHandler}
                            label="Id"
                            size="small"
                        />
                        <Button type='submit' variant="outlined">find</Button>
                    </FormControl>
                </Grid>
                {/* {
                    product.length > 0 &&
                <Grid item xs={6}>
                    <ProductUploadContainer product={product}/>
                </Grid>
                } */}
        </>
    )
}

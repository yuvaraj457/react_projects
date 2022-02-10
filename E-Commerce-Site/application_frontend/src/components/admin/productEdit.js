import { Button, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import {ProductUploadContainer} from '../../containers/adminContainer/productUploadContainer'
export const ProductEdit = ({ handleChange, value, handleSubmit, product }) => {
    return (
        <>
            <Grid container justifyContent={'space-between'}>
                <Grid item xs={6}> 
                    <h4>Enter the id</h4>
                    <FormControl component='form' onSubmit={(e) => handleSubmit(e)}>
                        <InputLabel htmlFor="component-outlined">Id</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={value}
                            onChange={handleChange}
                            label="Id"
                            size="small"
                        />
                        <Button type='submit' variant="outlined">find</Button>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <ProductUploadContainer product={product}/>
                </Grid>
            </Grid>
        </>
    )
}

import { Button, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductEdit = ({ productIdHandler, value, productDeleteHandler, productDataHandler, formData }) => {

    return (
        <>
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
                    {formData &&
                    <Button variant="outlined" startIcon={<DeleteIcon />} color='error' onClick={productDeleteHandler}>
                        Delete
                    </Button>}
                </FormControl>
        </>
    )
}

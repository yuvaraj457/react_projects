import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

export const ProductEdit = ({ handleChange, value }) => {
    return (
        <>
            <h4>Enter the id</h4>
            <FormControl>
                <InputLabel htmlFor="component-outlined">Id</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    value={value}
                    onChange={handleChange}
                    label="Id"
                />
                <Button variant="outlined">find</Button>
            </FormControl>
        </>
    )
}

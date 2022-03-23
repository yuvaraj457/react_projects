import React from 'react';

import { Button, Grid, TextField } from '@mui/material';

export const AddAddressCard = ({onChangeAddress, errors}) => {
    return (
        <Grid container sx={{ maxWidth: '400px' }} spacing={2}>
            <h4>Enter the address</h4>
            <Grid item xs={12} >
                <TextField
                    autoComplete="no"
                    name="Plot no/House no"
                    required
                    fullWidth
                    id="firstName"
                    label="Plot no/House no"
                    onChange={e => onChangeAddress(e)}
                    error={!errors["Plot no/House no"] ? false : true}
                    helperText={!errors["Plot no/House no"] ? '' : errors["Plot no/House no"]}
                    autoFocus
                />
            </Grid>
            <Grid item xs={12} >
                <TextField
                    required
                    fullWidth
                    id="area"
                    label="area"
                    name="area"
                    autoComplete="address"
                    onChange={e => onChangeAddress(e)}
                    error={!errors.area ? false : true}
                    helperText={!errors.area ? '' : errors.area}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="locality"
                    label="locality"
                    name="locality"
                    autoComplete="locality"
                    onChange={e => onChangeAddress(e)}
                    error={!errors.locality ? false : true}
                    helperText={!errors.locality ? '' : errors.locality}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="state"
                    label="state"
                    id="state"
                    onChange={e => onChangeAddress(e)}
                    error={!errors.state ? false : true}
                    helperText={!errors.state ? '' : errors.state}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="pincode"
                    label="pincode"
                    id="pincode"
                    onChange={e => onChangeAddress(e)}
                    error={!errors.pincode ? false : true}
                    helperText={!errors.pincode ? '' : errors.pincode}
                />
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
            >
                Add
            </Button>
        </Grid>
    )
}

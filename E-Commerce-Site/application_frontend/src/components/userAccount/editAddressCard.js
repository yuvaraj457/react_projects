import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'


export default function EditAddressCard({onChangeAddress, handleSubmitAddress}) {
    return (
        <Box component="form" noValidate onSubmit={e => handleSubmitAddress(e)}
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h4>Enter the address</h4>
            <Grid container xs={6} spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        autoComplete="no"
                        name="No"
                        required
                        fullWidth
                        id="firstName"
                        label="Plot No/House No"
                        onChange = {e => onChangeAddress(e)}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        required
                        fullWidth
                        id="Area"
                        label="Area"
                        name="Area"
                        autoComplete="address"
                        onChange = {e => onChangeAddress(e)}
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
                        onChange = {e => onChangeAddress(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="state"
                        label="state"
                        id="state"
                        onChange = {e => onChangeAddress(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="pincode"
                        label="pincode"
                        id="pincode"
                        onChange = {e => onChangeAddress(e)}
                    />
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml:2 }}
                >
                    update
                </Button>
            </Grid>
        </Box>
    )
}

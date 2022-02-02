import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SellIcon from '@mui/icons-material/Sell';
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import Alert from '@mui/material/Alert';
import MuiPhoneNumber from "material-ui-phone-number";
import { Link } from 'react-router-dom';
import { Autocomplete, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';




export const ProductUpload = ({ onChange, fileName, fileHandler }) => {

    const flatProps = {
        options: ['mens', 'womens', 'electronics'],
    };

    
    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <SellIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Products Uploader
                </Typography>
                <Box component="form" noValidate mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                id="standard-basic"
                                fullWidth
                                name="productName"
                                label="Product Name"
                                variant="standard"
                                onChange={e => onChange(e)}
                            //  error = {!errors.firstName ? false : true}
                            //  helperText= {!errors.firstName ? '' : errors.firstName}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="standard-adornment-amount">MRP</InputLabel>
                            <Input
                                fullWidth
                                type="number"
                                id="standard-adornment-amount"
                                name="productMRP"
                                onChange={e => onChange(e)}
                                // error = {!errors.firstName ? false : true}
                                // helperText= {!errors.firstName ? '' : errors.firstName}
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
                                onChange={e => onChange(e)}
                                // error = {!errors.firstName ? false : true}
                                // helperText= {!errors.firstName ? '' : errors.firstName}
                                startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                            <Input
                                fullWidth
                                name="productPrice"
                                id="standard-adornment-amount"
                                value={2}
                                startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                {...flatProps}
                                id="ProductType"
                                disableCloseOnSelect
                                readOnly
                                onInputChange={(e, value, r) => onChange(e, value, r)}
                                renderInput={(params) => (
                                    <TextField {...params} name="productType" label="Product Type" variant="standard" />
                                )}
                            />
                        </Grid>
                        <Grid container xs={12} mt={2} flexDirection={'column'} alignItems={'center'}>
                            <label htmlFor="icon-button-file">
                                <input style={{display: 'none'}} onChange={fileHandler} accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <Grid>
                                {fileName}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        upload
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
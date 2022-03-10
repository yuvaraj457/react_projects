import { ButtonBase, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { apiTarget } from '../../config';

export default function CartProducts({product}) {
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    
    return (   
                <Paper sx={{ p: 1, mt: 1, mr: 1}} style={{borderBottom : '2px solid #9c27b0', borderLeft : '8px solid #9c27b0'}}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 120, height: 120 }}>
                                <Img alt="complex" src={`${apiTarget}/static/images/${product.productImage}`} />
                            </ButtonBase>
                        </Grid>
                            <Grid item xs container alignItems={'center'} direction="column" >
                                <Grid item >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.productName}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    Rs {product.productPrice} X {product.quantity}
                                </Grid>
                        </Grid>
                        <Grid item xs container direction="column"  justifyContent={'space-between'} alignItems={'center'}>
                            Rs {product.productPrice * product.quantity}
                        </Grid>
                    </Grid>
                </Paper>
            
    )
}

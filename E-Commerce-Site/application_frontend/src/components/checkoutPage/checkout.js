import { ButtonBase, Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import React from 'react';
import { usePaymentInputs } from 'react-payment-inputs'
import { apiTarget } from '../../config';

export default function Checkout() {
    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    return (
        //   <div>
        //     <input {...getCardNumberProps({ onChange: handleChangeCardNumber })} value={cardNumber} />
        //     <input {...getExpiryDateProps({ onChange: handleChangeExpiryDate })} value={expiryDate} />
        //     <input {...getCVCProps({ onChange: handleChangeCVC })} value={cvc} />
        //     {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
        //   </div>
        <Container component="main" maxWidth="xs" >
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Paper sx={{ p: 1, mt: 2, mr: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 120, height: 120 }}>
                                <Img alt="complex" src={`${apiTarget}/static/images/1640858591781_productImage.Jpg`} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container alignItems={'center'} direction="column" spacing={1}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {'Shirt'}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    Rs 500 X 2
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" justifyContent={'space-between'} alignItems={'center'}>
                            Rs 1000
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
}

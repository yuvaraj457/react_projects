import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Badge, Button, Grid, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';

import StarRatings from 'react-star-ratings';

import { apiTarget } from '../../config';




export default function ProductDetailedViewCard({ product, addToCartHandler }) {

    const offerStyle = {width: '100px', height: '100px', textAlign: 'center'}
    return (
        <Card sx={{ display: 'flex' }}>
            <Grid container spacing={2} >
                <Grid item container xs={4}>
                    <CardMedia
                        component="img"
                        sx={{ width: 400 }}
                        image={`${apiTarget}/static/images/${product.productImage}`}
                        alt="green iguana"
                    />
                </Grid>
                <Grid item container xs={8} alignItems='center' flexDirection='column'>
                    <Grid item>
                        <CardContent>
                            <Badge badgeContent={'60%'} color='badgeColor' sx={{ marginRight: '8px' }} anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }} />&nbsp;
                            <Typography gutterBottom variant="h5" component="div">
                                {product.productName}
                            </Typography>
                            <StarRatings
                                rating={product.productStar}
                                starRatedColor="gold"
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                name="rating"
                            />
                            <Typography variant="body2" color="text.secondary">
                                <del>MRP : {product.productMRP}</del>
                            </Typography>
                            <Typography gutterBottom variant="body1" >
                                Price : {product.productPrice}
                            </Typography>
                            <Stack spacing={1} direction='row'>
                                <Button size='small' variant="contained" color='cartButtonColor' onClick={() => addToCartHandler(product._id)}>
                                    Cart
                                </Button>
                                <Button size='small' variant="contained" color="buyButtonColor">
                                    buy
                                </Button>
                            </Stack>
                        </CardContent>
                    </Grid>
                    <Grid item container justifyContent='center' spacing={2}>
                        <Grid item>
                             <Paper elevation={3} sx={offerStyle}> Bank offer upto Rs 54/- on HDFC bank credit card </Paper>
                        </Grid>
                        <Grid item>
                             <Paper elevation={3} sx={offerStyle}> Bank offer upto Rs 100/- on ICICI bank credit card</Paper>
                        </Grid>
                        <Grid item>
                             <Paper elevation={3} sx={offerStyle}> Bank offer upto Rs 80/- on Axis bank credit card</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

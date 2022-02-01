import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { apiTarget } from '../../config';

import { Badge, Button, Grid, Stack } from '@mui/material';
import StarRatings from 'react-star-ratings';

export default function ProductDetailedViewCard({ product, addToCartHandler }) {
    return (
        <Card sx={{ display: 'flex' }}>
            <Grid container spacing={2}>
                <Grid item container xs={4}>
                    <CardMedia
                        component="img"
                        sx={{ width: 400 }}
                        image={`${apiTarget}/static/images/${product.productImage}`}
                        alt="green iguana"
                    />
                </Grid>
                <Grid item container xs={8} justifyContent={'center'}>
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
                </Grid>
            </Grid>
        </Card>
    );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Stack } from '@mui/material';

import {Link} from 'react-router-dom'

import StarRatings from 'react-star-ratings'

import { apiTarget } from '../../config'

export default function ProductCard({ product }) {
  return (
    <Card variant="outlined" sx={{ width: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ width: 'auto' }}
          height="140"
          image={`${apiTarget}/static/images/${product.productImage}`}
          alt="product_image"
        />
      </CardActionArea>
      <div className={'product-card-style'}>
        <Link to={`productDetails/${product._id}`}>
          {product.productName}
        </Link>
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
          <Button size='small' variant="contained" color='cartButtonColor'>
            Cart
          </Button>
          <Button size='small' variant="contained" color="buyButtonColor">
            buy
          </Button>
        </Stack>
      </div>
    </Card>
  );
}

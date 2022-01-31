import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Stack } from '@mui/material';

import { Link } from 'react-router-dom'

import StarRatings from 'react-star-ratings'
import { apiTarget } from '../../config'
import { useSelector } from 'react-redux';
import { AlertDialogSlide } from '../../shared/alertDialog';

export default function ProductCard({ product, addToCartHandler }) {

  const { isAuthenticated } = useSelector(state => state.userReducer)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card variant="outlined" sx={{ width: 200 }}>
      <Link to={`/productDetails/${product._id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ width: 'auto' }}
            height="140"
            image={`${apiTarget}/static/images/${product.productImage}`}
            alt="product_image"
          />
        </CardActionArea>
      </Link>
      <div className={'product-card-style'}>

        {product.productName}

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
          {
            isAuthenticated ?
              <>
                <Button size='small' variant="contained" color='cartButtonColor' onClick={() => addToCartHandler(product._id)}>
                  Cart
                </Button>
                <Button size='small' variant="contained" color="buyButtonColor">
                  buy
                </Button>
              </>
              :
              <>
                <Button size='small' variant="contained" color='cartButtonColor' onClick={() => handleClickOpen()}>
                  Cart
                </Button>
                <Button size='small' variant="contained" color="buyButtonColor">
                  buy
                </Button>
              </>
          }

          <AlertDialogSlide handleClose={handleClose} open={open} />
        </Stack>
      </div>
    </Card>
  );
}

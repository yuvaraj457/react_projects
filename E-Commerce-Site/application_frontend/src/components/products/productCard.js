import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Badge, Button, CardActionArea, ClickAwayListener, Stack, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import StarRatings from 'react-star-ratings'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


import { apiTarget } from '../../config'
import { useSelector } from 'react-redux';
import { AlertDialogSlide } from '../../shared/alertDialog';
import { UseCopy } from '../../shared/copyToClipboard';


export default function ProductCard({ product, addToCartHandler }) {

  const { isAuthenticated, userDetails } = useSelector(state => state.userReducer)

  const [open, setOpen] = React.useState(false);
  const [toolTipOpen, setToolTipOpen] = React.useState(false);
  const [isCopied, handleCopy] = UseCopy(2000)

  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };

  const handleTooltipOpen = (id) => {
    handleCopy(id)
    if(isCopied){
      setToolTipOpen(true)
      setTimeout(() => setToolTipOpen(false), 2000)
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card variant="outlined" sx={{ width: 210 }}>
      {userDetails.userType === 'admin' &&
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={toolTipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Copied"
          >
            <Typography variant="idText"  onClick={() => handleTooltipOpen(product._id)}>
              Id : {product._id} <ContentCopyIcon fontSize='small' />
            </Typography>
          </Tooltip>
        </div>
      </ClickAwayListener>}



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
        <Grid container justifyContent={'center'} mt={2}>

          <Badge badgeContent={product.productDiscount + '%'} color='badgeColor' sx={{ marginRight: '8px' }} anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }} />&nbsp;

          <Typography variant="body2" color="text.secondary">
            <del>MRP : {product.productMRP}</del>
          </Typography>
        </Grid>


        <Typography gutterBottom variant="body1" >
          Price : {product.productPrice}
        </Typography>
        <Stack spacing={1} direction='row'>

          <Button size='small' variant="contained" color='cartButtonColor' onClick={() => isAuthenticated ? addToCartHandler(product._id) : handleClickOpen()}>
            Cart
          </Button>
          <Button size='small' variant="contained" color="buyButtonColor">
            buy
          </Button>

          <AlertDialogSlide handleClose={handleClose} open={open} />
        </Stack>
      </div>
    </Card >
  );
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, ButtonBase, ButtonGroup, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


import { getProductDetails } from '../../core/apiCalls/products';
import { apiTarget } from '../../config';
import { Box } from '@mui/system';

export const Cart = ({ productId, quantity, productIncrementHandler, productDecrementHandler}) => {
  const [product, setProduct] = React.useState(null)
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  React.useEffect(() => {
    getProductDetails(productId)
      .then((res) => setProduct(res))
  }, [productId])

  return (
    product &&
    <>
      <Paper sx={{ p: 2, maxWidth: 600, flexGrow: 0, mt: 2 }}>
        <Grid container spacing={2}>

          <Grid item>
            <ButtonBase sx={{ width: 140, height: 140 }}>
              <Img alt="complex" src={`${apiTarget}/static/images/${product.productImage}`} />
            </ButtonBase>
          </Grid>

          <Grid item xs={8} sm container>
            <Grid item xs container alignItems={'center'} direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  {product.productName}
                </Typography>
              </Grid>

              <Grid item>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button><ArrowDropDownIcon onClick={() => productDecrementHandler(product._id)} /></Button>
                  <Box style={{ borderRight: '1px solid rgba(9, 113, 241, 0.5)' }} sx={{ p: 2 }}>{quantity}</Box>
                  <Button onClick={() => productIncrementHandler(product._id)}><ArrowDropUpIcon /></Button>
                </ButtonGroup>
              </Grid>

            </Grid>
            <Grid item xs container direction="column" justifyContent={'space-between'} alignItems={'center'}>

              <Grid>
                <Typography variant="subtitle1" component="div">
                  Rs {product.productPrice}/-
                </Typography>
              </Grid>

              <Grid item>
                <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

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

export const Cart = ({ productId }) => {
  const [product, setProduct] = React.useState(null)

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  React.useEffect(async () => {
    getProductDetails(productId)
      .then((res) => setProduct(res))
  }, [])

  return (
    product &&
    <>
      <Paper sx={{ p: 2, maxWidth: 700, flexGrow: 1, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={`${apiTarget}/static/images/${product.productImage}`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  {product.productName}
                </Typography>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button><ArrowDropDownIcon /></Button>
                  <Box style={{ borderRight: '1px solid rgba(9, 113, 241, 0.5)' }} sx={{ p: 2 }}>0</Box>
                  <Button><ArrowDropUpIcon /></Button>
                </ButtonGroup>
              </Grid>
              <Grid item>
                <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1" component="div">
                Rs {product.productPrice}/-
              </Typography>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

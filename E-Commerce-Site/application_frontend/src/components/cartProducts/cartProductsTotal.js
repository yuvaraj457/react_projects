import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}


export default function CartTable({ cartProducts, productQuantityHandler }) {

  const subTotal = cartProducts.reduce((sum, i, _id) => sum + i.productPrice * productQuantityHandler(i._id), 0)

  return (
    <TableContainer component={Paper} sx={{padding:'10px', display : 'flex', flexDirection:'column'}} >
      <Table sx={{ minWidth: 200 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              <b>Details</b>
            </TableCell>
            <TableCell align="right"><b>Price</b></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Products</b></TableCell>
            <TableCell align="right"><b>Price</b></TableCell>
            <TableCell align="right"><b>Quantity</b></TableCell>
            <TableCell align="right"><b>Sum</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProducts.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.productName}</TableCell>
              <TableCell align="right">{row.productPrice}</TableCell>
              <TableCell align="right">{productQuantityHandler(row._id)}</TableCell>
              <TableCell align="right">{ccyFormat(row.productPrice * productQuantityHandler(row._id))}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(subTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Delivery Charges</TableCell>
            <TableCell align="right">{subTotal > 0 ? '+40' : '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{subTotal > 0 ? ccyFormat(subTotal + 40) : '-'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
            
              <Button variant="contained" endIcon={<ArrowForwardIcon />}>
              <Link to='/checkout' style={{textDecoration:'none', color:'white'}}>
                Proceed to checkout
                </Link>
              </Button>
            
    </TableContainer>
  );
}

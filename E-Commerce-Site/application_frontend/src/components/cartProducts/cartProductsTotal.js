import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}


export default function CartTable({cartProducts, productQuantityHandler}) {

  const subTotal = cartProducts.reduce((sum, i, _id) => sum + i.productPrice * productQuantityHandler(i._id), 0)
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Sum</TableCell>
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
            <TableCell align="right">{subTotal > 0 ? ccyFormat(subTotal+40) : '-'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

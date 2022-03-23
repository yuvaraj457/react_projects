import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';

export const AddressListCard = ({ address, controlProps }) => {
    const addressCard = `${address["Plot no/House no"]}, 
  ${address.area}, 
  ${address.locality}, 
  ${address.state}, 
  ${address.pincode} 
  `
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, }}>
            <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2, border: '2px solid grey' }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item alignSelf={'center'}>
                        <Radio {...controlProps(addressCard, address)} />
                    </Grid>
                    <Grid item xs>
                        <p>{addressCard}</p>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

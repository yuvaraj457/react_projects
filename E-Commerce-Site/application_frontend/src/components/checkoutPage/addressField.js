import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import { EditAddressContainer } from '../../containers/userContainer/editAddressContainer';

export const AddressField = ({address, renderUser}) => {
    return (
            <Paper sx={{ p: 1, mt: 1, mr: 1, }} style={{borderBottom : '2px solid #9c27b0', borderLeft : '8px solid #9c27b0'}}>
                <Grid container spacing={2} flexDirection={'column'}>
                    <Grid item>
                        <Typography variant="h6" gutterBottom component="div">
                            Address
                        </Typography>
                    </Grid>
                    <Grid container item sx={{textAlign: 'center'}} justifyContent={'space-evenly'}>
                        {
                        address !== '-' ?
                        <>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            { address }
                        </Typography>
                        <Link to='/editProfile/activeAddress'>
                            Edit
                        </Link>
                        </>
                        :
                        <EditAddressContainer renderUser={renderUser}/>
}
                    </Grid>
                </Grid>
            </Paper>
    )
}

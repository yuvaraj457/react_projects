import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const PhoneNumberField = ({phone}) => {
  return (
    <Paper sx={{ p: 1, mt: 1, mr: 1, }} style={{ borderBottom: '2px solid #9c27b0', borderLeft: '8px solid #9c27b0' }}>
            <Grid container spacing={2} flexDirection={'column'} >
            <Grid item>
                        <Typography variant="h6" gutterBottom component="div">
                            Phone
                        </Typography>
                    </Grid>
                <Grid item container justifyContent={'space-evenly'}>
                    <Grid item>
                        {phone}
                    </Grid>
                    <Grid item>
                        <Link to='/editProfile/phone'>
                                    Edit
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
    </Paper>
  )
}

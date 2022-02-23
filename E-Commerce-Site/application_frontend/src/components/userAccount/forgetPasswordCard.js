import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'

export default function ForgetPasswordCard({emailHandler, submitHandler}) {
  return (
    <Box
        sx={{
            marginTop : 4,
            marginBottom : 8,
        }}
    >
        <Grid container spacing={2} flexDirection='column' alignItems='center' justifyContent='center'> 
            <Grid item>
                <h4>Enter your email:</h4>
                <TextField 
                    id="outlined-basic" 
                    label="email" 
                    variant="outlined"
                    size='small'
                    onChange={e => emailHandler(e)} 
                />
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={submitHandler}>next</Button>
            </Grid>
        </Grid>
    </Box>
  )
}

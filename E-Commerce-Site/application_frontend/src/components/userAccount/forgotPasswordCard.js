import { Alert, Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordCard({emailHandler, submitHandler, message}) {
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
                    error = {Object.keys(message).length > 0 && message.type === 'error' }
                    onChange={e => emailHandler(e)} 
                />
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={submitHandler}>next</Button>
            </Grid>
            {Object.keys(message).length > 0 &&
            <Grid item>
                <Alert severity={message.type==='success'?'success' : 'error'}>{message.text}</Alert><p>Click to login page</p><Link to='/login'>Login</Link>
            </Grid>}
        </Grid>
    </Box>
  )
}

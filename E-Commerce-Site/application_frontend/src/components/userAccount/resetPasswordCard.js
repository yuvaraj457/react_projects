import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const ResetPasswordCard = ({passwordHandler, submitHandler}) => {
  return (
    <Box 
        sx={{
            marginTop : 4,
            marginBottom : 8,
        }}
    >
        <Grid container spacing={2} flexDirection='column' alignItems='center' justifyContent='center'>
            <Grid item>
                <TextField 
                    id="new-password" 
                    label="New password" 
                    variant="outlined"
                    name="newPassword" 
                    size="small"
                    onChange={e => passwordHandler(e)}
                />
            </Grid>
            <Grid item>
                <TextField 
                    id="Retype-new-password" 
                    label="Retype new password" 
                    variant="outlined"
                    name="retypedNewPassword" 
                    size="small"
                    onChange={e => passwordHandler(e)}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={submitHandler}>Reset</Button>
            </Grid>

        </Grid>

    </Box>
  )
}

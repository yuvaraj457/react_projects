import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'

export const  ChangePasswordCard = ({currentPasswordHandler, newPasswordHandler, submitHandler, errors}) => {
    return (
        <Box
            sx={{
                marginTop: 4,
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container spacing={2} flexDirection='column' alignItems={'center'}>
                <Grid item >
                    <TextField
                        id="outlined-basic"
                        label="current password"
                        variant="outlined"
                        onChange={e => currentPasswordHandler(e)}
                        error = {!errors.currentPassword ? false : true}
                        helperText= {!errors.currentPassword ? '' : errors.currentPassword}
                        size='small'
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-basic"
                        label="new password"
                        variant="outlined"
                        onChange={e => newPasswordHandler(e)}
                        error = {!errors.newPassword ? false : true}
                        helperText= {!errors.newPassword ? '' : errors.newPassword}
                        size='small'
                    />
                </Grid>
                <Grid container item justifyContent={'center'}>
                    <Button variant="outlined" onClick={submitHandler}>update</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

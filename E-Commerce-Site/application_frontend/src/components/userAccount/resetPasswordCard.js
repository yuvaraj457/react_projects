import React from 'react'

import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'


export const ResetPasswordCard = ({ passwordHandler, submitHandler, error }) => {
    return (
        <Box
            sx={{
                marginTop: 4,
                marginBottom: 8,
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
                        error={error.newPassword ? true : false}
                        helperText={error.newPassword ? error.newPassword : ''}
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
                        error={error.retypedNewPassword ? true : false}
                        helperText={error.retypedNewPassword ? error.retypedNewPassword : ''}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={submitHandler}>Reset</Button>
                </Grid>

            </Grid>

        </Box>
    )
}

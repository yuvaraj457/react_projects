import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import MuiPhoneNumber from 'material-ui-phone-number'
import React from 'react'

export const EditProfileCard = ({onChangePhone, handleSubmitPhone}) => {
    return (
        <Box component="form" onSubmit={e => handleSubmitPhone(e)} noValidate sx={{ mt: 3 }}>
            <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Grid item >
                    <p>Enter the number to change</p>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
                    <MuiPhoneNumber
                        required
                        fullWidth
                        autoComplete='f'
                        name="phone"
                        label="Phone Number"
                        data-cy="user-phone"
                        defaultCountry={"in"}
                        onChange={(value) => onChangePhone(value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        update
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

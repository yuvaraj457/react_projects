import React from 'react'
import { Autocomplete, Button, FormControl, TextField } from '@mui/material'


export const UserEdit = ({options, submitHandler, inputHandler}) => {
    return (
        
                    <FormControl component='form' onSubmit={(e) => submitHandler(e)}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            sx={{ width: 300 }}
                            onInputChange={(e, value, r) => inputHandler(value)}
                            disableClearable
                            renderInput={(params) => <TextField {...params} label="Users" />}
                        />
                        <Button type='submit' variant="outlined">find</Button>
                    </FormControl>      
    )
}

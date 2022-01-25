import { Box, Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux'


import { AddAddressCard } from '../../components/userAccount/addAddressCard';
import { AddressListCard } from '../../components/userAccount/addressListCard';
import { activeAddress, editAddress } from '../../core/apiCalls/user';


export const EditAddressContainer = ({navigate, renderUser}) => {
    const [selectedValue, setSelectedValue] = useState('a')
    const [newAddress, setNewAddress] = useState({})
    const [errors, setErrors] = useState({})
    const { address } = useSelector(state => state.userReducer.userDetails)
    

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    })

    const handleSubmitAddress = e => {
        e.preventDefault()
        editAddress(newAddress)
        .then(() => {
            renderUser()
            setErrors({})
        })
        .catch(err => {
            const error = err.response.data
            console.log(error)
            const errorLst = {}
            error.map(item => errorLst[item.path[0]] = item.message)
            setErrors(errorLst)
        })
    }

    const handleActiveAddress = e => {
        e.preventDefault()
        activeAddress(selectedValue)
        .then(() =>  {
            renderUser()
            navigate('/myAccount')
        })
        .catch(error => console.log(error))

    }

    const onChangeAddress = e => {
        setNewAddress({...newAddress,[e.target.name] : e.target.value})
    }

    return (
        <Box container
            sx={{
                marginTop: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
            <Box component="form" noValidate onSubmit={e => handleSubmitAddress(e)}>
                <AddAddressCard errors={errors} onChangeAddress={onChangeAddress} />
            </Box>

            <Box component="form" noValidate onSubmit={e => handleActiveAddress(e)}>
                <Grid container sx={{ maxWidth: '400px' }} spacing={2}>
                    <Grid item>
                        {address && address.length > 0 && address.map((item, index) => <AddressListCard key={index} controlProps={controlProps} address={item} />)}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 2 }}
                    >
                        Update
                    </Button>
                </Grid>
            </Box>
        </Box>
    )
}

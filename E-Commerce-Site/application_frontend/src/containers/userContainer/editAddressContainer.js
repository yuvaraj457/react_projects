import { Box, Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'

import { AddAddressCard } from '../../components/userAccount/addAddressCard';
import { AddressListCard } from '../../components/userAccount/addressListCard';
import { activeAddress, deleteAddress, editAddress } from '../../core/apiCalls/user';


export const EditAddressContainer = ({navigate, renderUser}) => {
    const [selectedValue, setSelectedValue] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [newAddress, setNewAddress] = useState({})
    const [errors, setErrors] = useState({})
    const { address } = useSelector(state => state.userReducer.userDetails)
    

    const handleChange = (event, address) => {
        setSelectedValue(event.target.value)
        setSelectedAddress(address)
    }

    const controlProps = (item, address) => ({
        checked: selectedValue === item,
        onChange: (e) => handleChange(e, address),
        value: item,
        name: 'radio-button',
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
            const errorLst = {}
            error.map(item => errorLst[item.path[0]] = item.message)
            setErrors(errorLst)
        })
    }

    const handleActiveAddress = () => {
        activeAddress(selectedValue)
        .then(() =>  {
            renderUser()
            navigate('/myAccount')
        })
        .catch(error => console.log(error))

    }

    const handleDeleteAddress = () => {
        deleteAddress(selectedAddress)
        .then(() => renderUser())
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
                justifyContent: 'center'
            }}>
            <Box component="form" noValidate onSubmit={e => handleSubmitAddress(e)}>
                <AddAddressCard errors={errors} onChangeAddress={onChangeAddress} />
            </Box>
            {
           ( address && address.length > 0) &&
            <Box>
                <Grid container  sx={{ maxWidth: '400px' }} justifyContent={'center'} spacing={2}>
                    <Grid item>
                        {address.map((item, index) => <AddressListCard key={index} controlProps={controlProps} address={item} />)}
                    </Grid>

                    <Grid item >
                        <Button
                            type="submit"
                            startIcon={<DeleteIcon />}
                            color="error"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 2 }}
                            onClick = {() => handleDeleteAddress()}
                        >
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 2 }}
                            onClick = {() => handleActiveAddress()}
                        >
                            Set
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            }
        </Box>
    )
}

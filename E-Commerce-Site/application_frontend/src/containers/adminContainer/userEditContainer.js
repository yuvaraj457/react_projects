import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

import { UserEdit } from '../../components/admin/userEdit'
import { BasicTable } from '../../components/admin/userTable'


export const UserEditContainer = () => {
    const {users} = useSelector(state => state.adminReducer)
    const options = users.map(item => item.firstName.toLowerCase())

    const [value, setValue] = useState('')
    const [filterData, setFilterData] = useState('')
    
    const inputHandler = (e) => {
        setValue(e)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const filterData = users.filter((item) => item.firstName.toLowerCase() === value || item._id === value)
        setFilterData(filterData)
    }

    console.log(filterData)
    return (
        <>
        <Box
            sx={{
                marginTop: 8,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Grid container justifyContent={'center'} alignItems={'center'} spacing={2} flexDirection={'column'}>
                <Grid item xs={6}>
                    <UserEdit 
                        options={options} 
                        submitHandler={submitHandler}
                        inputHandler={inputHandler}
                    />
                </Grid>
                <Grid item xs={12}>
                    {filterData && filterData.map((item, index) => <BasicTable key={index} user={item}/>)}
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";

import { Box } from '@mui/system'
import { Grid } from '@mui/material'

import { UserEdit } from '../../components/admin/user/userEdit'
import { BasicTable } from '../../components/admin/user/userTable'
import { deleteUser, editUser } from '../../core/apiCalls/admin'

export const UserEditContainer = () => {
    const {users} = useSelector(state => state.adminReducer)
    const {t} = useTranslation()
    const options = users.map(item => item.firstName.toLowerCase())

    const [value, setValue] = useState('')
    const [selectValue, setSelectValue] =  useState('')
    const [filterData, setFilterData] = useState('')
    const [message, setMessage] = useState('')

    const inputHandler = (e) => {
        setValue(e)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const filterData = users.filter((item) => item.firstName.toLowerCase() === value || item._id === value)
        setFilterData(filterData)
    }

    const selectHandler = e => {
        setSelectValue(e.target.value)
    } 

    const userTypeSubmitHandler = () => {
        editUser(filterData[0]._id, selectValue)
        .then((res) => setMessage(res))
        setFilterData([{...filterData[0], userType : selectValue}])
        setTimeout(() => setMessage(''), 4000)
    }

    const deleteUserHandler = () => {
        deleteUser()
        .then((res) => setMessage(res))
        setFilterData([])
        setTimeout(() => setMessage(''), 4000)
    }

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
                        t = {t}
                    />
                </Grid>
                <Grid item xs={12}>
                    {filterData && 
                    filterData.map((item, index) => <BasicTable 
                                                        key={index} 
                                                        user={item} 
                                                        selectHandler={selectHandler}
                                                        selectValue={selectValue}
                                                        userTypeSubmitHandler={userTypeSubmitHandler}
                                                        message={message}
                                                        deleteUserHandler={deleteUserHandler}
                                                        t={t}
                                                    />)}
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

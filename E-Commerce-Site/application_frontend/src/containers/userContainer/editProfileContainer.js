import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom"
import { fetchUser } from '../../action/userAction'


import { EditProfileCard } from '../../components/userAccount/editPhoneCard'
import { editPhone } from '../../core/apiCalls/user'
import { EditAddressContainer } from './editAddressContainer'

export const EditProfileContainer = () => {
    const {field} = useParams()
    const [phone, setPhone] = useState('')
    const navigate = useNavigate() 
    const dispatch = useDispatch()

    const onChangePhone = e => {
        setPhone(e)
    }

    const renderUser = () => {
        dispatch(fetchUser())
    }

    const handleSubmitPhone = e => {
        e.preventDefault()
        editPhone(phone)
            .then(() => {
                renderUser()
                navigate('/MyAccount')
            })
            .catch(error => console.log(error))
    }

    switch(field){
        case 'phone':
            return (
                <EditProfileCard onChangePhone={onChangePhone} handleSubmitPhone={handleSubmitPhone} />
            )

        case 'activeAddress':
            return (
                <EditAddressContainer navigate={navigate} renderUser={renderUser}/>
            )

        default:
            return <></>
    }
}
